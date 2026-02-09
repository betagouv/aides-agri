from django.contrib.postgres.search import SearchQuery, SearchRank
from django.db.models import Count, Prefetch, Q
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
        self.choose_theme = request.GET.get("choisir_theme", False)
        self.search = request.GET.get("recherche", False)

    def get_template_names(self):
        if self.request.htmx:
            if self.choose_theme:
                template_name = "agri_v2/blocks/home/themes.html"
            elif self.search:
                template_name = "agri_v2/blocks/home/recherche.html"
            else:
                template_name = "agri_v2/blocks/home/choix_parcours.html"
            return [template_name]
        else:
            return super().get_template_names()

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)

        context_data.update(
            {
                "departement": self.departement_code,
                "beneficiaires_agris": Beneficiaires.objects.agris(),
            }
        )

        if self.choose_theme:
            context_data.update(
                {
                    "themes": Theme.objects.published()
                    .exclude(sujets__aides=None)
                    .prefetch_related("sujets")
                }
            )
        elif self.search:
            context_data.update({"recherche": True})
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
    ORDER_BY = {
        "pertinence": ("-priority", "-date_fin"),
        "publication": ("-last_published_at", "-date_fin"),
        "cloture": ("date_fin", "-priority"),
    }

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
        themes_ids = request.GET.getlist("themes", None)
        self.themes = Theme.objects.filter(pk__in=themes_ids) if themes_ids else []
        self.can_include_closed = True
        self.include_closed = request.GET.get("inclure_fermes", "off").lower() == "on"
        self.order_by = request.GET.get("tri", "pertinence")

    def get_results(self):
        qs = Aide.objects.filter(parent_id=None).published()
        if self.search:
            qs = qs.annotate(
                rank=SearchRank(
                    "search_vector",
                    SearchQuery(self.search, config="french_unaccent"),
                )
            ).filter(rank__gt=0)
            order_by = ("-rank", "-priority", "-date_fin")
        else:
            order_by = self.__class__.ORDER_BY[self.order_by]
        if self.departements:
            qs = qs.by_departements(self.departements)
        if self.beneficiaires:
            qs = qs.by_beneficiaires(self.beneficiaires)
        if self.types:
            qs = qs.by_types(self.types)
        if self.themes:
            qs = qs.by_themes(self.themes)
        if self.filieres:
            qs = qs.by_filieres(self.filieres)
        if self.order_by == "cloture":
            self.include_closed = False
            self.can_include_closed = False
        if not self.include_closed:
            qs = qs.only_open()
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
            .order_by(*order_by)
            .defer("organisme__logo")
        )


def fr_pluralize(counter: int):
    return "s" if counter > 1 else ""


