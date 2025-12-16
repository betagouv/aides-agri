from django.urls import path

from .views import HomeView, SujetsView, ResultsView, SendResultsByMailView


app_name = "agri_v2"
urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("sujets", SujetsView.as_view(), name="sujets"),
    path("aides", ResultsView.as_view(), name="results"),
    path(
        "envoyer-les-resultats-par-courriel",
        SendResultsByMailView.as_view(),
        name="send-results-by-mail",
    ),
]
