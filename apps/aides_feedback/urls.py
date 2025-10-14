from django.urls import path

from .views import (
    CreateFeedbackOnThemesAndSujetsView,
    CreateFeedbackOnAidesView,
    UpdateFeedbackOnAidesView,
)


app_name = "aides_feedback"
urlpatterns = [
    path(
        "creer-feedback-themes-sujets",
        CreateFeedbackOnThemesAndSujetsView.as_view(),
        name="create-feedback-themes-sujets",
    ),
    path(
        "creer-feedback-aides",
        CreateFeedbackOnAidesView.as_view(),
        name="create-feedback-aides",
    ),
    path(
        "completer-feedback-aides/<uuid:pk>",
        UpdateFeedbackOnAidesView.as_view(),
        name="update-feedback-aides",
    ),
]
