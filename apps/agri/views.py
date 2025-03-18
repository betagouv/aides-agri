import datetime
from collections import defaultdict

from django.db.models import Q
from django.templatetags.static import static
from django.utils.timezone import now
from django.views.generic import TemplateView, ListView
from django.views.generic.base import ContextMixin

from aides.models import Theme, Sujet, Aide, ZoneGeographique
from . import siret

STEPS = [
    "Choix d'un thème",
    "Choix des sujets",
    "Siret",
    "Précisions 1/2",
    "Précisions 2/2",
]


class Step1Mixin:
    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data.update(
            {
                "themes": Theme.objects.exclude(aide__isnull=True),
            }
        )
        return context_data


class HomeView(Step1Mixin, TemplateView):
    template_name = "agri/home.html"

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data.update(
            {
                "conseillers_entreprises_card": {
                    "heading_tag": "h4",
                    "extra_classes": "fr-card--horizontal fr-border-default--red-marianne",
                    "title": "Conseillers Entreprises",
                    "description": "Le service public d’accompagnement des entreprises. Échangez avec les conseillers de proximité qui peuvent vous aider dans vos projets, vos difficultés ou les transformations nécessaires à la réussite de votre entreprise.",
                    "image_url": static(
                        "agri/images/home/illustration_conseillers_entreprise.svg"
                    ),
                    "media_badges": [
                        {
                            "extra_classes": "fr-badge--green-emeraude",
                            "label": "En cours",
                        }
                    ],
                    "top_detail": {
                        "detail": {
                            "icon_class": "fr-icon-arrow-right-line",
                            "text": "Ministère de l’Économie x Ministère du Travail",
                        },
                        "tags": [{"label": "Conseil"}, {"label": "France"}],
                    },
                }
            }
        )
        return context_data


class AgriMixin(ContextMixin):
    STEP = None
    REGROUPEMENTS = {
        "interprofession": "Interprofession",
        "aop": "AOP",
        "op": "OP",
        "coop": "Coopérative",
        "giee": "GIEE",
        "cuma": "CUMA",
        "": "Aucun",
    }
    theme = None
    sujets = []
    siret = None
    departement = None

    def setup(self, request, *args, **kwargs):
        super().setup(request, *args, **kwargs)
        theme_id = request.GET.get("theme", None)
        if theme_id:
            self.theme = Theme.objects.get(pk=theme_id)
        sujets_ids = request.GET.getlist("sujets", [])
        if sujets_ids:
            self.sujets = Sujet.objects.filter(pk__in=sujets_ids)
        self.siret = request.GET.get("siret", None)
        self.commune = request.GET.get("commune", None)
        self.codes_naf = self.request.GET.getlist("nafs", [])
        self.code_effectif = self.request.GET.get("tranche_effectif_salarie", None)
        if not self.code_effectif:
            self.code_effectif = None
        self.regroupements = self.request.GET.getlist("regroupements", [])
        date_installation = self.request.GET.get("date_installation", None)
        self.date_installation = (
            datetime.date.fromisoformat(date_installation)
            if date_installation
            else None
        )

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data.update(
            {
                "summary_theme": self.theme,
                "summary_sujets": self.sujets,
                "summary_siret": self.request.GET.get("siret", None),
                "codes_naf": self.codes_naf,
                "summary_naf": [
                    siret.mapping_naf_short[naf]
                    for naf in self.codes_naf
                    if naf in siret.mapping_naf_short
                ],
                "summary_date_installation": self.date_installation,
                "summary_commune": ZoneGeographique.objects.communes().get(
                    numero=self.commune
                )
                if self.commune
                else None,
                "code_effectif": self.code_effectif,
                "summary_effectif": siret.mapping_effectif.get(
                    self.code_effectif, None
                )
                if self.code_effectif
                else None,
                "summary_regroupements": [
                    self.__class__.REGROUPEMENTS[regroupement]
                    for regroupement in self.regroupements
                ],
            }
        )

        if self.__class__.STEP:
            context_data.update(
                {
                    "stepper": {
                        "current_step_id": self.STEP,
                        "current_step_title": STEPS[self.STEP - 1],
                        "next_step_title": STEPS[self.STEP]
                        if len(STEPS) > self.STEP
                        else None,
                        "total_steps": 5,
                    },
                }
            )

        return context_data


class Step1View(AgriMixin, Step1Mixin, TemplateView):
    template_name = "agri/step-1.html"
    STEP = 1


class Step2View(AgriMixin, TemplateView):
    template_name = "agri/step-2.html"
    STEP = 2

    def get_context_data(self, **kwargs):
        extra_context = super().get_context_data(**kwargs)
        extra_context.update(
            {
                "sujets": {
                    f"sujet-{sujet.pk}": sujet
                    for sujet in Sujet.objects.filter(themes=self.theme).exclude(
                        aide__isnull=True
                    )
                }
            }
        )
        return extra_context


class Step3View(AgriMixin, TemplateView):
    template_name = "agri/step-3.html"
    STEP = 3


