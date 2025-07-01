import datetime
from copy import copy

from django.db.models import Q
from django.shortcuts import render
from django.templatetags.static import static
from django.urls import reverse
from django.views.generic import TemplateView, ListView, View
from django.views.generic.base import ContextMixin
from django.views.generic.edit import CreateView

from aides.models import (
    Theme,
    Sujet,
    Aide,
    ZoneGeographique,
    GroupementProducteurs,
    Filiere,
    Type,
)
from product.forms import UserNoteForm

from . import siret
from . import tasks
from .forms import FeedbackForm


class HomeView(TemplateView):
    template_name = "agri/home.html"

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        themes_and_urls = []

        for theme in Theme.objects.published().order_by("-urgence", "-aides_count"):
            query = self.request.GET.dict()
            query.update({"theme": theme.pk})
            url = reverse("agri:step-2", query=query)
            themes_and_urls.append((url, theme))

        context_data.update(
            {
                "skiplinks": [
                    {
                        "link": "#proposition",
                        "label": "Présentation",
                    },
                    {
                        "link": "#themes",
                        "label": "Votre besoin",
                    },
                    {
                        "link": "#a-propos",
                        "label": "À propos",
                    },
                ],
                "themes": themes_and_urls,
                "feedback_themes_sujets_form": FeedbackForm,
            }
        )
        return context_data


class AgriMixin(ContextMixin):
    STEPS = {
        2: "Veuillez préciser votre besoin.",
        3: "Renseignez votre exploitation.",
        4: "Décrivez votre activité.",
    }
    STEP = None
    BREADCRUMB_TITLE = ""
    theme = None
    sujets = []
    etablissement = None
    commune = None
    date_installation = None
    filieres = []
    code_effectif = None
    groupements = []

    def setup(self, request, *args, **kwargs):
        super().setup(request, *args, **kwargs)
        theme_id = request.GET.get("theme", None)
        if theme_id:
            self.theme = Theme.objects.get(pk=theme_id)
        sujets_ids = request.GET.getlist("sujets", [])
        if sujets_ids:
            self.sujets = Sujet.objects.filter(pk__in=sujets_ids)
        code_siret = request.GET.get("siret", None)
        if code_siret:
            self.etablissement = siret.get(code_siret)
        code_commune = request.GET.get("commune", None)
        if code_commune:
            self.commune = ZoneGeographique.objects.communes().get(numero=code_commune)
        self.code_effectif = request.GET.get("tranche_effectif_salarie", None)
        date_installation = request.GET.get("date_installation", None)
        if date_installation:
            self.date_installation = datetime.date.fromisoformat(date_installation)
        filieres_ids = request.GET.getlist("filieres", [])
        if filieres_ids:
            self.filieres = Filiere.objects.filter(pk__in=filieres_ids)
        groupements_ids = request.GET.getlist("regroupements", [])
        if groupements_ids:
            self.groupements = GroupementProducteurs.objects.filter(
                pk__in=groupements_ids
            )

    def _get_breadcrumb_data(self):
        querydict = copy(self.request.GET)
        querydict.pop("siret-search", None)
        querydict.pop("commune-search", None)
        querydict.pop("filieres", None)
        querydict.pop("tranche_effectif_salarie", None)
        querydict.pop("regroupements", None)
        query_step_5 = copy(querydict)
        querydict.pop("siret", None)
        querydict.pop("commune", None)
        querydict.pop("date_installation", None)
        query_step_3 = copy(querydict)
        querydict.pop("sujets", None)
        return {
            "links": [
                {
                    "url": reverse("agri:step-2", query=querydict),
                    "title": Step2View.BREADCRUMB_TITLE,
                },
                {
                    "url": reverse("agri:step-3", query=query_step_3),
                    "title": Step3View.BREADCRUMB_TITLE,
                },
                {
                    "url": reverse("agri:step-5", query=query_step_5),
                    "title": Step5View.BREADCRUMB_TITLE,
                },
            ][0 : self.STEP - 2 if self.STEP else 3],
            "current": self.BREADCRUMB_TITLE,
        }

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data.update(
            {
                "breadcrumb_data": self._get_breadcrumb_data(),
                "skiplinks": [
                    {
                        "link": "#summary",
                        "label": "Rappel des informations saisies",
                    },
                    {
                        "link": "#form",
                        "label": "Formulaire",
                    },
                ],
                "summary_theme": self.theme,
                "summary_sujets": self.sujets,
                "summary_siret": self.etablissement.get("siret")
                if self.etablissement
                else None,
                "summary_filieres": self.filieres,
                "summary_date_installation": self.date_installation,
                "summary_commune": self.commune,
                "code_effectif": self.code_effectif,
                "summary_effectif": siret.mapping_effectif.get(self.code_effectif, None)
                if self.code_effectif
                else None,
                "summary_regroupements": self.groupements,
            }
        )

        if self.__class__.STEP:
            context_data.update(
                {
                    "stepper": {
                        "current_step_id": self.STEP,
                        "current_step_title": self.STEPS[self.STEP],
                        "total_steps": 4,
                    },
                }
            )

        return context_data


