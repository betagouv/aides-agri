from django.contrib.postgres.search import SearchQuery, SearchRank
from django.db.models import Prefetch
from django.shortcuts import render
from django.templatetags.static import static
from django.views.generic import TemplateView, ListView, View

from aides.models import (
    Theme,
    Sujet,
    Aide,
    ZoneGeographique,
    Filiere,
    Beneficiaires,
    Type,
)

from agri import tasks
from aides_feedback.forms import CreateFeedbackOnAidesForm


class HomeView(TemplateView):
    template_name = "agri_v2/home.html"
    extra_context = {
        "skiplinks": [
            {"link": "#proposition", "label": "Présentation"},
            {"link": "#recherche", "label": "Votre recherche"},
            {"link": "#a-propos", "label": "À propos"},
        ],
    }

    def setup(self, request, *args, **kwargs):
        super().setup(request, *args, **kwargs)
        self.departement_code = request.GET.get("departement", None)
        theme_id = request.GET.get("theme", None)
        self.has_theme = theme_id is not None
        self.theme_id = int(theme_id) if self.has_theme else None

    def get_template_names(self):
        if self.request.htmx:
            if self.has_theme:
                template_name = "agri_v2/blocks/home/sujets.html"
            else:
                template_name = "agri_v2/blocks/home/choix_parcours.html"
            return [template_name]
        else:
            return super().get_template_names()

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)

        context_data.update({"departement": self.departement_code})

        if self.has_theme:
            context_data.update(
                {"themes": Theme.objects.published().exclude(sujets__aides=None)}
            )
            if self.theme_id:
                context_data.update(
                    {
                        "theme_id": self.theme_id,
                        "sujets": Sujet.objects.published().having_published_aides_in_departement_and_theme(
                            ZoneGeographique.objects.departements().get(
                                code=self.departement_code
                            ),
                            Theme.objects.get(pk=self.theme_id),
                        ),
                    }
                )
        else:
            context_data.update(
                {
                    "theme_urgence_id": Theme.objects.filter(urgence=True).first().pk,
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


class ResultsMixin:
    def setup(self, request, *args, **kwargs):
        super().setup(request, *args, **kwargs)
        self.search = request.GET.get("q", None)
        departements_codes = request.GET.getlist("departements", [])
        self.departements = (
            ZoneGeographique.objects.departements().filter(code__in=departements_codes)
            if departements_codes
            else []
        )
        types_ids = request.GET.getlist("types", [])
        self.types = Type.objects.filter(pk__in=types_ids) if types_ids else []
        beneficiaires_ids = request.GET.getlist("beneficiaires", [])
        self.beneficiaires = (
            Beneficiaires.objects.filter(pk__in=beneficiaires_ids)
            if beneficiaires_ids
            else []
        )
        filieres_ids = request.GET.getlist("filieres", [])
        self.filieres = (
            Filiere.objects.published().filter(pk__in=filieres_ids)
            if filieres_ids
            else []
        )
        sujets_ids = request.GET.getlist("sujets", [])
        self.sujets = Sujet.objects.filter(pk__in=sujets_ids) if sujets_ids else []

    def get_results(self):
        qs = Aide.objects.filter(parent_id=None).published()
        if self.search:
            qs = qs.annotate(
                rank=SearchRank(
                    "search_vector",
                    SearchQuery(self.search, config="french_unaccent"),
                )
            ).filter(rank__gt=0)
            order_by = "-rank"
        else:
            order_by = "-priority"
        if self.departements:
            qs = qs.by_departements(self.departements)
        if self.beneficiaires:
            qs = qs.by_beneficiaires(self.beneficiaires)
        if self.types:
            qs = qs.by_types(self.types)
        if self.sujets:
            qs = qs.by_sujets(self.sujets)
        if self.filieres:
            qs = qs.by_filieres(self.filieres)
        return (
            qs.distinct()
            .select_related("organisme")
            .prefetch_related(
                "zones_geographiques",
                "types",
                "children",
                Prefetch(
                    "sujets", queryset=Sujet.objects.published().order_by("nom_court")
                ),
            )
            .order_by(order_by, "-date_fin")
            .defer("organisme__logo")
        )


class ResultsView(ResultsMixin, ListView):
    template_name = "agri_v2/results.html"
    paginate_by = 50

    def get_queryset(self):
        return self.get_results()

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)

        context_data.update(
            {
                "skiplinks": [
                    {
                        "link": "#content",
                        "label": "Votre recherche",
                    },
                ],
                "aides": [
                    {
                        "heading_tag": "h3",
                        "extra_classes": "fr-card--horizontal fr-card--horizontal-eighth fr-card--no-icon fr-mb-2w fr-pl-2w",
                        "title": aide.nom,
                        "description": aide.promesse,
                        "link": aide.get_absolute_url(),
                        "image_url": aide.organisme.get_logo_url()
                        if aide.organisme_id
                        else static("agri/images/placeholder.1x1.svg"),
                        "image_alt": aide.organisme.nom,
                        "ratio_class": "fr-ratio-1x1",
                        "top_detail": {
                            "tags": [
                                {
                                    "extra_classes": "fr-tag--sm fr-background-alt--green-emeraude",
                                    "label": "En cours",
                                }
                                if aide.is_ongoing
                                else {
                                    "extra_classes": "fr-tag--sm fr-background-alt--pink-tuile",
                                    "label": "Clôturé",
                                }
                            ]
                            + [
                                {
                                    "label": type_aide.nom,
                                    "extra_classes": f"fr-tag--sm fr-tag--icon-left fr-icon-{type_aide.icon_name}-fill",
                                }
                                for type_aide in aide.types.all()
                            ],
                        },
                    }
                    for aide in context_data["page_obj"]
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
                    dept.code for dept in self.departements
                ],
                "filtered_departements": self.departements,
                "filter_types": [
                    (type_aides.pk, type_aides.nom, type_aides.nom)
                    for type_aides in Type.objects.all()
                ],
                "filtered_types": self.types,
                "filter_types_initials": [type_aides.pk for type_aides in self.types],
                "filter_sujets": [
                    (sujet.pk, sujet.nom_court, sujet.nom_court)
                    for sujet in Sujet.objects.all()
                ],
                "filtered_sujets": self.sujets,
                "filter_sujets_initials": [sujet.pk for sujet in self.sujets],
                "filter_filieres": [
                    (filiere.pk, filiere.nom, filiere.nom)
                    for filiere in Filiere.objects.all()
                ],
                "filtered_filieres": self.filieres,
                "filter_filieres_initials": [filiere.pk for filiere in self.filieres],
                "filter_beneficiaires": [
                    (groupement.pk, groupement.nom, groupement.nom)
                    for groupement in Beneficiaires.objects.all()
                ],
                "filtered_beneficiaires": self.beneficiaires,
                "filter_beneficiaires_initials": [
                    groupement.pk for groupement in self.beneficiaires
                ],
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