class Step4View(AgriMixin, TemplateView):
    template_name = "agri/step-4.html"
    STEP = 4

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        etablissement = siret.get(self.siret)
        commune = ZoneGeographique.objects.communes().get(
            numero=etablissement.get("commune")
        )
        context_data.update(
            {
                "etablissement": etablissement,
                "categories_juridiques": siret.mapping_categories_juridiques,
                "commune_initials": {
                    commune.numero: f"{commune.code_postal} {commune.nom}"
                },
            }
        )
        return context_data


class Step5View(AgriMixin, TemplateView):
    template_name = "agri/step-5.html"
    STEP = 5

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        etablissement = siret.get(self.request.GET.get("siret", ""))
        context_data.update(
            {
                "mapping_naf": siret.mapping_naf_complete_unique,
                "mapping_tranches_effectif": siret.mapping_effectif,
                "etablissement": etablissement,
                "regroupements": self.__class__.REGROUPEMENTS,
            }
        )

        naf = etablissement["activite_principale"]
        if naf in siret.mapping_naf_short:
            context_data["naf"] = {naf: siret.mapping_naf_short[naf]}

        return context_data


class ResultsView(AgriMixin, ListView):
    template_name = "agri/results.html"

    def get_queryset(self):
        return (
            Aide.objects.by_sujets(self.sujets)
            .by_zone_geographique(self.commune)
            .by_effectif(
                siret.mapping_effectif_complete[self.code_effectif]["min"],
                siret.mapping_effectif_complete[self.code_effectif]["max"],
            )
            .select_related("operateur")
            .prefetch_related("zones_geographiques")
            .order_by("-date_fin")
        )

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        aides_by_type = defaultdict(set)
        for aide in self.get_queryset():
            for type_aide in aide.types:
                aides_by_type[type_aide].add(aide)
        context_data.update(
            {
                "aides": {
                    type_aide: [
                        {
                            "heading_tag": "h2",
                            "extra_classes": "fr-card--horizontal-tier fr-card--no-icon",
                            "title": aide.nom,
                            "link": "#",
                            "image_url": static("agri/images/placeholder.1x1.svg"),
                            "ratio_class": "fr-ratio-1x1",
                            "media_badges": [
                                {
                                    "extra_classes": "fr-badge--green-emeraude",
                                    "label": "En cours",
                                }
                                if aide.date_fin is None or aide.date_fin > now().date()
                                else {
                                    "extra_classes": "fr-badge--pink-tuile",
                                    "label": "Clôturé",
                                }
                            ],
                            "top_detail": {
                                "detail": {
                                    "icon_class": "fr-icon-arrow-right-line",
                                    "text": aide.operateur.nom,
                                },
                            },
                        }
                        for aide in aides
                    ]
                    for type_aide, aides in aides_by_type.items()
                },
                "conseillers_entreprises_card_data": {
                    "heading_tag": "h2",
                    "extra_classes": "fr-card--horizontal-tier fr-border-default--red-marianne fr-my-3w",
                    "title": "Conseillers Entreprises",
                    "description": "Le service public d’accompagnement des entreprises. Échangez avec les conseillers qui peuvent vous aider dans vos projets, vos difficultés ou les transformations nécessaires à la réussite de votre entreprise.",
                    "link": "#",
                    "image_url": static(
                        "agri/images/home/illustration_conseillers_entreprise.svg"
                    ),
                    "ratio_class": "fr-ratio-1x1",
                    "media_badges": [
                        {
                            "extra_classes": "fr-badge--green-emeraude",
                            "label": "En cours",
                        }
                    ],
                    "top_detail": {
                        "detail": {
                            "icon_class": "fr-icon-arrow-right-line",
                            "text": "Ministère de l’Économie x Ministère du Travail",
                        },
                    },
                },
            }
        )
        return context_data


class SearchEtablissementView(TemplateView):
    template_name = "agri/_partials/search_etablissement.html"

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)

        q = self.request.GET.get("siret-search", "")
        if q:
            try:
                context_data.update({"hits": siret.search(q)})
            except siret.SearchUnavailable:
                context_data.update(
                    {
                        "errors": [
                            "La recherche de SIRET est impossible pour le moment. Vous pouvez visiter https://annuaire-entreprises.data.gouv.fr/ à la place."
                        ]
                    }
                )
        else:
            context_data.update({"errors": ["Veuillez saisir une recherche"]})
        return context_data


class SearchCommuneView(TemplateView):
    template_name = "ui/components/blocks/select_searchable_hits.html"

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)

        q = self.request.GET.get("commune-search", "")
        if q:
            context_data.update(
                {
                    "name": "commune",
                    "hits": ZoneGeographique.objects.communes()
                    .filter(Q(code_postal__icontains=q) | Q(nom__icontains=q))
                    .in_bulk(field_name="numero"),
                }
            )
        else:
            context_data.update({"errors": ["Veuillez saisir une recherche"]})
        return context_data
