from django.urls import path

from .views import AideDetailView


app_name = "aides"
urlpatterns = [
    path("aide/<str:slug>", AideDetailView.as_view(), name="aide"),
]
