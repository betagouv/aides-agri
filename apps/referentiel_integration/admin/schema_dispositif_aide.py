from admin_extra_buttons.api import ExtraButtonsMixin, button
from django_auto_admin_fieldsets.admin import AutoFieldsetsMixin
from django.contrib import admin
from django.contrib import messages
from django.shortcuts import redirect
from django.urls import reverse
from reversion.admin import VersionAdmin


from ..adapters.schema_dispositif_aide import SchemaDispositifAideIntegrationAdapter
from ..models.schema_dispositif_aide import RawDemarcheSchemaDispositifAide


@admin.register(RawDemarcheSchemaDispositifAide)
class RawDemarcheSchemaDispositifAideAdmin(
    AutoFieldsetsMixin, ExtraButtonsMixin, VersionAdmin
):
    list_display = ("__str__", "status")
    list_filter = ("status", "source")

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
        integration_adapter = SchemaDispositifAideIntegrationAdapter()
        demarche = integration_adapter.create_demarche(raw_demarche)
        self.message_user(
            request,
            "La démarche a bien été intégrée dans le référentiel, voici sa fiche.",
        )
        for error in integration_adapter.errors:
            self.message_user(request, error, messages.WARNING)
        return redirect(
            reverse(
                f"admin:{demarche._meta.app_label}_{demarche._meta.model_name}_change",
                args=[demarche.pk],
            )
        )

    @button(
        label="Modifier dans le référentiel",
        visible=lambda widget: widget.context["original"].is_updated,
        html_attrs={"class": "addlink"},
    )
    def edit(self, request, object_id):
        raw_demarche = self.get_object(request, object_id)
        demarche = raw_demarche.demarche
        return redirect(
            reverse(
                f"admin:{demarche._meta.app_label}_{demarche._meta.model_name}_change",
                args=[demarche.pk],
            )
        )
