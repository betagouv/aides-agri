from collections import defaultdict

from django import forms
from django.conf import settings
from django.shortcuts import render
from django.urls import reverse
from django.utils.text import slugify
from django.views.generic import TemplateView, ListView, View
from dsfr.forms import DsfrBaseForm

from aides.models import (
    Theme,
    Sujet,
    Aide,
    ZoneGeographique,
    Filiere,
    Type,
)
from aides_feedback.forms import (
    CreateFeedbackOnAidesForm,
    FeedbackOnThemesAndSujetsForm,
)

from .tasks import send_results_by_mail


class HomeView(TemplateView):
    template_name = "agri/home.html"
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
            return ["agri/blocks/home/themes.html"]
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
            # mix themes and sujets, sort the mix by aides_count, limit to 4
            besoins = sorted(
                list(Theme.objects.published_non_urgence())
                + list(Sujet.objects.published_with_urgent_themes()),
                key=lambda x: x.aides_count,
                reverse=True,
            )[:4]
            besoins_data = [
                {
                    "title": besoin.nom,
                    "link": reverse(
                        "agri:results",
                        query={
                            "sujet" if isinstance(besoin, Sujet) else "theme": [
                                besoin.pk
                            ]
                        },
                    ),
                    "enlarge_link": False,
                    "image_url": besoin.get_illustration_url(),
                    "top_detail": {
                        "badges": [
                            {
                                "label": f"{besoin.aides_count} dispositifs",
                                "extra_classes": "fr-badge--sm fr-badge--purple-glycine",
                            }
                        ]
                    },
                }
                for besoin in besoins
            ]
            context_data.update(
                {
                    "stats_aides_count": Aide.objects.official_published_count(),
                    "stats_organismes_count": Aide.objects.official_published_organismes_count(),
                    "besoins": besoins,
                    "besoins_data": besoins_data,
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
                    "urgent_sujets": Sujet.objects.published_with_urgent_themes().order_by(
                        "-aides_count"
                    ),
                    "themes": Theme.objects.published_non_urgence().order_by(
                        "-aides_count"
                    ),
                }
            )
        else:

            class SelectWithDisabledEmptyOption(forms.Select):
                def create_option(self, name, value, *args, attrs=None, **kwargs):
                    option_dict = super().create_option(
                        name, value, *args, attrs=attrs, **kwargs
                    )
                    if value == "":
                        option_dict["attrs"].update({"disabled": True})
                    return option_dict

            class HomePageForm(DsfrBaseForm):
                departement = forms.ChoiceField(
                    label="Votre département :",
                    required=True,
                    widget=SelectWithDisabledEmptyOption,
                    choices=[("", "Sélectionnez un département")]
                    + [
                        (dept.code, f"{dept.code} {dept.nom}")
                        for dept in ZoneGeographique.objects.departements()
                    ],
                )

            context_data.update(
                {
                    "form": HomePageForm(),
                    "DSFR_MARK_OPTIONAL_FIELDS": settings.DSFR_MARK_OPTIONAL_FIELDS,
                    "filieres_options": [
                        (filiere.pk, filiere.nom, filiere.nom)
                        for filiere in Filiere.objects.published()
                    ],
                }
            )
        return context_data


