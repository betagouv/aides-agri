from django.http.request import QueryDict
from django.urls import reverse
from django.utils.timezone import now
from django.views.generic import TemplateView
from django.views.generic.base import ContextMixin

from aides.models import Theme, Sujet, Aide, ZoneGeographique
from . import siret

STEPS = [
    "Choix d'un thème",
    "Choix des sous-thèmes",
    "Siret",
    "Précisions",
    "Approfondissement",
]


class Step1Mixin:
    extra_context = {
        "themes": [
            {
                "id": theme.pk,
                "title": theme.nom,
                "description": "Description",
                "detail": "Détail",
            }
            for theme in Theme.objects.all()
        ],
    }

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        for theme in context_data["themes"]:
            theme["link"] = (
                reverse("agri:step-2")
                + "?"
                + QueryDict.fromkeys(("theme",), theme["id"]).urlencode()
            )
        return context_data


class HomeView(Step1Mixin, TemplateView):
    template_name = "agri/home.html"


class AgriMixin(ContextMixin):
    STEP = None
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
        cp = request.GET.get("cp", None)
        if cp:
            if cp.startswith("9") and not cp.startswith("90"):
                self.departement = cp[:3]
            else:
                self.departement = cp[:2]

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        codes_naf = self.request.GET.getlist("naf[]", [])
        code_effectif = self.request.GET.get("tranche_effectif_salarie", None)
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

    def get_context_data(self, **kwargs):
        extra_context = super().get_context_data(**kwargs)
        extra_context.update(
            {
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
            }
        )
        return extra_context


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
