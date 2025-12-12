from django.shortcuts import render
from django.templatetags.static import static
from django.views.generic import TemplateView, ListView, View

from aides.models import (
    Theme,
    Sujet,
    Aide,
    ZoneGeographique,
    GroupementProducteurs,
    Filiere,
    Type,
)

from aides_feedback.forms import (
    FeedbackOnThemesAndSujetsForm,
    CreateFeedbackOnAidesForm,
)

from . import tasks


class HomeView(TemplateView):
    template_name = "agri/home.html"
    extra_context = {
        "skiplinks": [
            {"link": "#proposition", "label": "Présentation"},
            {"link": "#themes", "label": "Votre besoin"},
            {"link": "#a-propos", "label": "À propos"},
        ],
        "feedback_themes_sujets_form": FeedbackOnThemesAndSujetsForm,
    }

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data.update(
            {
                "departements_default": {
                    "text": "Sélectionnez un département",
                    "disabled": True,
                },
                "departements": [
                    {"value": dept.code, "text": f"{dept.code} {dept.nom}"}
                    for dept in ZoneGeographique.objects.departements()
                ],
            }
        )
        return context_data


class SujetsView(TemplateView):
    template_name = "agri/sujets.html"
    extra_context = {
        "breadcrumb_data": {"current": "Rechercher par besoin"},
    }
    theme_id = None

    def setup(self, request, *args, **kwargs):
        super().setup(request, *args, **kwargs)
        self.theme_id = request.GET.get("theme_id", None)

    def get_context_data(self, **kwargs):
        from django.urls import reverse

        context_data = super().get_context_data(**kwargs)

        context_data.update(
            {
                "themes": [
                    (reverse("agri:sujets", query={"theme_id": theme.pk}), theme)
                    for theme in Theme.objects.published()
                ],
            }
        )

        if self.theme_id:
            context_data.update(
                {
                    "sujets": Sujet.objects.published().filter(themes=self.theme_id),
                }
            )
        return context_data


class ResultsMixin:
    def setup(self, request, *args, **kwargs):
        super().setup(request, *args, **kwargs)
        theme_id = request.GET.get("theme", None)
        if theme_id:
            self.theme = Theme.objects.get(pk=theme_id)
        sujets_ids = request.GET.getlist("sujets", [])
        self.sujets = Sujet.objects.filter(pk__in=sujets_ids)
        filieres_ids = request.GET.getlist("filieres", [])
        self.filieres = Filiere.objects.published().filter(pk__in=filieres_ids)
        groupements_ids = request.GET.getlist("regroupements", [])
        self.groupements = GroupementProducteurs.objects.filter(pk__in=groupements_ids)

    def get_results(self):
        qs = Aide.objects.published()
        if self.sujets:
            qs = qs.by_sujets(self.sujets)
        if self.filieres:
            qs = qs.by_filieres(self.filieres)
        return (
            qs.select_related("organisme")
            .prefetch_related("zones_geographiques", "types")
            .order_by("-date_fin")
            .defer("organisme__logo")
        )


class ResultsView(ResultsMixin, ListView):
    template_name = "agri/results.html"
    BREADCRUMB_TITLE = "Sélection personnalisée"

    def get_queryset(self):
        return self.get_results()

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        aides_by_type = {type_aide: set() for type_aide in Type.objects.all()}
        for aide in self.get_queryset():
            for type_aide in aide.types.all():
                aides_by_type[type_aide].add(aide)
        aides_by_type = {
            type_aide: aides for type_aide, aides in aides_by_type.items() if aides
        }
        context_data.update(
            {
                "skiplinks": [
                    {
                        "link": "#summary",
                        "label": "Rappel des informations saisies",
                    },
                    {
                        "link": "#recommandation",
                        "label": "Notre recommandation",
                    },
                ],
                "aides": {
                    type_aide: [
                        {
                            "heading_tag": "h3",
                            "extra_classes": "fr-card--horizontal fr-card--horizontal-fifth fr-card--no-icon",
                            "title": aide.nom,
                            "description": aide.promesse,
                            "link": aide.get_absolute_url(),
                            "image_url": aide.organisme.get_logo_url()
                            if aide.organisme_id
                            else static("agri/images/placeholder.1x1.svg"),
                            "image_alt": aide.organisme.nom,
                            "ratio_class": "fr-ratio-1x1",
                        }
                        for aide in aides
                    ]
                    for type_aide, aides in aides_by_type.items()
                },
                "create_feedback_on_aides_form": CreateFeedbackOnAidesForm(),
            }
        )

        return context_data


class SendResultsByMailView(ResultsMixin, View):
    def post(self, request, *args, **kwargs):
        tasks.send_results_by_mail.enqueue(
            email=self.request.POST.get("email"),
            base_url=f"{self.request.scheme}://{self.request.headers['host']}",
            theme_id=self.theme.pk,
            sujets_ids=[s.pk for s in self.sujets],
            commune_id=self.commune.pk,
            filieres_ids=[f.pk for f in self.filieres],
            groupements_ids=[g.pk for g in self.groupements],
            aides_ids=[a.pk for a in self.get_results()],
        )
        return render(request, "agri/_partials/send-results-by-mail-ok.html")