class ResultsMixin:
    ORDER_BY = {
        "cloture": ("date_fin", "-organisme__is_masa", "organisme__nom"),
        "mise-a-jour": ("-last_published_at",),
        "couverture-geographique": ("-couverture_geographique", "-last_published_at"),
    }

    def setup(self, request, *args, **kwargs):
        super().setup(request, *args, **kwargs)
        self.departement_code = request.GET.get("departement", None)
        self.departement = (
            ZoneGeographique.objects.departements()
            .filter(code__iexact=self.departement_code)
            .first()
            if self.departement_code
            else None
        )
        self.filieres_ids = request.GET.getlist("filieres", [])
        self.filieres = (
            Filiere.objects.published().filter(pk__in=self.filieres_ids)
            if self.filieres_ids
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
        self.only_closed = request.GET.get("voir_fermees", "off").lower() == "on"
        self.order_by = request.GET.get("tri", "cloture")

    def get_results(self):
        qs = Aide.objects.published()
        if self.only_closed:
            qs = qs.only_closed()
        else:
            qs = qs.only_open()
        order_by = self.__class__.ORDER_BY[self.order_by]
        if self.departement:
            qs = qs.by_departements([self.departement]).without_parents()
        else:
            qs = qs.without_departemental_derivatives().without_non_departemental_parents()
        if self.filieres:
            qs = qs.by_filieres(self.filieres)
        if self.themes or self.sujets:
            qs = qs.by_besoins(self.themes, self.sujets)

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
    template_name = "agri/results.html"

    def get_queryset(self):
        return self.get_results()

    def get_template_names(self):
        if self.request.htmx and "more" in self.request.GET:
            return ["agri/_partials/more_results_from_type.html"]
        else:
            return super().get_template_names()

    def aide_close_date_badge_color(self, aide: Aide) -> str:
        if aide.is_closed:
            return ""
        elif aide.closes_in_less_than_two_weeks:
            return "warning"
        elif aide.closes_in_less_than_a_month:
            return "green-tilleul-verveine"
        else:
            return "success"

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)

        aides_by_type = {type_aide: dict() for type_aide in Type.objects.all()}
        aides_ids = set()
        for aide in self.get_queryset():
            aides_ids.add(aide.pk)
            for type_aides in aide.types.all():
                aides_by_type[type_aides][aide] = None
        aides_by_type = {
            type_aides: aides.keys()
            for type_aides, aides in aides_by_type.items()
            if aides
        }

        total_count = sum(len(aides) for aides in aides_by_type.values())

        links_querydict = self.request.GET.copy()
        links_querydict["breadcrumb_entry_point_title"] = "Vos résultats"
        links_querydict["breadcrumb_entry_point_url"] = (
            f"{self.request.path}?{self.request.GET.urlencode()}"
        )

        # Cache all published Theme/Sujet data, it's light and it will be needed
        # in a place where we can't properly prefetch_related
        besoins = {(Theme, t.pk): t for t in Theme.objects.published()}
        besoins.update({(Sujet, s.pk): s for s in Sujet.objects.published()})

        # Cache a data structure containing non-urgent Themes and urgent Sujets for each Aide
        # It will be used in combination with the Theme/Sujet data cache above
        besoins_by_aide = defaultdict(set)
        for aide_sujet in Aide.sujets.through.objects.filter(
            sujet__published=True, sujet__themes__urgence=True, aide_id__in=aides_ids
        ):
            besoins_by_aide[aide_sujet.aide_id].add((Sujet, aide_sujet.sujet_id))
        for aide_sujet in Aide.sujets.through.objects.filter(
            sujet__published=True,
            sujet__themes__urgence=False,
            sujet__themes__published=True,
            aide_id__in=aides_ids,
        ).prefetch_related("sujet__themes"):
            for theme in aide_sujet.sujet.themes.all():
                if theme.published:
                    besoins_by_aide[aide_sujet.aide_id].add((Theme, theme.pk))

        aides_data_by_type = {
            type_aides: [
                {
                    "extra_classes": "fr-card--horizontal fr-card--horizontal-fifteen-percent fr-card--no-icon fr-mb-2w fr-pl-2w",
                    "title": aide.promesse or aide.nom,
                    "description": aide.nom if aide.promesse else "",
                    "title_max_length": 180,
                    "description_max_length": 300,
                    "call_to_action": {
                        "links": [
                            {
                                "url": f"{aide.get_absolute_url()}?{links_querydict.urlencode()}",
                                "label": "Consulter la fiche dispositif",
                                "extra_classes": "fr-link--sm fr-icon-arrow-right-line fr-link--icon-right",
                            }
                            if aide.is_complete
                            else {
                                "url": None,
                                "label": "Consulter la fiche dispositif",
                                "extra_classes": "fr-link--sm fr-icon-arrow-right-line fr-link--icon-right fr-disabled",
                            }
                        ]
                        + (
                            [
                                {
                                    "url": aide.url_descriptif,
                                    "label": "Voir le site officiel",
                                    "extra_classes": "fr-link--sm fr-icon-arrow-right-line fr-link--icon-right",
                                    "is_external": True,
                                }
                            ]
                            if aide.url_descriptif and not aide.is_complete
                            else []
                        )
                    },
                    "image_url": aide.organisme.get_illustration_url(),
                    "image_alt": aide.organisme.nom,
                    "ratio_class": "fr-ratio-1x1",
                    "top_detail": {
                        "tags": (
                            [
                                {
                                    "label": f"Clôture le {aide.date_fin.strftime('%d/%m/%Y')}",
                                    "extra_classes": f"fr-tag--sm fr-badge fr-badge--no-icon fr-badge--{self.aide_close_date_badge_color(aide)}",
                                },
                            ]
                            if aide.date_fin
                            else [
                                {
                                    "label": "En cours",
                                    "extra_classes": "fr-tag--sm fr-badge fr-badge--no-icon fr-badge--success",
                                },
                            ]
                        )
                        + [
                            {
                                "label": besoins[besoin].nom_court,
                                "extra_classes": f"fr-tag--sm fr-tag--icon-left fr-icon-{besoins[besoin].icon_name}",
                            }
                            for besoin in besoins_by_aide[aide.pk]
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
                    "aides_count": total_count,
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
                        for t in Theme.objects.published()
                        .filter(urgence=False)
                        .exclude(pk__in=self.themes_ids)
                    ]
                    + [
                        {
                            "type": "sujet",
                            "id": s.pk,
                            "label": s.nom_court,
                            "icon": s.icon_name,
                        }
                        for s in Sujet.objects.published()
                        .filter(themes__urgence=True)
                        .exclude(pk__in=self.sujets_ids)
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
                    "only_closed": self.only_closed,
                    "order_by": self.order_by,
                    "create_feedback_on_aides_form": CreateFeedbackOnAidesForm(),
                    "feedback_themes_sujets_form": FeedbackOnThemesAndSujetsForm(),
                }
            )

        return context_data


class SendResultsByMailView(ResultsMixin, View):
    def post(self, request, *args, **kwargs):
        send_results_by_mail.enqueue(
            email=self.request.POST.get("email"),
            base_url=f"{self.request.scheme}://{self.request.headers['host']}",
            departement_code=self.departement_code,
            themes_ids=self.themes_ids,
            sujets_ids=self.sujets_ids,
            filieres_ids=self.filieres_ids,
            aides_ids=[a.pk for a in self.get_results()],
        )
        return render(request, "agri/_partials/send-results-by-mail-ok.html")
