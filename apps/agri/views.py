import datetime
from copy import deepcopy

from django.http.request import QueryDict
from django.templatetags.static import static
from django.urls import reverse
from django.utils import lorem_ipsum
from django.views.generic import TemplateView
from django.views.generic.base import ContextMixin

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
        "themes": [
            {
                "title": "Thème 1",
                "description": "Description",
                "detail": "Détail",
            },
            {
                "title": "Thème 2",
                "description": "Description",
                "detail": "Détail",
            },
            {
                "title": "Thème 3",
                "description": "Description",
                "detail": "Détail",
            },
            {
                "title": "Thème 4",
                "description": "Description",
                "detail": "Détail",
            },
        ],
    }

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        for theme in context_data["themes"]:
            theme["link"] = (
                reverse("agri:step-2")
                + "?"
                + QueryDict.fromkeys(("theme",), theme["title"]).urlencode()
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
        "": "Aucun",
    }

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        codes_naf = self.request.GET.getlist("nafs", [])
        code_effectif = self.request.GET.get("tranche_effectif_salarie", None)
        regroupements = self.request.GET.getlist("regroupements", [])
        date_installation = self.request.GET.get("date_installation", None)
        date_installation = datetime.date.fromisoformat(date_installation) if date_installation else None
        context_data.update(
            {
                "summary_theme": self.request.GET.get("theme", None),
                "summary_sujets": self.request.GET.getlist("sujets", []),
                "summary_siret": self.request.GET.get("siret", None),
                "codes_naf": codes_naf,
                "summary_naf": [
                    siret.mapping_naf_short[naf]
                    for naf in codes_naf
                    if naf in siret.mapping_naf_short
                ],
                "summary_departement": self.request.GET.get("departement", None),
                "summary_date_installation": date_installation,
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

    extra_context = {
        "options": [
            {"id": "subject1", "name": "sujets", "value": "Sous-thème 1"},
            {"id": "subject2", "name": "sujets", "value": "Sous-thème 2"},
            {"id": "subject3", "name": "sujets", "value": "Sous-thème 3"},
            {"id": "subject4", "name": "sujets", "value": "Sous-thème 4"},
        ],
    }


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
            "departements": utils.mapping_departements,
            "categories_juridiques": siret.mapping_categories_juridiques,
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
    NATURES_AIDES = (
        "Audit",
        "Avantage fiscal",
        "Conseil",
        "Étude",
        "Financement",
        "Formation",
        "Prêt",
        "Remplacement",
    )

    card_data = {
        "heading_tag": "h2",
        "extra_classes": "fr-card--horizontal-tier",
        "title": "Intitulé dispositif",
        "description": lorem_ipsum.paragraph(),
        "image_url": static("agri/images/placeholder.1x1.svg"),
        "media_badges": [],
        "top_detail": {
            "tags": [
                {"label": "Type d'aide", "extra_classes": "fr-tag--sm"},
                {"label": "Zone géographique", "extra_classes": "fr-tag--sm"},
            ],
            "detail": {
                "icon_class": "fr-icon-arrow-right-line",
                "text": "Guichet",
            },
        },
    }
    open_cards_data = deepcopy(card_data)
    open_cards_data["media_badges"].append(
        {
            "extra_classes": "fr-badge--green-emeraude",
            "label": "En cours",
        }
    )
    closed_cards_data = deepcopy(card_data)
    closed_cards_data["media_badges"].append(
        {
            "extra_classes": "fr-badge--pink-tuile",
            "label": "Clôturé",
        }
    )
    conseillers_entreprises_card_data = deepcopy(open_cards_data)
    conseillers_entreprises_card_data["extra_classes"] = "fr-card--horizontal-half fr-border-default--red-marianne"
    conseillers_entreprises_card_data["title"] = "Conseillers Entreprises"
    conseillers_entreprises_card_data["description"] = "Le service public d’accompagnement des entreprises. Échangez avec les conseillers qui peuvent vous aider dans vos projets, vos difficultés ou les transformations nécessaires à la réussite de votre entreprise."
    conseillers_entreprises_card_data["image_url"] = static("agri/images/home/illustration_conseillers_entreprise.svg")
    conseillers_entreprises_card_data["top_detail"]["detail"]["text"] = "Ministère de l’Économie x Ministère du Travail"
    conseillers_entreprises_card_data["top_detail"]["tags"][0]["label"] = "Conseil"
    conseillers_entreprises_card_data["top_detail"]["tags"][1]["label"] = "France"

    extra_context = {
        "open_cards_data": open_cards_data,
        "closed_cards_data": closed_cards_data,
        "conseillers_entreprises_card_data": conseillers_entreprises_card_data,
        "natures_aides": NATURES_AIDES,
    }


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
