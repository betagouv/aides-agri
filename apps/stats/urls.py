from django.urls import path

from .views import StatsView

app_name = "stats"
urlpatterns = [
    path("toutes", StatsView.as_view(), name="stats"),
]
