from django.http.request import QueryDict
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

from agri import tasks
from aides_feedback.forms import (
    FeedbackOnThemesAndSujetsForm,
    CreateFeedbackOnAidesForm,
)


class WithDepartement:
    departement = None

    def setup(self, request, *args, **kwargs):
        super().setup(request, *args, **kwargs)
        self.departement = request.GET.get("departement", None)
        self.querydict = QueryDict()
        if self.departement:
            self.querydict = QueryDict.fromkeys(["departement"], self.departement)

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data.update(
            {
                "departement": self.departement,
                "querystring": self.querydict.urlencode(),
            }
        )
        return context_data


class HomeView(WithDepartement, TemplateView):
    template_name = "agri_v2/home.html"
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
        theme_urgence = Theme.objects.filter(urgence=True).first()
        querydict_theme_urgence = self.querydict.copy()
        querydict_theme_urgence["theme"] = theme_urgence.pk
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
                "querystring_theme_urgence": querydict_theme_urgence.urlencode(),
            }
        )
        return context_data


class SujetsView(WithDepartement, TemplateView):
    template_name = "agri_v2/sujets.html"
    extra_context = {
        "breadcrumb_data": {"current": "Rechercher par besoin"},
    }
    theme_id = None

    def setup(self, request, *args, **kwargs):
        super().setup(request, *args, **kwargs)
        self.theme_id = request.GET.get("theme", None)

    def get_context_data(self, **kwargs):
        from django.urls import reverse

        context_data = super().get_context_data(**kwargs)

        context_data.update(
            {
                "themes": [
                    (
                        reverse(
                            "agri_v2:sujets",
                            query=self.querydict.dict() | {"theme": theme.pk},
                        ),
                        theme,
                    )
                    for theme in Theme.objects.published().exclude(sujets__aides=None)
                ],
            }
        )

        if self.theme_id:
            context_data.update(
                {
                    "theme_id": self.theme_id,
                    "sujets": Sujet.objects.published().having_published_aides_in_departement_and_theme(
                        ZoneGeographique.objects.departements().get(
                            code=self.departement
                        ),
                        Theme.objects.get(pk=self.theme_id),
                    ),
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
            qs.distinct()
            .select_related("organisme")
            .prefetch_related("zones_geographiques", "types")
            .order_by("-date_fin")
            .defer("organisme__logo")
        )


class ResultsView(ResultsMixin, ListView):
    template_name = "agri_v2/results.html"
    BREADCRUMB_TITLE = "Catalogue de dispositifs"

    def get_queryset(self):
        return self.get_results()

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)

        filtered_departements = ZoneGeographique.objects.departements().filter(
            code__in=self.request.GET.getlist("filter_departements", [])
        )
        filtered_types = Type.objects.filter(
            pk__in=self.request.GET.getlist("filter_types", [])
        )
        filtered_filieres = Filiere.objects.filter(
            pk__in=self.request.GET.getlist("filter_filieres", [])
        )
        filtered_beneficiaires = self.request.GET.getlist("filter_beneficiaires", [])

        context_data.update(
            {
                "skiplinks": [
                    {
                        "link": "#recommandation",
                        "label": "Notre recommandation",
                    },
                ],
                "aides": [
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
                    for aide in self.get_results()
                ],
                "filter_departements": [
                    (
                        departement.code,
                        f"{departement.code} {departement.nom}",
                        departement.nom,
                    )
                    for departement in ZoneGeographique.objects.departements()
                ],
                "filter_departements_initials": [
                    dept.code for dept in filtered_departements
                ],
                "filtered_departements": filtered_departements,
                "filter_types": [
                    (type_aides.pk, type_aides.nom, type_aides.nom)
                    for type_aides in Type.objects.all()
                ],
                "filtered_types": filtered_types,
                "filter_types_initials": [
                    type_aides.pk for type_aides in filtered_types
                ],
                "filter_filieres": [
                    (filiere.pk, filiere.nom, filiere.nom)
                    for filiere in Filiere.objects.all()
                ],
                "filtered_filieres": filtered_filieres,
                "filter_filieres_initials": [
                    filiere.pk for filiere in filtered_filieres
                ],
                "filter_beneficiaires": [
                    (
                        beneficiaire.name,
                        beneficiaire.value,
                        beneficiaire.value,
                    )
                    for beneficiaire in Aide.Beneficiaire
                ],
                "filtered_beneficiaires": filtered_beneficiaires,
                "filter_beneficiaires_initials": filtered_beneficiaires,
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
