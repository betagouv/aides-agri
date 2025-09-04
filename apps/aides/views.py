from django.views.generic import DetailView

from product.forms import UserNoteForm

from .models import Aide


class AideDetailView(DetailView):
    queryset = Aide.objects.published()

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

        context_data.update(
            {
                "skiplinks": [
                    {
                        "link": "#aide",
                        "label": "Descriptif de l'aide",
                    },
                ],
                "user_note_form": UserNoteForm(),
                "breadcrumb_data": {
                    "links": breadcrumb_links,
                    "current": self.object.nom,
                },
                "badge_data": {
                    "extra_classes": "fr-badge--green-emeraude",
                    "label": "En cours",
                }
                if self.object.is_ongoing
                else {
                    "extra_classes": "fr-badge--pink-tuile",
                    "label": "Clôturé",
                },
            }
        )
        return context_data
