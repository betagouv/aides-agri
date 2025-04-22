from django.urls import path

from .views import AideDetailView


app_name = "aides"
urlpatterns = [
    path("aide/<str:slug>-<int:pk>", AideDetailView.as_view(), name="aide"),
]
