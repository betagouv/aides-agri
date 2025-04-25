from django.views.generic import DetailView

from .models import Aide


class AideDetailView(DetailView):
    model = Aide

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        breadcrumb_links = []
        if "HTTP_REFERER" in self.request.META:
            breadcrumb_links.append(
                {
                    "url": self.request.META["HTTP_REFERER"],
                    "title": "Notre recommandation",
                }
            )

        context_data.update(
            {
                "breadcrumb_data": {
                    "links": breadcrumb_links,
                    "current": self.object.nom,
                },
            }
        )
        return context_data
