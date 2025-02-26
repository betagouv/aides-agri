from django.http.request import QueryDict
from django.urls import reverse
from django.views.generic import TemplateView
from django.views.generic.base import ContextMixin

from . import siret

STEPS = [
    "Choix d'un thème",
    "Choix des sous-thèmes",
    "Siret",
    "Précisions",
    "Approfondissement",
]


class AgriMixin(ContextMixin):
    STEP = None

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        codes_naf = self.request.GET.getlist("naf[]", [])
        code_effectif = self.request.GET.get("tranche_effectif_salarie", None)
        context_data.update(
            {
                "summary_theme": self.request.GET.get("theme", None),
                "summary_sujets": self.request.GET.getlist("sujets[]", []),
                "summary_siret": self.request.GET.get("siret", None),
                "codes_naf": codes_naf,
                "summary_naf": [
                    siret.mapping_naf_short[naf]
                    for naf in codes_naf
                    if naf in siret.mapping_naf_short
                ],
                "summary_cp": self.request.GET.get("cp", None),
                "code_effectif": code_effectif,
                "summary_effectif": siret.mapping_tranche_effectif_salarie.get(
                    code_effectif, None
                ),
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


class Step1View(AgriMixin, TemplateView):
    template_name = "agri/step-1.html"
    STEP = 1

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


class Step2View(AgriMixin, TemplateView):
    template_name = "agri/step-2.html"
    STEP = 2

    extra_context = {
        "options": [
            {"id": "subject1", "name": "sujets[]", "value": "Sous-thème 1"},
            {"id": "subject2", "name": "sujets[]", "value": "Sous-thème 2"},
            {"id": "subject3", "name": "sujets[]", "value": "Sous-thème 3"},
            {"id": "subject4", "name": "sujets[]", "value": "Sous-thème 4"},
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
            "mapping_naf": siret.mapping_naf_complete_unique,
            "mapping_tranches_effectif": siret.mapping_tranche_effectif_salarie,
            "etablissement": etablissement,
        }

        naf = etablissement["activite_principale"]
        if naf in siret.mapping_naf_short:
            extra_context["naf"] = {naf: siret.mapping_naf_short[naf]}

        return extra_context


class Step5View(AgriMixin, TemplateView):
    template_name = "agri/step-5.html"
    STEP = 5


class ResultsView(AgriMixin, TemplateView):
    template_name = "agri/results.html"

    extra_context = {
        "main_cards_data": {
            "title": "Intitulé dispositif",
            "image_url": "/static/agri/images/placeholder.1x1.svg",
            "ratio_class": "fr-ratio-1x1",
            "media_badges": [
                {
                    "extra_classes": "fr-badge--green-emeraude",
                    "label": "En cours",
                }
            ],
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
        },
        "closed_cards_data": {
            "title": "Intitulé dispositif",
            "image_url": "/static/agri/images/placeholder.1x1.svg",
            "ratio_class": "fr-ratio-1x1",
            "media_badges": [
                {
                    "extra_classes": "fr-badge--pink-tuile",
                    "label": "Clôturé",
                }
            ],
            "top_detail": {
                "tags": [
                    {"label": "Type d'aide"},
                    {"label": "Zone géographique"},
                ],
                "detail": {
                    "icon_class": "fr-icon-arrow-right-line",
                    "text": "Guichet",
                },
            },
        },
    }


class SearchCompanyView(TemplateView):
    template_name = "agri/_partials/search_company.html"

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)

        q = self.request.GET.get("siret", "")
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
