import datetime

from django.http.request import QueryDict
from django.templatetags.static import static
from django.urls import reverse
from django.utils.timezone import now
from django.views.generic import TemplateView
from django.views.generic.base import ContextMixin

from aides.models import Theme, Sujet, Aide, ZoneGeographique
from . import siret
from . import utils

STEPS = [
    "Choix d'un thème",
    "Choix des sous-thèmes",
    "Siret",
    "Précisions 1/2",
    "Précisions 2/2",
]


class Step1Mixin:
    extra_context = {
        "themes": Theme.objects.all(),
    }


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
                        {"extra_classes": "fr-badge--green-emeraude", "label": "En cours"}
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
        "": "Non",
    }
    theme = None
    sujets = []
    departement = None

    def setup(self, request, *args, **kwargs):
        super().setup(request, *args, **kwargs)
        theme_id = request.GET.get("theme", None)
        if theme_id:
            self.theme = Theme.objects.get(pk=theme_id)
        sujets_ids = request.GET.getlist("sujets[]", [])
        if sujets_ids:
            self.sujets = Sujet.objects.filter(pk__in=sujets_ids)
        self.departement = request.GET.get("departement", None)

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        codes_naf = self.request.GET.getlist("naf[]", [])
        code_effectif = self.request.GET.get("tranche_effectif_salarie", None)
        regroupements = self.request.GET.getlist("regroupements[]", [])
        date_installation = self.request.GET.get("date_installation", None)
        context_data.update(
            {
                "summary_theme": self.theme,
                "summary_sujets": self.sujets,
                "summary_siret": self.request.GET.get("siret", None),
                "codes_naf": codes_naf,
                "summary_naf": [
                    siret.mapping_naf_short[naf]
                    for naf in codes_naf
                    if naf in siret.mapping_naf_short
                ],
                "summary_departement": self.request.GET.get("departement", None),
                "summary_date_installation": datetime.date.fromisoformat(date_installation) if date_installation else None,
                "code_effectif": code_effectif,
                "summary_effectif": siret.mapping_tranche_effectif_salarie.get(
                    code_effectif, None
                ),
                "summary_regroupements": [self.__class__.REGROUPEMENTS[regroupement] for regroupement in regroupements]
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
                    f"subject-{sujet.pk}": sujet
                    for sujet in Sujet.objects.filter(themes=self.theme)
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

    @property
    def extra_context(self) -> dict:
        etablissement = siret.get(self.request.GET.get("siret", ""))
        extra_context = {
            "etablissement": etablissement,
            "departements": {z.numero: z.nom for z in ZoneGeographique.objects.departements()},
        }

        return extra_context


class Step5View(AgriMixin, TemplateView):
    template_name = "agri/step-5.html"
    STEP = 5

    @property
    def extra_context(self) -> dict:
        etablissement = siret.get(self.request.GET.get("siret", ""))
        extra_context = {
            "mapping_naf": siret.mapping_naf_complete_unique,
            "mapping_tranches_effectif": siret.mapping_tranche_effectif_salarie,
            "etablissement": etablissement,
            "regroupements": self.__class__.REGROUPEMENTS,
        }

        naf = etablissement["activite_principale"]
        if naf in siret.mapping_naf_short:
            extra_context["naf"] = {naf: siret.mapping_naf_short[naf]}

        return extra_context


class ResultsView(AgriMixin, TemplateView):
    template_name = "agri/results.html"
    NATURES_AIDES = {
        "Audit": False,
        "Avantage fiscal": False,
        "Conseil": True,
        "Étude": False,
        "Financement": True,
        "Formation": True,
        "Prêt": False,
        "Remplacement": False,
    }

    def get_context_data(self, **kwargs):
        extra_context = super().get_context_data(**kwargs)
        extra_context.update({
            "aides": [
                {
                    "title": aide.nom,
                    "image_url": "/static/agri/images/placeholder.1x1.svg",
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
                        "tags": [
                            {
                                "label": aide.nature.nom,
                                "extra_classes": "fr-tag--sm",
                            },
                            {
                                "label": aide.couverture_geographique.nom,
                                "extra_classes": "fr-tag--sm",
                            }
                            if aide.couverture_geographique
                            else {},
                        ],
                        "detail": {
                            "icon_class": "fr-icon-arrow-right-line",
                            "text": aide.operateur.nom,
                        },
                    },
                }
                for aide in Aide.objects.filter(
                    zones_geographiques=ZoneGeographique.objects.get(
                        numero=self.departement
                    ).parent
                )
            ],
        })
        return extra_context


class SearchCompanyView(TemplateView):
    template_name = "agri/_partials/search_company.html"

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
