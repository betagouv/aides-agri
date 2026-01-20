from urllib.parse import urlparse

from django.db.models import Q, Count
from django.http.response import HttpResponsePermanentRedirect
from django.urls import resolve
from django.views.generic import DetailView

from aides_feedback.forms import CreateFeedbackOnAidesForm

from .models import Aide, ZoneGeographique, Type, Filiere, Beneficiaires, Sujet


class AideDetailView(DetailView):
    def get_queryset(self):
        if self.request.user and self.request.user.has_perm("aides.view_aide"):
            return Aide.objects.all()
        else:
            return Aide.objects.published_validated()

    def get(self, *args, **kwargs):
        self.object = self.get_object()
        if self.object.slug != self.kwargs["slug"]:
            return HttpResponsePermanentRedirect(self.object.get_absolute_url())
        context = self.get_context_data(object=self.object)
        return self.render_to_response(context)

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)

        breadcrumb_links = []
        if "breadcrumb_entry_point_url" in self.request.GET:
            breadcrumb_links.append(
                {
                    "url": self.request.GET["breadcrumb_entry_point_url"],
                    "title": self.request.GET["breadcrumb_entry_point_title"],
                }
            )

        if "breadcrumb_first_aide_url" in self.request.GET:
            breadcrumb_links.append(
                {
                    "url": self.request.GET["breadcrumb_first_aide_url"],
                    "title": self.request.GET["breadcrumb_first_aide_title"],
                }
            )

        if "HTTP_REFERER" in self.request.META:
            referrer = urlparse(self.request.META["HTTP_REFERER"])
            if match := resolve(referrer.path):
                if match.view_name == "aides:parent-aide":
                    referring_aide = Aide.objects.get(pk=match.kwargs.get("pk"))
                    breadcrumb_links.append(
                        {
                            "title": referring_aide.nom,
                            "url": f"{referrer.path}?{self.request.GET.urlencode()}",
                        }
                    )

        sections = {"presentation": "Présentation du dispositif"}

        if self.object.montant:
            sections["montant"] = "Montant ou taux de l’aide"
        if self.object.participation_agriculteur:
            sections["participation"] = "Participation ou coût pour les bénéficiaires"
        if self.object.etapes:
            sections["etapes"] = "Étapes du projet"
        sections["eligibilite"] = "Critères d’éligibilité"

        sidemenu_items = [
            {"link": f"#{anchor}", "label": label} for anchor, label in sections.items()
        ]

        if self.object.exemple_projet:
            subitems_presentation = {
                "presentation": "Présentation générale",
                "exemple_projet": "Exemple de projet",
            }
            sidemenu_items[0]["items"] = [
                {"link": f"#{anchor}", "label": label}
                for anchor, label in subitems_presentation.items()
            ]
        subitems_eligibilite = {}
        if self.object.type_depense:
            subitems_eligibilite["type_depense"] = "Dépenses éligibles"
        if subitems_eligibilite:
            sidemenu_items[-1]["items"] = [
                {"link": f"#{anchor}", "label": label}
                for anchor, label in subitems_eligibilite.items()
            ]

        if self.object.url_demarche:
            sidemenu_items.append({"link": "#deposer", "label": "Déposer mon dossier"})
        sidemenu_items.append({"link": "#contact", "label": "Contact"})

        context_data.update(
            {
                "skiplinks": [
                    {
                        "link": "#content",
                        "label": "Fiche du dispositif",
                    },
                ],
                "create_feedback_on_aides_form": CreateFeedbackOnAidesForm(),
                "breadcrumb_data": {
                    "links": breadcrumb_links,
                    "current": self.object.nom,
                },
                "sections": sections,
                "sidemenu_data": {"items": sidemenu_items},
            }
        )

        return context_data


