from django.contrib import admin

from .models import (
    Theme,
    Sujet,
    Operateur,
    Nature,
    CouvertureGeographique,
    ZoneGeographique,
    Aide,
)


class RefTableAdmin(admin.ModelAdmin):
    list_display = ("nom",)


@admin.register(Theme)
class ThemeAdmin(RefTableAdmin):
    fields = ("nom",)


@admin.register(Sujet)
class SujetAdmin(RefTableAdmin):
    fields = ("nom", "themes")


@admin.register(Operateur)
class OperateurAdmin(RefTableAdmin):
    fields = ("nom",)


@admin.register(Nature)
class NatureAdmin(RefTableAdmin):
    fields = ("nom",)


@admin.register(CouvertureGeographique)
class CouvertureGeographiqueAdmin(RefTableAdmin):
    fields = ("nom",)


@admin.register(ZoneGeographique)
class ZoneGeographiqueAdmin(RefTableAdmin):
    list_display = ("external_id", "type", "nom", "parent")
    fields = ("type", "nom", "parent")


@admin.register(Aide)
class AideAdmin(RefTableAdmin):
    list_display = ("nom", "nature", "operateur", "date_debut", "date_fin")
    list_filter = ("zones_geographiques",)
    fields = (
        "nom",
        "nature",
        "operateur",
        "date_debut",
        "date_fin",
        "zones_geographiques",
    )
