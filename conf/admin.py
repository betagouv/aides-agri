from functools import update_wrapper

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin, User
from django.urls import path, reverse
from dsfr.admin import DsfrConfigAdmin, DsfrConfig

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


class AidesAgriAdminSite(admin.AdminSite):
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
