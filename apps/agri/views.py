import datetime
from collections import defaultdict

from django.db.models import Q
from django.shortcuts import render
from django.templatetags.static import static
from django.utils.timezone import now
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
)
from product.forms import UserNoteForm

from . import siret
from . import tasks
from .forms import FeedbackForm


class HomeView(TemplateView):
    def get_template_names(self):
        if self.request.htmx:
            template_name = "agri/_partials/home_themes.html"
        else:
            template_name = "agri/home.html"
        return [template_name]

    extra_context = {
        "themes": Theme.objects.with_aides_count().order_by("-urgence", "-aides_count"),
    }

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)

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

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data.update(
            {
                "summary_theme": self.theme,
                "summary_sujets": self.sujets,
                "summary_siret": self.etablissement.get("siret")
                if self.etablissement
                else None,
                "summary_filieres": self.filieres,
                "summary_date_installation": self.date_installation,
                "summary_commune": self.commune,
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
        context_data.update(
            {
                "etablissement": self.etablissement,
                "categories_juridiques": siret.mapping_categories_juridiques,
                "commune": ZoneGeographique.objects.communes()
                .filter(numero=self.etablissement.get("commune"))
                .first(),
            }
        )
        return context_data


class Step5View(AgriMixin, TemplateView):
    template_name = "agri/step-5.html"
    STEP = 4

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        naf = self.etablissement.get("activite_principale", "")
        if naf[-1].isalpha():
            naf = naf[:-1]
        filiere = Filiere.objects.filter(code_naf=naf).first()
        context_data.update(
            {
                "mapping_naf": siret.mapping_naf_complete_unique,
                "mapping_tranches_effectif": siret.mapping_effectif,
                "tranche_effectif_salarie": siret.mapping_effectif.get(
                    self.etablissement.get("tranche_effectif_salarie", ""), None
                ),
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
                "filieres_helper": "Nous n'avons pas pu déduire la filière de votre exploitation, veuillez en sélectionner au moins une ci-dessus."
                if not filiere
                else "",
            }
        )

        return context_data


class ResultsMixin(AgriMixin):
    def get_results(self):
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


class ResultsView(ResultsMixin, ListView):
    template_name = "agri/results.html"

    def get_queryset(self):
        return self.get_results()

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
                            "extra_classes": "fr-card--horizontal fr-card--horizontal-fifth fr-card--no-icon",
                            "title": aide.nom,
                            "description": aide.promesse,
                            "link": aide.get_absolute_url(),
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
                                "tags": [
                                    {
                                        "label": aide.couverture_geographique,
                                        "extra_classes": "fr-tag--sm",
                                    }
                                ],
                            },
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
    template_name = "agri/_partials/feedback_form.html"

    def form_valid(self, form: FeedbackForm):
        form.instance.sent_from_url = self.request.htmx.current_url
        self.object = form.save()
        return render(self.request, "agri/_partials/feedback_ok.html")
