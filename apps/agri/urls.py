from django.urls import path

from .views import (
    Step1View,
    Step2View,
    Step3View,
    Step4View,
    Step5View,
    ResultsView,
    SearchCompanyView,
)


app_name = "agri"
urlpatterns = [
    path("", Step1View.as_view(), name="step-1"),
    path("etape-2", Step2View.as_view(), name="step-2"),
    path("etape-3", Step3View.as_view(), name="step-3"),
    path("etape-4", Step4View.as_view(), name="step-4"),
    path("etape-5", Step5View.as_view(), name="step-5"),
    path("resultats", ResultsView.as_view(), name="results"),
    path("trouver-mon-entreprise", SearchCompanyView.as_view(), name="find-company"),
]
