from django.contrib import admin

from grist_loader.admin import AbstractGristModelAdmin

from .models import (
    Theme,
    Sujet,
    Type,
    Organisme,
    ZoneGeographique,
    Aide,
)


@admin.register(Theme)
class ThemeAdmin(AbstractGristModelAdmin):
    list_display = AbstractGristModelAdmin.list_display + (
        "nom",
        "urgence",
        "aides_count",
    )
    list_display_links = AbstractGristModelAdmin.list_display_links + ("nom",)
    fields = ("nom", "nom_court", "description", "urgence")

    def aides_count(self, obj):
        return obj.aides_count

    def get_queryset(self, request):
        return super().get_queryset(request).with_aides_count()


@admin.register(Sujet)
class SujetAdmin(AbstractGristModelAdmin):
    list_display = AbstractGristModelAdmin.list_display + ("nom", "aides_count")
    list_display_links = AbstractGristModelAdmin.list_display_links + ("nom",)
    list_filter = ("themes",)
    fields = ("nom", "nom_court", "themes")

    def aides_count(self, obj):
        return obj.aides_count

    def get_queryset(self, request):
        return super().get_queryset(request).with_aides_count()


@admin.register(Type)
class TypeAdmin(AbstractGristModelAdmin):
    list_display = AbstractGristModelAdmin.list_display + ("nom",)
    list_display_links = AbstractGristModelAdmin.list_display_links + ("nom",)
    fields = ("nom", "description")


@admin.register(Organisme)
class OrganismeAdmin(AbstractGristModelAdmin):
    list_display = AbstractGristModelAdmin.list_display + ("nom",)
    list_display_links = AbstractGristModelAdmin.list_display_links + ("nom",)
    fields = ("nom", "zones_geographiques")


@admin.register(ZoneGeographique)
class ZoneGeographiqueAdmin(AbstractGristModelAdmin):
    list_display = AbstractGristModelAdmin.list_display + (
        "nom",
        "type",
        "parent",
        "epci",
    )
    list_display_links = AbstractGristModelAdmin.list_display_links + ("nom",)
    list_filter = ("type",)
    list_select_related = ("parent", "epci")
    fields = ("parent", "type", "nom", "epci")


@admin.register(Aide)
class AideAdmin(AbstractGristModelAdmin):
    list_display = AbstractGristModelAdmin.list_display + (
        "nom",
        "organisme",
        "date_debut",
        "date_fin",
        "effectif_min",
        "effectif_max",
    )
    list_display_links = AbstractGristModelAdmin.list_display_links + ("nom",)
    list_filter = ("sujets", "types")
    fieldsets = [
        (
            "Infos de base",
            {
                "fields": [
                    "nom",
                    "types",
                    "organisme",
                    "organismes_secondaires",
                ],
            },
        ),
        (
            "Catégorisation",
            {
                "fields": [
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

    list_select_related = ("organisme",)
