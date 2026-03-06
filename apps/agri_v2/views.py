import operator

from django.shortcuts import render
from django.templatetags.static import static
from django.urls import reverse
from django.utils.text import slugify
from django.views.generic import TemplateView, ListView, View

from aides.models import (
    Theme,
    Sujet,
    Aide,
    ZoneGeographique,
    Filiere,
    Type,
)

from agri import tasks
from aides_feedback.forms import CreateFeedbackOnAidesForm


class HomeView(TemplateView):
    template_name = "agri_v2/home.html"
    extra_context = {
        "skiplinks": [
            {"link": "#recherche", "label": "Chercher des dispositifs"},
            {"link": "#proposition-header", "label": "Présentation"},
            {"link": "#besoin", "label": "Thématiques"},
        ],
    }

    def setup(self, request, *args, **kwargs):
        super().setup(request, *args, **kwargs)
        self.departement_code = request.GET.get("departement", None)
        self.filieres_ids = request.GET.getlist("filieres", [])

    def get_template_names(self):
        if self.request.htmx:
            return ["agri_v2/blocks/home/themes.html"]
        else:
            return super().get_template_names()

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)

        context_data.update(
            {
                "departement_code": self.departement_code,
                "filieres_ids": self.filieres_ids,
            }
        )

        # on full page, whatever the step
        if not self.request.htmx:
            themes = [
                (
                    {
                        "title": theme.nom,
                        "link": reverse(
                            "agri_v2:results", query={"themes": [theme.pk]}
                        ),
                        "enlarge_link": False,
                        "image_url": theme.get_illustration_url(),
                        "top_detail": {
                            "badges": [
                                {
                                    "label": f"{theme.aides_count} dispositifs",
                                    "extra_classes": "fr-badge--sm fr-badge--purple-glycine",
                                }
                            ]
                        },
                    },
                    theme.aides_count,
                )
                for theme in Theme.objects.published()
            ]
            sujets = [
                (
                    {
                        "title": sujet.nom,
                        "link": reverse(
                            "agri_v2:results", query={"sujets": [sujet.pk]}
                        ),
                        "enlarge_link": False,
                        "image_url": sujet.get_illustration_url(),
                        "top_detail": {
                            "badges": [
                                {
                                    "label": f"{sujet.aides_count} dispositifs",
                                    "extra_classes": "fr-badge--sm fr-badge--purple-glycine",
                                }
                            ]
                        },
                    },
                    sujet.aides_count,
                )
                for sujet in Sujet.objects.published()
            ]
            # mix themes and sujets, and sort the mix by aides_count (stored as the second term of each 2-tuple)
            besoins = [
                besoin[0]
                for besoin in sorted(
                    themes + sujets, key=operator.itemgetter(1), reverse=True
                )
            ]
            context_data.update(
                {
                    "stats_aides_count": Aide.objects.official_published_count(),
                    "stats_organismes_count": Aide.objects.official_published_organismes_count(),
                    "besoins": besoins[:4],
                }
            )

        # whether htmx or not, depending on input departement, load a form or the other
        if self.departement_code:
            context_data.update(
                {
                    "departement": ZoneGeographique.objects.departements().get(
                        code=self.departement_code
                    ),
                    "filieres": Filiere.objects.filter(pk__in=self.filieres_ids),
                    "urgent_sujets": Theme.objects.filter(urgence=True)
                    .first()
                    .sujets.published()
                    .order_by("-aides_count"),
                    "themes": Theme.objects.published()
                    .filter(urgence=False)
                    .order_by("-aides_count"),
                }
            )
        else:
            context_data.update(
                {
                    "departement_default": {
                        "text": "Sélectionnez un département",
                        "disabled": True,
                        "value": "",
                    },
                    "departement_options": [
                        {"value": dept.code, "text": f"{dept.code} {dept.nom}"}
                        for dept in ZoneGeographique.objects.departements()
                    ],
                    "filieres_options": [
                        (filiere.pk, filiere.nom, filiere.nom)
                        for filiere in Filiere.objects.published()
                    ],
                }
            )
        return context_data


class ResultsMixin:
    ORDER_BY = {
        "publication": ("-last_published_at", "-date_fin"),
        "cloture": ("date_fin", "-priority"),
    }

    def setup(self, request, *args, **kwargs):
        super().setup(request, *args, **kwargs)
        departement_code = request.GET.get("departement", None)
        self.departement = (
            ZoneGeographique.objects.departements().get(code__iexact=departement_code)
            if departement_code
            else None
        )
        filieres_ids = request.GET.getlist("filieres", [])
        self.filieres = (
            Filiere.objects.published().filter(pk__in=filieres_ids)
            if filieres_ids
            else []
        )
        self.themes_ids = request.GET.getlist("themes", None)
        self.themes = (
            Theme.objects.filter(pk__in=self.themes_ids) if self.themes_ids else []
        )
        self.sujets_ids = request.GET.getlist("sujets", None)
        self.sujets = (
            Sujet.objects.filter(pk__in=self.sujets_ids) if self.sujets_ids else []
        )
        self.order_by = request.GET.get("tri", "publication")

    def get_results(self):
        qs = Aide.objects.published()
        order_by = self.__class__.ORDER_BY[self.order_by]
        if self.departement:
            qs = qs.by_departements([self.departement]).without_parents()
        else:
            qs = qs.without_departemental_derivatives().without_non_departemental_parents()
        if self.filieres:
            qs = qs.by_filieres(self.filieres)
        if self.themes:
            qs = qs.by_themes(self.themes)
        if self.sujets:
            qs = qs.by_sujets(self.sujets)
        return (
            qs.distinct()
            .select_related("organisme")
            .prefetch_related(
                "zones_geographiques",
                "types",
                "children",
                "sujets",
                "sujets__themes",
            )
            .order_by(*order_by)
            .defer("organisme__illustration")
        )


