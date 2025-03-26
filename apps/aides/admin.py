from django.contrib import admin

from .models import (
    Theme,
    Sujet,
    Operateur,
    ZoneGeographique,
    Aide,
)


class ExternalModelAdmin(admin.ModelAdmin):
    list_display = ("external_id", "nom")
    ordering = ("external_id",)
    list_display_links = ("external_id", "nom")

    def get_readonly_fields(self, request, obj=None):
        if self.fields:
            return self.fields
        else:
            fields = []
            for _, fieldset in self.fieldsets:
                fields.extend(fieldset["fields"])
            return fields


@admin.register(Theme)
class ThemeAdmin(ExternalModelAdmin):
    fields = ("nom",)


@admin.register(Sujet)
class SujetAdmin(ExternalModelAdmin):
    fields = ("nom", "themes")


@admin.register(Operateur)
class OperateurAdmin(ExternalModelAdmin):
    fields = ("nom", "zones_geographiques")


@admin.register(ZoneGeographique)
class ZoneGeographiqueAdmin(ExternalModelAdmin):
    list_display = ExternalModelAdmin.list_display + ("type", "parent", "epci")
    fields = ("parent", "type", "nom", "epci")


@admin.register(Aide)
class AideAdmin(ExternalModelAdmin):
    list_display = ExternalModelAdmin.list_display + (
        "types",
        "operateur",
        "date_debut",
        "date_fin",
        "effectif_min",
        "effectif_max",
    )
    fieldsets = [
        (
            "Infos de base",
            {
                "fields": [
                    "nom",
                    "types",
                    "operateur",
                    "operateurs_secondaires",
                ],
            },
        ),
        (
            "Catégorisation",
            {
                "fields": [
                    "themes",
                    "sujets",
                ],
            },
        ),
        (
            "Conditions",
            {
                "fields": [
                    "date_debut",
                    "date_fin",
                    "effectif_min",
                    "effectif_max",
                    "couverture_geographique",
                    "zones_geographiques",
                ],
            },
        ),
        (
            "Présentation",
            {
                "fields": [
                    "promesse",
                    "description_courte",
                    "description_longue",
                    "montant",
                    "lien",
                ],
            },
        ),
    ]

    list_select_related = ("operateur",)
