from django.views.generic import TemplateView
from django.urls import path

from .views import ParcoursView, QuestionView


app_name = "demo"
urlpatterns = [
    path("question/<int:pk>", QuestionView.as_view(), name="question"),
    path("fin", TemplateView.as_view(template_name="demo/fin.html"), name="fin"),
    path("", ParcoursView.as_view(), name="parcours"),
]