class Step2View(AgriMixin, TemplateView):
    template_name = "agri/step-2.html"
    STEP = 2
    BREADCRUMB_TITLE = "Besoin"

    def get_context_data(self, **kwargs):
        extra_context = super().get_context_data(**kwargs)
        extra_context.update(
            {
                "theme": self.theme,
                "sujets": {
                    f"sujet-{sujet.pk}": sujet
                    for sujet in Sujet.objects.published()
                    .filter(themes=self.theme)
                    .order_by("-aides_count")
                },
                "feedback_themes_sujets_form": FeedbackForm,
            }
        )
        return extra_context


class Step3View(AgriMixin, TemplateView):
    template_name = "agri/step-3.html"
    STEP = 3
    BREADCRUMB_TITLE = "Exploitation"


class Step4View(AgriMixin, TemplateView):
    template_name = "agri/step-4.html"
    STEP = 3

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data.update(
            {
                "etablissement": self.etablissement,
                "commune": ZoneGeographique.objects.communes()
                .filter(numero=self.etablissement.get("commune"))
                .first()
                if self.etablissement
                else None,
            }
        )
        return context_data


class Step5View(AgriMixin, TemplateView):
    template_name = "agri/step-5.html"
    STEP = 4
    BREADCRUMB_TITLE = "Activité"

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)

        if self.etablissement:
            naf = self.etablissement.get("activite_principale", "")
            if naf[-1].isalpha():
                naf = naf[:-1]
            filiere = Filiere.objects.filter(code_naf=naf).first()
        else:
            filiere = None
        context_data.update(
            {
                "mapping_tranches_effectif": siret.mapping_effectif,
                "tranche_effectif_salarie": siret.mapping_effectif.get(
                    self.etablissement.get("tranche_effectif_salarie", ""), None
                )
                if self.etablissement
                else None,
                "etablissement": self.etablissement,
                "groupements": [
                    (g.pk, g.nom, g.libelle)
                    for g in GroupementProducteurs.objects.all()
                ],
                "filieres": [
                    (pk, nom, nom)
                    for pk, nom in Filiere.objects.values_list("pk", "nom")
                ],
                "filieres_initials": [filiere.pk] if filiere else [],
                "filieres_helper": "Nous n'avons pas trouvé la filière de votre exploitation, veuillez l’indiquer ici."
                if self.etablissement and not filiere
                else "",
            }
        )

        return context_data


class ResultsMixin(AgriMixin):
    def get_results(self):
        return (
            Aide.objects.published()
            .by_sujets(self.sujets)
            .by_zone_geographique(self.commune)
            .by_effectif(
                siret.mapping_effectif_complete[self.code_effectif]["min"],
                siret.mapping_effectif_complete[self.code_effectif]["max"],
            )
            .select_related("organisme")
            .prefetch_related("zones_geographiques", "types")
            .order_by("-date_fin")
            .defer("organisme__logo")
        )


class ResultsView(ResultsMixin, ListView):
    template_name = "agri/results.html"
    BREADCRUMB_TITLE = "Sélection personnalisée"

    def get_queryset(self):
        return self.get_results()

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        aides_by_type = {type_aide: set() for type_aide in Type.objects.all()}
        for aide in self.get_queryset():
            for type_aide in aide.types.all():
                aides_by_type[type_aide].add(aide)
        aides_by_type = {
            type_aide: aides for type_aide, aides in aides_by_type.items() if aides
        }
        context_data.update(
            {
                "skiplinks": [
                    {
                        "link": "#summary",
                        "label": "Rappel des informations saisies",
                    },
                    {
                        "link": "#recommandation",
                        "label": "Notre recommandation",
                    },
                ],
                "aides": {
                    type_aide: [
                        {
                            "heading_tag": "h3",
                            "extra_classes": "fr-card--horizontal fr-card--horizontal-fifth fr-card--no-icon",
                            "title": aide.nom,
                            "description": aide.promesse,
                            "link": aide.get_absolute_url(),
                            "image_url": aide.organisme.get_logo_url()
                            if aide.organisme_id
                            else static("agri/images/placeholder.1x1.svg"),
                            "image_alt": aide.organisme.nom,
                            "ratio_class": "fr-ratio-1x1",
                        }
                        for aide in aides
                    ]
                    for type_aide, aides in aides_by_type.items()
                },
                "user_note_form": UserNoteForm(),
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


class SendResultsByMailView(ResultsMixin, View):
    def post(self, request, *args, **kwargs):
        tasks.send_results_by_mail.enqueue(
            email=self.request.POST.get("email"),
            base_url=f"{self.request.scheme}://{self.request.headers['host']}",
            theme_id=self.theme.pk,
            sujets_ids=[s.pk for s in self.sujets],
            etablissement={
                k: v for k, v in self.etablissement.items() if k in ("siret", "nom")
            },
            commune_id=self.commune.pk,
            date_installation=self.date_installation.isoformat(),
            effectif=(self.code_effectif, siret.mapping_effectif[self.code_effectif]),
            filieres_ids=[f.pk for f in self.filieres],
            groupements_ids=[g.pk for g in self.groupements],
            aides_ids=[a.pk for a in self.get_results()],
        )
        return render(request, "agri/_partials/send-results-by-mail-ok.html")


class CreateFeedbackView(CreateView):
    form_class = FeedbackForm

    def form_valid(self, form: FeedbackForm):
        form.instance.sent_from_url = self.request.htmx.current_url
        self.object = form.save()
        return render(self.request, "agri/_partials/feedback_themes_sujets_ok.html")
