from django.http.response import HttpResponsePermanentRedirect
from django.views.generic import DetailView

from product.forms import UserNoteForm

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