class ResultsView(ResultsMixin, ListView):
    template_name = "agri_v2/results.html"
    paginate_by = 50

    def get_queryset(self):
        return self.get_results()

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)

        q_is_in_results = Q(aides__in=self.object_list)
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
                        "call_to_action": {
                            "links": [
                                {
                                    "url": aide.get_absolute_url(),
                                    "label": "Voir la fiche dispositif",
                                    "extra_classes": "fr-link--sm fr-icon-arrow-right-line fr-link--icon-right",
                                }
                                if aide.is_complete
                                else {
                                    "url": aide.url_descriptif,
                                    "label": "Voir le descriptif",
                                    "extra_classes": "fr-link--sm fr-icon-arrow-right-line fr-link--icon-right",
                                    "is_external": True,
                                }
                                if aide.url_descriptif
                                else {},
                                {
                                    "url": aide.url_demarche,
                                    "label": "Déposer son dossier",
                                    "extra_classes": "fr-link--sm fr-icon-arrow-right-line fr-link--icon-right",
                                    "is_external": True,
                                }
                                if aide.url_demarche
                                else {},
                            ]
                        },
                        "image_url": aide.organisme.get_logo_url()
                        if aide.organisme_id
                        else static("agri/images/placeholder.1x1.svg"),
                        "image_alt": aide.organisme.nom,
                        "ratio_class": "fr-ratio-1x1",
                        "media_badges": [
                            {
                                "extra_classes": "fr-badge--sm fr-badge--green-emeraude",
                                "label": "En cours",
                            }
                            if aide.is_ongoing
                            else {
                                "extra_classes": "fr-badge--sm fr-badge--pink-tuile",
                                "label": "Clôturé",
                            }
                        ],
                        "top_detail": {
                            "tags": [
                                {
                                    "label": aide.couverture_geographique,
                                    "extra_classes": "fr-tag--sm",
                                }
                            ]
                            + [
                                {
                                    "label": type_aide.nom,
                                    "extra_classes": f"fr-tag--sm fr-tag--icon-left fr-icon-{type_aide.icon_name}-fill",
                                }
                                for type_aide in aide.types.all()
                            ]
                            + [
                                {
                                    "label": sujet.nom_court,
                                    "extra_classes": "fr-tag--sm fr-hidden fr-unhidden-md",
                                }
                                for sujet in aide.sujets.all()
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
                    (
                        type_aides.pk,
                        f"{type_aides.nom} ({type_aides.aides_count} dispositif{fr_pluralize(type_aides.aides_count)})",
                        type_aides.nom,
                    )
                    for type_aides in Type.objects.annotate(
                        aides_count=Count(
                            "aides",
                            filter=q_is_in_results,
                            distinct=True,
                        )
                    )
                    .distinct()
                    .order_by("nom")
                ],
                "filtered_types": self.types,
                "filter_types_initials": [type_aides.pk for type_aides in self.types],
                "filter_themes": [
                    (
                        theme.pk,
                        f"{theme.nom_court} ({theme.aides_count} dispositif{fr_pluralize(theme.aides_count)})",
                        theme.nom_court,
                    )
                    for theme in Theme.objects.published()
                    .order_by("nom_court")
                    .annotate(
                        aides_count=Count(
                            "sujets__aides",
                            filter=Q(sujets__aides__in=self.object_list),
                            distinct=True,
                        )
                    )
                    .distinct()
                ],
                "filtered_themes": self.themes,
                "filter_themes_initials": [theme.pk for theme in self.themes],
                "filter_filieres": [
                    (
                        filiere.pk,
                        f"{filiere.nom} ({filiere.aides_count} dispositif{fr_pluralize(filiere.aides_count)})",
                        filiere.nom,
                    )
                    for filiere in Filiere.objects.published()
                    .annotate(
                        aides_count=Count(
                            "aides",
                            filter=q_is_in_results,
                            distinct=True,
                        )
                    )
                    .distinct()
                ],
                "filtered_filieres": self.filieres,
                "filter_filieres_initials": [filiere.pk for filiere in self.filieres],
                "filter_beneficiaires": [
                    (
                        beneficiaires.pk,
                        f"{beneficiaires.nom} ({beneficiaires.aides_count} dispositif{fr_pluralize(beneficiaires.aides_count)})",
                        beneficiaires.nom,
                    )
                    for beneficiaires in Beneficiaires.objects.all()
                    .order_by("nom")
                    .annotate(
                        aides_count=Count(
                            "aides",
                            filter=q_is_in_results,
                            distinct=True,
                        )
                    )
                    .distinct()
                ],
                "filtered_beneficiaires": self.beneficiaires,
                "filter_beneficiaires_initials": [
                    beneficiaires.pk for beneficiaires in self.beneficiaires
                ],
                "include_closed": self.include_closed,
                "can_include_closed": self.can_include_closed,
                "order_by": self.order_by,
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
            sujets_ids=[s.pk for s in self.themes],
            commune_id=self.commune.pk,
            filieres_ids=[f.pk for f in self.filieres],
            groupements_ids=[g.pk for g in self.groupements],
            aides_ids=[a.pk for a in self.get_results()],
        )
        return render(request, "agri/_partials/send-results-by-mail-ok.html")