class ParentAideDetailView(DetailView):
    template_name = "aides/parent_aide_detail.html"

    def get_queryset(self):
        if self.request.user and self.request.user.has_perm("aides.view_aide"):
            qs = Aide.objects.having_children()
        else:
            qs = Aide.objects.having_published_children()
        return qs.prefetch_related(
            "sujets", "children", "types", "eligibilite_beneficiaires"
        )

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)

        breadcrumb_links = []
        if (
            "breadcrumb_entry_point_url" in self.request.GET
            and "breadcrumb_entry_point_title" in self.request.GET
        ):
            breadcrumb_links.append(
                {
                    "url": self.request.GET["breadcrumb_entry_point_url"],
                    "title": self.request.GET["breadcrumb_entry_point_title"],
                }
            )

        links_querydict = self.request.GET.copy()
        if (
            "HTTP_REFERER" in self.request.META
            and "breadcrumb_first_aide_url" not in self.request.GET
        ):
            referrer = urlparse(self.request.META["HTTP_REFERER"])
            if match := resolve(referrer.path):
                if match.view_name == "aides:aide":
                    referring_aide = Aide.objects.get(pk=match.kwargs.get("pk"))
                    links_querydict["breadcrumb_first_aide_title"] = referring_aide.nom
                    links_querydict["breadcrumb_first_aide_url"] = (
                        f"{referrer.path}?{self.request.GET.urlencode()}"
                    )

        if "breadcrumb_first_aide_url" in links_querydict:
            breadcrumb_links.append(
                {
                    "title": links_querydict["breadcrumb_first_aide_title"],
                    "url": links_querydict["breadcrumb_first_aide_url"],
                }
            )

        filtered_departements = ZoneGeographique.objects.departements().filter(
            code__in=self.request.GET.getlist("filter_departements", [])
        )

        if not filtered_departements and "commune" in self.request.GET:
            try:
                filtered_departements = [
                    ZoneGeographique.objects.communes()
                    .get(code=self.request.GET["commune"])
                    .parent
                ]
            except ZoneGeographique.DoesNotExist:
                pass

        filtered_types = Type.objects.filter(
            pk__in=self.request.GET.getlist("filter_types", [])
        )

        filtered_filieres = Filiere.objects.filter(
            pk__in=self.request.GET.getlist("filter_filieres", [])
        )

        filtered_beneficiaires = Beneficiaires.objects.filter(
            pk__in=self.request.GET.getlist("filter_beneficiaires", [])
        )

        filtered_sujets = Sujet.objects.filter(
            pk__in=self.request.GET.getlist("filter_sujets", [])
        )

        children = self.object.children.published().prefetch_related("sujets", "types")
        q_children = Q()
        if filtered_departements:
            q_children &= Q(zones_geographiques__in=filtered_departements)
        if filtered_types:
            q_children &= Q(types__in=filtered_types)
        if filtered_beneficiaires:
            q_children &= Q(eligibilite_beneficiaires__in=filtered_beneficiaires)
        if filtered_sujets:
            q_children &= Q(sujets__in=filtered_sujets)

        context_data.update(
            {
                "breadcrumb_data": {
                    "links": breadcrumb_links,
                    "current": self.object.nom,
                },
                "links_querydict": links_querydict,
                "create_feedback_on_aides_form": CreateFeedbackOnAidesForm(),
                "filtered_children": children.filter(q_children),
                "other_children": children.exclude(q_children) if q_children else None,
            }
        )
        if not self.object.zones_geographiques.exists():
            context_data.update(
                {
                    "filter_departements": [
                        (
                            departement.code,
                            f"{departement.code} {departement.nom} ({departement.aides_count})",
                            departement.nom,
                        )
                        for departement in ZoneGeographique.objects.departements()
                        .filter(aides__parent_id=self.object.pk)
                        .annotate(aides_count=Count("aides"))
                        .distinct()
                    ],
                    "filter_departements_initials": [
                        dept.code for dept in filtered_departements
                    ],
                    "filtered_departements": filtered_departements,
                }
            )
        if not self.object.types.exists():
            context_data.update(
                {
                    "filter_types": [
                        (
                            type_aides.pk,
                            f"{type_aides.nom} ({type_aides.aides_count})",
                            type_aides.nom,
                        )
                        for type_aides in Type.objects.filter(
                            aides__parent_id=self.object.pk
                        )
                        .annotate(aides_count=Count("aides"))
                        .distinct()
                    ],
                    "filtered_types": filtered_types,
                    "filter_types_initials": [
                        type_aides.pk for type_aides in filtered_types
                    ],
                }
            )
        if not self.object.filieres.exists():
            context_data.update(
                {
                    "filter_filieres": [
                        (
                            filiere.pk,
                            f"{filiere.nom} ({filiere.aides_count})",
                            filiere.nom,
                        )
                        for filiere in Filiere.objects.filter(
                            aides__parent_id=self.object.pk
                        )
                        .annotate(aides_count=Count("aides"))
                        .distinct()
                    ],
                    "filtered_filieres": filtered_filieres,
                    "filter_filieres_initials": [
                        filiere.pk for filiere in filtered_filieres
                    ],
                }
            )
        if not self.object.eligibilite_beneficiaires.exists():
            context_data.update(
                {
                    "filter_beneficiaires": [
                        (
                            beneficiaires.pk,
                            f"{beneficiaires.nom} ({beneficiaires.aides_count})",
                            beneficiaires.nom,
                        )
                        for beneficiaires in Beneficiaires.objects.filter(
                            aides__parent_id=self.object.pk
                        )
                        .annotate(aides_count=Count("aides"))
                        .distinct()
                    ],
                    "filtered_beneficiaires": filtered_beneficiaires,
                    "filter_beneficiaires_initials": [
                        beneficiaire.pk for beneficiaire in filtered_beneficiaires
                    ],
                }
            )
        if not self.object.sujets.exists():
            context_data.update(
                {
                    "filter_sujets": [
                        (sujet.pk, f"{sujet.nom} ({sujet.aides_count})", sujet.nom)
                        for sujet in Sujet.objects.filter(
                            aides__parent_id=self.object.pk
                        )
                        .annotate(aides_count=Count("aides"))
                        .distinct()
                    ],
                    "filtered_sujets": filtered_sujets,
                    "filter_sujets_initials": [sujet.pk for sujet in filtered_sujets],
                }
            )
        return context_data
