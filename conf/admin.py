from functools import update_wrapper

from django.conf import settings
from django.contrib import admin
from django.contrib.auth import REDIRECT_FIELD_NAME
from django.contrib.auth.admin import UserAdmin, User
from django.contrib.auth.views import redirect_to_login
from django.http.response import HttpResponseRedirect
from django.shortcuts import resolve_url
from django.urls import path, reverse
from django.utils.http import url_has_allowed_host_and_scheme
from dsfr.admin import DsfrConfigAdmin, DsfrConfig
from two_factor.admin import AdminSiteOTPRequiredMixin

from agri.admin import FeedbackAdmin, Feedback
from aides.admin import (
    ThemeAdmin,
    Theme,
    SujetAdmin,
    Sujet,
    TypeAdmin,
    Type,
    OrganismeAdmin,
    Organisme,
    ProgrammeAdmin,
    Programme,
    FiliereAdmin,
    Filiere,
    SousFiliereAdmin,
    SousFiliere,
    ProductionAdmin,
    Production,
    GroupementProducteursAdmin,
    GroupementProducteurs,
    ZoneGeographiqueAdmin,
    ZoneGeographique,
    AideAdmin,
    Aide,
)
from aides.views import GristAidesBySujetsTypesAndDepartementView
from product.admin import UserNoteAdmin, UserNote, UserFeedbackAdmin, UserFeedback


class AidesAgriAdminSite(AdminSiteOTPRequiredMixin, admin.AdminSite):
    def login(self, request, extra_context=None):
        redirect_to = request.POST.get(
            REDIRECT_FIELD_NAME, request.GET.get(REDIRECT_FIELD_NAME)
        )
        if request.method == "GET" and super(
            AdminSiteOTPRequiredMixin, self
        ).has_permission(request):
            if request.user.is_verified():
                index_path = reverse("admin:index", current_app=self.name)
            else:
                index_path = reverse("two_factor:setup", current_app=self.name)
            return HttpResponseRedirect(index_path)

        if not redirect_to or not url_has_allowed_host_and_scheme(
            url=redirect_to, allowed_hosts=[request.get_host()]
        ):
            redirect_to = resolve_url(settings.LOGIN_REDIRECT_URL)

        return redirect_to_login(redirect_to)

    def get_app_list(self, *args, **kwargs):
        app_list = super().get_app_list(*args, **kwargs)
        for app in app_list:
            if app["app_label"] == "aides":
                app["models"].append(
                    {
                        "name": "Pilotage",
                        "admin_url": reverse("admin:pilotage"),
                    }
                )
        return app_list

    def get_urls(self):
        def wrap(view, cacheable=False):
            def wrapper(*args, **kwargs):
                return self.admin_view(view)(*args, **kwargs)

            wrapper.model_admin = self
            return update_wrapper(wrapper, view)

        urlpatterns = [
            path(
                "pilotage",
                wrap(GristAidesBySujetsTypesAndDepartementView.as_view()),
                name="pilotage",
            )
        ]
        urlpatterns.extend(super().get_urls())
        return urlpatterns


admin_site = AidesAgriAdminSite(name="aides_admin")

admin_site.register(User, UserAdmin, site=admin_site)
admin_site.register(DsfrConfig, DsfrConfigAdmin, site=admin_site)
admin_site.register(Feedback, FeedbackAdmin, site=admin_site)
admin_site.register(Theme, ThemeAdmin, site=admin_site)
admin_site.register(Sujet, SujetAdmin, site=admin_site)
admin_site.register(Type, TypeAdmin, site=admin_site)
admin_site.register(Organisme, OrganismeAdmin, site=admin_site)
admin_site.register(Programme, ProgrammeAdmin, site=admin_site)
admin_site.register(Filiere, FiliereAdmin, site=admin_site)
admin_site.register(SousFiliere, SousFiliereAdmin, site=admin_site)
admin_site.register(Production, ProductionAdmin, site=admin_site)
admin_site.register(GroupementProducteurs, GroupementProducteursAdmin, site=admin_site)
admin_site.register(ZoneGeographique, ZoneGeographiqueAdmin, site=admin_site)
admin_site.register(Aide, AideAdmin, site=admin_site)
admin_site.register(UserFeedback, UserFeedbackAdmin, site=admin_site)
admin_site.register(UserNote, UserNoteAdmin, site=admin_site)
