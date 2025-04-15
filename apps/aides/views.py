from django.views.generic import DetailView

from .models import Aide


class AideDetailView(DetailView):
    model = Aide

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data["title"] = self.object.nom
        return context_data
