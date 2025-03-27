from django.urls import path
from django.views.generic import TemplateView

from .views import (
    SelectRichView,
    SelectRichSingleSelectRichSearchOptionsView,
    SelectRichMultiSelectRichSearchOptionsView,
)


app_name = "ui"
urlpatterns = [
    path("", TemplateView.as_view(template_name="ui/base.html"), name="home"),
    path("components", SelectRichView.as_view(), name="components"),
    path(
        "components/search-options/single",
        SelectRichSingleSelectRichSearchOptionsView.as_view(),
        name="components-search-options-single",
    ),
    path(
        "components/search-options/multi",
        SelectRichMultiSelectRichSearchOptionsView.as_view(),
        name="components-search-options-multi",
    ),
]
