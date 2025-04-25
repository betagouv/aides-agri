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
    path(
        "components",
        TemplateView.as_view(template_name="ui/components.html"),
        name="components",
    ),
    path(
        "components/select-rich", SelectRichView.as_view(), name="component-select-rich"
    ),
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
    path("404", TemplateView.as_view(template_name="404.html")),
    path("500", TemplateView.as_view(template_name="500.html")),
]
