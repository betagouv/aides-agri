import datetime
from collections import defaultdict

from django.db.models import Q
from django.templatetags.static import static
from django.utils.timezone import now
from django.views.generic import TemplateView, ListView
from django.views.generic.base import ContextMixin

from aides.models import Theme, Sujet, Aide, ZoneGeographique, Type

from .models import GroupementProducteurs, Filiere
from . import siret


class HomeView(TemplateView):
    def get_template_names(self):
        if self.request.htmx:
            template_name = "agri/_partials/home_themes.html"
        else:
            template_name = "agri/home.html"
        return [template_name]

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data.update(
            {
                "themes": Theme.objects.with_aides_count().order_by(
                    "-urgence", "-aides_count"
                ),
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
                },
            }
        )
        if self.request.htmx and self.request.GET.get("more_themes", None):
            # show more themes, partial template
            context_data["themes"] = context_data["themes"][4:]
        elif not self.request.htmx and not self.request.GET.get("more_themes", None):
            # nominal case: show only 4 themes, full page
            context_data["themes"] = context_data["themes"][:4]
        else:
            # show all themes, because more_themes was asked, but on a new page
            pass
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


class Step2View(AgriMixin, TemplateView):
    template_name = "agri/step-2.html"
    STEP = 2

    def get_context_data(self, **kwargs):
        extra_context = super().get_context_data(**kwargs)
        extra_context.update(
            {
                "sujets": {
                    f"sujet-{sujet.pk}": sujet
                    for sujet in Sujet.objects.with_aides_count()
                    .filter(themes=self.theme)
                    .order_by("-aides_count")
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
                "groupements": {
                    pk: nom
                    for pk, nom in GroupementProducteurs.objects.values_list(
                        "pk", "nom"
                    )
                },
                "filieres": [
                    (pk, nom, nom)
                    for pk, nom in Filiere.objects.values_list("pk", "nom")
                ],
                "filieres_initials": [filiere.pk] if filiere else [],
                "filieres_helper": "Nous n'avons pas pu déduire la filière de votre exploitation, veuillez en sélectionner au moins une ci-dessus."
                if not filiere
                else "",
            }
        )

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
            .select_related("organisme")
            .prefetch_related("zones_geographiques")
            .order_by("-date_fin")
        )

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        aides_by_type = defaultdict(set)
        for aide in self.get_queryset():
            for type_aide in aide.types.all():
                aides_by_type[type_aide].add(aide)
        context_data.update(
            {
                "aides": {
                    type_aide: [
                        {
                            "heading_tag": "h2",
                            "extra_classes": "fr-card--horizontal-tier fr-card--no-icon",
                            "title": aide.nom,
                            "description": aide.description_courte,
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
                                    "text": aide.organisme.nom,
                                },
                            },
                        }
                        for aide in aides
                    ]
                    for type_aide, aides in aides_by_type.items()
                },
            }
        )
        type_conseil = Type.objects.get_conseil()
        if type_conseil not in context_data["aides"]:
            context_data["aides"][type_conseil] = []
        context_data["aides"][type_conseil].append(
            {
                "heading_tag": "h2",
                "extra_classes": "fr-card--horizontal-tier fr-card--no-icon fr-border-default--red-marianne",
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
