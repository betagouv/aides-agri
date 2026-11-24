import reversion
from admin_extra_buttons.api import ExtraButtonsMixin, button
from reversion.admin import VersionAdmin
from reversion.models import Version
from django.contrib import messages
from django.shortcuts import redirect, render
from django.urls import reverse

from ..models.base import RawAide


class RawAideAdmin(ExtraButtonsMixin, VersionAdmin):
    aide_adapter = None
    exclude = ("integrated_version",)
    fieldsets = [
        ("Métadonnées", {"fields": ["source", "status", "aide"]}),
        ("Données", {"fields": ["__remaining__"]}),
    ]

    class Media:
        css = {"all": ["admin/aides_integration/base.css"]}

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

    @button(
        label="Ajouter à Aides Agri",
        visible=lambda widget: widget.context["original"].is_new,
        html_attrs={"class": "insertlink"},
    )
    def add_to_aides_agri(self, request, object_id):
        raw_aide: RawAide = self.get_object(request, object_id)
        integration_adapter = self.__class__.aide_adapter()
        integration_adapter.create(raw_aide)
        aide = raw_aide.aide
        self.message_user(
            request,
            "L’aide a bien été ajoutée à Aides Agri, voici sa fiche.",
        )
        for error in integration_adapter.errors:
            self.message_user(request, error, messages.WARNING)
        return redirect(
            reverse(
                f"admin:{aide._meta.app_label}_{aide._meta.model_name}_change",
                args=[aide.pk],
            )
        )

    @button(
        label="Non pertinente",
        visible=lambda widget: widget.context["original"].is_new,
        html_attrs={"class": "excludelink"},
    )
    def mark_as_excluded(self, request, object_id):
        raw_aide = RawAide.objects.get(pk=object_id)
        with reversion.create_revision():
            raw_aide.status = RawAide.Status.EXCLUDED
            raw_aide.save(source=request.user)
        self.message_user(
            request,
            "Cette aide a bien été marquée comme non pertinente.",
        )
        return redirect(request.path)

    @button(
        label="Modifier dans Aides Agri",
        visible=lambda widget: widget.context["original"].is_updated,
        html_attrs={"class": "editlink"},
    )
    def see_changes(self, request, object_id):
        context = self.get_common_context(request, pk=object_id)
        integrated_version: Version = self.object.integrated_version
        context.update(
            {
                "title": f"Évolutions de l’aide {self.object} depuis sa dernière intégration à Aides Agri",
                "fields_for_diff": {
                    k: (v, getattr(self.object, k))
                    for k, v in integrated_version.field_dict.items()
                },
            }
        )
        return render(request, "admin/diff.html", context=context)
