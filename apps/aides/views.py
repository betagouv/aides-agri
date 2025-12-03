from django.db.models import Q
from django.http.response import HttpResponsePermanentRedirect
from django.views.generic import DetailView

from aides_feedback.forms import CreateFeedbackOnAidesForm

from .models import Aide, ZoneGeographique, Type


class AideDetailView(DetailView):
    def get_queryset(self):
        if self.request.user and self.request.user.has_perm("aides.view_aide"):
            return Aide.objects.all()
        else:
            return Aide.objects.published()

    def get(self, *args, **kwargs):
        self.object = self.get_object()
        if self.object.slug != self.kwargs["slug"]:
            return HttpResponsePermanentRedirect(self.object.get_absolute_url())
        context = self.get_context_data(object=self.object)
        return self.render_to_response(context)

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        breadcrumb_links = []
        if "HTTP_REFERER" in self.request.META:
            breadcrumb_links.append(
                {
                    "url": self.request.META["HTTP_REFERER"],
                    "title": "Sélection personnalisée",
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
        return qs.prefetch_related("sujets", "children")

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)

        filtered_departements = ZoneGeographique.objects.departements().filter(
            code__in=self.request.GET.getlist("filter_departements", [])
        )
        filtered_types = Type.objects.filter(
            pk__in=self.request.GET.getlist("filter_types", [])
        )

        children = self.object.children.published().prefetch_related("sujets")
        q_children = Q()
        if filtered_departements:
            q_children &= Q(zones_geographiques__in=filtered_departements)
        if filtered_types:
            q_children &= Q(types__in=filtered_types)

        context_data.update(
            {
                "create_feedback_on_aides_form": CreateFeedbackOnAidesForm(),
                "filtered_children": children.filter(q_children),
                "other_children": children.exclude(q_children) if q_children else None,
                "filter_departements": [
                    (
                        departement.code,
                        f"{departement.code} {departement.nom}",
                        departement.nom,
                    )
                    for departement in ZoneGeographique.objects.departements()
                    .filter(aides__parent_id=self.object.pk)
                    .distinct()
                ],
                "filter_departements_initials": [
                    dept.code for dept in filtered_departements
                ],
                "filtered_departements": filtered_departements,
                "filter_types": [
                    (
                        type_aides.pk,
                        type_aides.nom,
                        type_aides.nom,
                    )
                    for type_aides in Type.objects.filter(
                        aides__parent_id=self.object.pk
                    ).distinct()
                ],
                "filtered_types": filtered_types,
                "filter_types_initials": [
                    type_aides.pk for type_aides in filtered_types
                ],
            }
        )
        return context_data
