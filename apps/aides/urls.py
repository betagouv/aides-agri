from django.urls import path

from .views import AideDetailView, ParentAideDetailView, AideDetailSeakPeekView


app_name = "aides"
urlpatterns = [
    path("aide/<int:pk>-<str:slug>", AideDetailView.as_view(), name="aide"),
    path(
        "ensemble-d-aides/<int:pk>-<str:slug>",
        ParentAideDetailView.as_view(),
        name="parent-aide",
    ),
    path(
        "aide-pour-validation/<int:pk>-<str:token>",
        AideDetailSeakPeekView.as_view(),
        name="aide-sneak-peek",
    ),
]