class ResultsView(ResultsMixin, ListView):
    template_name = "agri_v2/results.html"

    def get_queryset(self):
        return self.get_results()

    def get_template_names(self):
        if self.request.htmx and "more" in self.request.GET:
            return ["agri_v2/_partials/more_results_from_type.html"]
        else:
            return super().get_template_names()

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)

        aides_by_type = {type_aide: set() for type_aide in Type.objects.all()}
        for aide in self.get_queryset():
            for type_aides in aide.types.all():
                aides_by_type[type_aides].add(aide)
        aides_by_type = {
            type_aides: aides for type_aides, aides in aides_by_type.items() if aides
        }

        aides_data_by_type = {
            type_aides: [
                {
                    "heading_tag": "h3",
                    "extra_classes": "fr-card--horizontal fr-card--horizontal-eighth fr-card--no-icon fr-mb-2w fr-pl-2w",
                    "title": aide.promesse or aide.nom,
                    "description": aide.nom if aide.promesse else "",
                    "call_to_action": {
                        "links": [
                            {
                                "url": aide.get_absolute_url(),
                                "label": "Consulter la fiche dispositif",
                                "extra_classes": "fr-link--sm fr-icon-arrow-right-line fr-link--icon-right",
                            }
                            if aide.is_complete
                            else {
                                "label": "Consulter la fiche dispositif",
                                "extra_classes": "fr-link--sm fr-icon-arrow-right-line fr-link--icon-right fr-disabled",
                            },
                            {
                                "url": aide.url_descriptif,
                                "label": "Voir le site officiel",
                                "extra_classes": "fr-link--sm fr-icon-arrow-right-line fr-link--icon-right",
                                "is_external": True,
                            }
                            if aide.url_descriptif and not aide.is_complete
                            else {},
                        ]
                    },
                    "image_url": aide.organisme.get_illustration_url()
                    if aide.organisme_id
                    else static("agri/images/placeholder.1x1.svg"),
                    "image_alt": aide.organisme.nom,
                    "ratio_class": "fr-ratio-1x1",
                    "top_detail": {
                        "tags": (
                            [
                                {
                                    "label": f"Clôture le {aide.date_fin.strftime('%d/%m/%Y')}",
                                    "extra_classes": f"fr-tag--sm fr-badge fr-badge--no-icon fr-badge--{aide.ui_badge_color}",
                                },
                            ]
                            if aide.date_fin
                            else []
                        )
                        + [
                            {
                                "label": besoin.nom_court,
                                "extra_classes": f"fr-tag--sm fr-tag--icon-left fr-icon-{besoin.icon_name}",
                            }
                            for besoin in aide.besoins
                        ],
                    },
                }
                for aide in aides
            ]
            for type_aides, aides in aides_by_type.items()
        }

        if type_id := self.request.GET.get("more", None):
            type_aides = Type.objects.get(pk=type_id)
            context_data.update(
                {"type_aides": type_aides, "aide_list": aides_data_by_type[type_aides]}
            )
        else:
            context_data.update(
                {
                    "skiplinks": [
                        {
                            "link": "#content",
                            "label": "Vos résultats",
                        },
                    ],
                    "breadcrumb_data": {
                        "current": "Vos résultats",
                    },
                    "sidemenu_data": {
                        "title": "Menu par types d’aides",
                        "items": [
                            {
                                "link": f"#type-aides-{slugify(type_aides.nom)}",
                                "label": type_aides.nom,
                            }
                            for type_aides in aides_by_type.keys()
                        ],
                    },
                    "aides": aides_data_by_type,
                    "departement_options": [
                        {"value": dept.code, "text": f"{dept.code} {dept.nom}"}
                        for dept in ZoneGeographique.objects.departements()
                    ],
                    "departement": self.departement.code if self.departement else None,
                    "departement_default": {
                        "text": "Sélectionnez un département",
                        "disabled": True,
                    },
                    "filieres_options": [
                        (filiere.pk, filiere.nom, filiere.nom)
                        for filiere in Filiere.objects.published()
                    ],
                    "filieres_initials": [filiere.pk for filiere in self.filieres],
                    "besoins_options": [
                        {
                            "type": "theme",
                            "id": t.pk,
                            "label": t.nom_court,
                            "icon": t.icon_name,
                        }
                        for t in Theme.objects.filter(urgence=False).exclude(
                            pk__in=self.themes_ids
                        )
                    ]
                    + [
                        {
                            "type": "sujet",
                            "id": s.pk,
                            "label": s.nom_court,
                            "icon": s.icon_name,
                        }
                        for s in Sujet.objects.filter(themes__urgence=True).exclude(
                            pk__in=self.sujets_ids
                        )
                    ],
                    "besoins_initials": [
                        {
                            "type": "theme",
                            "id": t.pk,
                            "label": t.nom_court,
                            "icon": t.icon_name,
                        }
                        for t in self.themes
                    ]
                    + [
                        {
                            "type": "sujet",
                            "id": s.pk,
                            "label": s.nom_court,
                            "icon": s.icon_name,
                        }
                        for s in self.sujets
                    ],
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
