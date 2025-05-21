from django.urls import path

from .views import (
    StaticPageView,
    UserNoteView,
    UserFeedbackView,
)

app_name = "product"
urlpatterns = [
    path(
        "pages/declaration-accessibilite",
        StaticPageView.as_view(
            title="Déclaration d’accessibilité",
            content_filename="declaration-accessibilite",
        ),
        name="declaration-accessibilite",
    ),
    path(
        "pages/mentions-legales",
        StaticPageView.as_view(
            title="Mentions légales",
            content_filename="mentions-legales",
        ),
        name="mentions-legales",
    ),
    path(
        "pages/donnees-personnelles",
        StaticPageView.as_view(
            title="Données personnelles",
            content_filename="donnees-personnelles",
        ),
        name="donnees-personnelles",
    ),
    path("donner-mon-avis", UserNoteView.as_view(), name="user-note"),
    path("donner-mon-avis-complet", UserFeedbackView.as_view(), name="user-feedback"),
]
