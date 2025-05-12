from django.urls import path

from .views import (
    UserNoteView,
    UserFeedbackView,
)


app_name = "product"
urlpatterns = [
    path("donner-mon-avis", UserNoteView.as_view(), name="user-note"),
    path("donner-mon-avis-complet", UserFeedbackView.as_view(), name="user-feedback"),
]
