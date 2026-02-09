from django.urls import path

from .views import HomeView, ResultsView, SendResultsByMailView


app_name = "agri_v2"
urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("aides", ResultsView.as_view(), name="results"),
    path(
        "envoyer-les-resultats-par-courriel",
        SendResultsByMailView.as_view(),
        name="send-results-by-mail",
    ),
]
