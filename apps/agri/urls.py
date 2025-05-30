from django.urls import path

from .views import (
    HomeView,
    Step2View,
    Step3View,
    Step4View,
    Step5View,
    ResultsView,
    SearchEtablissementView,
    SearchCommuneView,
    SendResultsByMailView,
    CreateFeedbackView,
)


app_name = "agri"
urlpatterns = [
    path("", HomeView.as_view(), name="home"),
    path("etape-2", Step2View.as_view(), name="step-2"),
    path("etape-3", Step3View.as_view(), name="step-3"),
    path("etape-4", Step4View.as_view(), name="step-4"),
    path("etape-5", Step5View.as_view(), name="step-5"),
    path("resultats", ResultsView.as_view(), name="results"),
    path(
        "trouver-mon-entreprise",
        SearchEtablissementView.as_view(),
        name="search-etablissement",
    ),
    path(
        "envoyer-les-resultats-par-courriel",
        SendResultsByMailView.as_view(),
        name="send-results-by-mail",
    ),
    path("trouver-ma-commune", SearchCommuneView.as_view(), name="search-commune"),
    path(
        "feedback-themes-sujets",
        CreateFeedbackView.as_view(),
        name="feedback-themes-sujets",
    ),
]
