from django.contrib import admin

from grist_loader.admin import AbstractGristModelAdmin

from .models import (
    Theme,
    Sujet,
    Operateur,
    ZoneGeographique,
    Aide,
)


@admin.register(Theme)
class ThemeAdmin(AbstractGristModelAdmin):
    list_display = AbstractGristModelAdmin.list_display + ("nom",)
    fields = ("nom",)


@admin.register(Sujet)
class SujetAdmin(AbstractGristModelAdmin):
    list_display = AbstractGristModelAdmin.list_display + ("nom",)
    fields = ("nom", "themes")


@admin.register(Operateur)
class OperateurAdmin(AbstractGristModelAdmin):
    list_display = AbstractGristModelAdmin.list_display + ("nom",)
    fields = ("nom", "zones_geographiques")


@admin.register(ZoneGeographique)
class ZoneGeographiqueAdmin(AbstractGristModelAdmin):
    list_display = AbstractGristModelAdmin.list_display + (
        "nom",
        "type",
        "parent",
        "epci",
    )
    fields = ("parent", "type", "nom", "epci")


@admin.register(Aide)
class AideAdmin(AbstractGristModelAdmin):
    list_display = AbstractGristModelAdmin.list_display + (
        "nom",
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
