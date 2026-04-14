from django_auto_admin_fieldsets.admin import AutoFieldsetsMixin
from django.contrib import admin

from ..models import Demarche, Porteur


class PorteurInlineAdmin(admin.TabularInline):
    model = Porteur
    extra = 0
    autocomplete_fields = ("organisme",)


@admin.register(Demarche)
class DemarcheAdmin(AutoFieldsetsMixin, admin.ModelAdmin):
    autocomplete_fields = (
        "programmes_parents",
        "eligibilite_geographique",
        "eligibilite_geographique_exclusions",
    )
    inlines = [PorteurInlineAdmin]
    readonly_fields = ("code",)
    fieldsets = [
        ("Métadonnées", {"fields": ["code", "status"]}),
        ("Données", {"fields": ["__remaining__"]}),
    ]
