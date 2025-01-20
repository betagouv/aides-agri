from django.urls import path
from apps.catalog import views

urlpatterns = [
    path('index', views.projects, name='projects.index')
]