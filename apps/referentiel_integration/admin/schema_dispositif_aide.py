from admin_extra_buttons.api import ExtraButtonsMixin, button
from django_auto_admin_fieldsets.admin import AutoFieldsetsMixin
from django.contrib import admin
from django.shortcuts import redirect
from django.urls import reverse
from reversion.admin import VersionAdmin

from ..adapters import schema_dispositif_aide
from ..models.schema_dispositif_aide import RawDemarcheSchemaDispositifAide


@admin.register(RawDemarcheSchemaDispositifAide)
class RawDemarcheSchemaDispositifAideAdmin(
    AutoFieldsetsMixin, ExtraButtonsMixin, VersionAdmin
):
    def get_model_perms(self, request):
        return {
            "add": False,
            "change": False,
            "delete": self.has_view_permission(request),
            "view": self.has_view_permission(request),
        }

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser

    fieldsets = [
        ("Métadonnées", {"fields": ["source", "status", "demarche"]}),
        ("Données", {"fields": ["__remaining__"]}),
    ]

    @button(
        label="Intégrer dans le référentiel",
        visible=lambda widget: widget.context["original"].is_new,
        html_attrs={"class": "addlink"},
    )
    def integrate(self, request, object_id):
        raw_demarche = self.get_object(request, object_id)
        demarche = schema_dispositif_aide.create_demarche(raw_demarche)
        return redirect(
            reverse("admin:referentiel_demarcheagricole_change", args=[demarche.pk])
        )

    @button(
        label="Modifier dans le référentiel",
        visible=lambda widget: widget.context["original"].is_updated,
        html_attrs={"class": "addlink"},
    )
    def edit(self, request, object_id):
        return redirect(reverse("admin:referentiel_demarcheagricole_change", object_id))
