from django.contrib import admin

from .models import (
    Theme,
    Sujet,
    Operateur,
    Nature,
    ZoneGeographique,
    Aide,
)


class RefTableAdmin(admin.ModelAdmin):
    list_display = ("nom",)

    def get_readonly_fields(self, request, obj=None):
        return self.fields


@admin.register(Theme)
class ThemeAdmin(RefTableAdmin):
    fields = ("nom",)


@admin.register(Sujet)
class SujetAdmin(RefTableAdmin):
    fields = ("nom", "themes")


@admin.register(Operateur)
class OperateurAdmin(RefTableAdmin):
    fields = ("nom", "zones_geographiques")


@admin.register(Nature)
class NatureAdmin(RefTableAdmin):
    fields = ("nom",)


@admin.register(ZoneGeographique)
class ZoneGeographiqueAdmin(RefTableAdmin):
    list_display = ("external_id", "type", "nom", "parent", "epci")
    fields = ("type", "nom", "parent")


@admin.register(Aide)
class AideAdmin(RefTableAdmin):
    list_display = ("external_id", "nom", "operateur", "date_debut", "date_fin")
    fields = (
        "nom",
        "natures",
        "operateur",
        "themes",
        "sujets",
        "date_debut",
        "date_fin",
        "couverture_geographique",
        "zones_geographiques",
        "promesse",
    )

    list_select_related = ("operateur",)
