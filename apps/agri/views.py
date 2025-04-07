import datetime
from collections import defaultdict

from django.db.models import Q
from django.utils.lorem_ipsum import sentence
from django.templatetags.static import static
from django.utils.timezone import now
from django.views.generic import TemplateView, ListView
from django.views.generic.base import ContextMixin

from aides.models import Theme, Sujet, Aide, ZoneGeographique, Operateur

from .models import GroupementProducteurs, Filiere
from . import siret


class Step1Mixin(ContextMixin):
    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data.update(
            {
                "themes": Theme.objects.all(),
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
                    },
                }
            }
        )
        context_data["themes"] = context_data["themes"][:4]
        return context_data


class AgriMixin(ContextMixin):
    STEP = None
    theme = None
    sujets = []
    siret = None
    commune = None
    date_installation = None
    filieres = []
    code_effectif = None
    regroupements = []

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
        self.filieres = request.GET.getlist("filieres", [])
        self.code_effectif = request.GET.get("tranche_effectif_salarie", None)
        if not self.code_effectif:
            self.code_effectif = None
        self.regroupements = request.GET.getlist("regroupements", [])
        date_installation = request.GET.get("date_installation", None)
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
                "filieres": self.filieres,
                "summary_filieres": Filiere.objects.filter(pk__in=self.filieres),
                "summary_date_installation": self.date_installation,
                "summary_commune": ZoneGeographique.objects.communes().get(
                    numero=self.commune
                )
                if self.commune
                else None,
                "summary_effectif": siret.mapping_effectif.get(self.code_effectif, None)
                if self.code_effectif
                else None,
                "summary_regroupements": GroupementProducteurs.objects.filter(
                    pk__in=self.regroupements
                ),
            }
        )

        if self.__class__.STEP:
            context_data.update(
                {
                    "stepper": {
                        "current_step_id": self.STEP,
                        "total_steps": 4,
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

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        etablissement = siret.get(self.siret)
        context_data.update(
            {
                "etablissement": etablissement,
                "categories_juridiques": siret.mapping_categories_juridiques,
                "commune": ZoneGeographique.objects.communes().get(
                    numero=etablissement.get("commune")
                ),
            }
        )
        return context_data


class Step5View(AgriMixin, TemplateView):
    template_name = "agri/step-5.html"
    STEP = 4

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        etablissement = siret.get(self.request.GET.get("siret", ""))
        naf = etablissement.get("activite_principale", "")
        if naf[-1].isalpha():
            naf = naf[:-1]
        filiere = Filiere.objects.filter(code_naf=naf).first()
        context_data.update(
            {
                "mapping_naf": siret.mapping_naf_complete_unique,
                "mapping_tranches_effectif": siret.mapping_effectif,
                "etablissement": etablissement,
                "groupements": GroupementProducteurs.objects.all(),
                "filieres": [
                    (pk, nom, nom)
                    for pk, nom in Filiere.objects.values_list("pk", "nom")
                ],
                "filieres_initials": [filiere.pk] if filiere else [],
                "filiere": filiere,
            }
        )

        return context_data


class ResultsView(AgriMixin, ListView):
    template_name = "agri/results.html"

    def get_queryset(self):
        all_types = list(Aide.Type)
        fake_operateur = Operateur(external_id=9999, nom="Guichet")
        return [
            Aide(
                external_id=i,
                nom="Intitulé dispositif",
                promesse=sentence(),
                types=[all_types[i % len(all_types)]],
                operateur=fake_operateur,
            )
            for i in range(0, 20)
        ]

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
                            "description": aide.promesse,
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
        context_data.update(
            {
                "self": {
                    "name": "siret",
                    "searchable": True,
                }
            }
        )

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
    template_name = "ui/components/blocks/select_rich_options.html"

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data.update(
            {
                "self": {
                    "name": "commune",
                    "searchable": True,
                }
            }
        )

        q = self.request.GET.get("commune-search", "")
        if q:
            context_data.update(
                {
                    "name": "commune",
                    "options": [
                        (zone.numero, zone, zone)
                        for zone in ZoneGeographique.objects.communes().filter(
                            Q(code_postal__icontains=q) | Q(nom__icontains=q)
                        )
                    ],
                }
            )
        else:
            context_data.update({"errors": ["Veuillez saisir une recherche"]})
        return context_data
