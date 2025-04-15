from django.views.generic import DetailView

from .models import Aide


class AideDetailView(DetailView):
    model = Aide

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data.update(
            {
                "breadcrumb_data": {
                    "links": [
                        {
                            "url": self.request.META["HTTP_REFERER"],
                            "title": "Notre recommandation",
                        },
                    ],
                    "current": self.object.nom,
                },
            }
        )
        return context_data
