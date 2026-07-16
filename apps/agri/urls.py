from django.views.generic import TemplateView
from django.urls import path

from .views import HomeView, AboutView, ResultsView, SendResultsByMailView


app_name = "agri"
urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("pages/a-propos", AboutView.as_view(), name="about"),
    path("aides", ResultsView.as_view(), name="results"),
    path(
        "aides-less",
        TemplateView.as_view(template_name="agri/_partials/results_less.html"),
        name="results-less",
    ),
    path(
        "envoyer-les-resultats-par-courriel",
        SendResultsByMailView.as_view(),
        name="send-results-by-mail",
    ),
]
