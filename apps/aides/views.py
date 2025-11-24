from django.http.response import HttpResponsePermanentRedirect
from django.views.generic import DetailView

from aides_feedback.forms import CreateFeedbackOnAidesForm

from .models import Aide


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
        if self.object.url_demarche:
            sidemenu_items.append({"link": "#deposer", "label": "Déposer mon dossier"})
        sidemenu_items.append({"link": "#contact", "label": "Contact"})

        if self.object.exemple_projet:
            sidemenu_items[0].update(
                {
                    "items": [
                        {"link": "#presentation", "label": "Présentation générale"},
                        {"link": "#exemple_projet", "label": "Exemple de projet"},
                    ]
                }
            )

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
