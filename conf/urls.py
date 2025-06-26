"""
URL configuration for conf project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.conf import settings
from django.contrib.sitemaps.views import sitemap
from django.urls import path, include, re_path
from two_factor.urls import urlpatterns as two_factors_urls

from agri.sitemap import AgriSitemap
from aides.sitemap import AidesSitemap

sitemaps = {"aides": AidesSitemap, "agri": AgriSitemap}

urlpatterns = [
    path("admin/", admin.site.urls),
    path("sitemap.xml", sitemap, {"sitemaps": sitemaps}, name="django-sitemap"),
    path("", include("agri.urls")),
    path("", include("aides.urls")),
    path("", include("product.urls")),
    path("", include(two_factors_urls)),
    path("ui/", include("ui.urls")),
]

if settings.DEBUG:
    from debug_toolbar.toolbar import debug_toolbar_urls
    from django.contrib.staticfiles import views

    urlpatterns.extend(
        debug_toolbar_urls()
        + [
            path("__reload__/", include("django_browser_reload.urls")),
            re_path(r"^(?P<path>.*)$", views.serve),
        ]
    )
