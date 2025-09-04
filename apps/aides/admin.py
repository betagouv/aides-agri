from django.contrib import admin
from django.urls import reverse
from django.utils.safestring import mark_safe

from product.admin import ReadOnlyModelAdmin

from .models import (
    Theme,
    Sujet,
    Type,
    Programme,
    Organisme,
    ZoneGeographique,
    Filiere,
    SousFiliere,
    Production,
    GroupementProducteurs,
    Aide,
)


@admin.register(Theme)
class ThemeAdmin(admin.ModelAdmin):
    list_display = (
        "nom",
        "urgence",
        "sujets_count",
        "aides_count",
    )
    list_display_links = ("nom",)
    fields = ("nom", "nom_court", "description", "urgence")

    def sujets_count(self, obj):
        return mark_safe(
            f'<a href="{reverse("admin:aides_sujet_changelist")}?themes__external_id__exact={obj.pk}">{obj.sujets_count}</a>'
        )

    def aides_count(self, obj):
        return mark_safe(
            f'<a href="{reverse("admin:aides_aide_changelist")}?sujets__themes__external_id__exact={obj.pk}">{obj.aides_count}</a>'
        )

    def get_queryset(self, request):
        return super().get_queryset(request).with_sujets_count().with_aides_count()


@admin.register(Sujet)
class SujetAdmin(admin.ModelAdmin):
    list_display = ("nom", "aides_count")
    list_display_links = ("nom",)
    list_filter = ("themes",)
    fields = ("nom", "nom_court", "themes")

    def aides_count(self, obj):
        return mark_safe(
            f'<a href="{reverse("admin:aides_aide_changelist")}?sujets__external_id__exact={obj.pk}">{obj.aides_count}</a>'
        )

    def get_queryset(self, request):
        return super().get_queryset(request).with_aides_count()


@admin.register(Type)
class TypeAdmin(admin.ModelAdmin):
    list_display = ("nom",)
    list_display_links = ("nom",)
    fields = ("nom", "description")


@admin.register(Programme)
class ProgrammeAdmin(admin.ModelAdmin):
    list_display = ("nom",)
    list_display_links = ("nom",)
    fields = ("nom",)


@admin.register(Organisme)
class OrganismeAdmin(admin.ModelAdmin):
    list_display = ("nom",)
    list_display_links = ("nom",)
    fields = ("nom", "zones_geographiques")
    search_fields = ("nom",)


@admin.register(ZoneGeographique)
class ZoneGeographiqueAdmin(ReadOnlyModelAdmin):
    list_display = (
        "type",
        "code",
        "nom",
    )
    list_display_links = (
        "code",
        "nom",
    )
    list_filter = ("type",)
    fields = ("parent", "type", "code", "nom", "epci", "code_postal")
    search_fields = ("nom", "code_postal")


@admin.register(GroupementProducteurs)
class GroupementProducteursAdmin(admin.ModelAdmin):
    list_display = (
        "nom",
        "libelle",
        "is_real",
    )
    list_display_links = ("nom",)
    fields = ("nom", "libelle")


@admin.register(Filiere)
class FiliereAdmin(admin.ModelAdmin):
    list_display = (
        "nom",
        "position",
    )
    list_display_links = ("nom",)
    fields = ("nom", "position")


@admin.register(SousFiliere)
class SousFiliereAdmin(admin.ModelAdmin):
    list_display = (
        "nom",
        "filiere",
    )
    list_display_links = ("nom",)
    list_filter = ("filiere",)
    list_select_related = ("filiere",)
    fields = ("nom", "filiere")


@admin.register(Production)
class ProductionAdmin(admin.ModelAdmin):
    list_display = (
        "nom",
        "sous_filiere",
    )
    list_display_links = ("nom",)
    list_filter = ("sous_filiere",)
    list_select_related = ("sous_filiere",)
    fields = ("nom", "sous_filiere")


@admin.register(Aide)
class AideAdmin(admin.ModelAdmin):
    list_display = (
        "nom",
        "organisme",
    )
    list_display_links = ("nom",)
    list_filter = ("sujets", "sujets__themes", "types")
    autocomplete_fields = (
        "zones_geographiques",
        "organisme",
        "organismes_secondaires",
    )
    readonly_fields = ("raw_data",)
    fieldsets = [
        (
            "Infos de base",
            {
                "fields": [
                    "slug",
                    "nom",
                    "promesse",
                ],
            },
        ),
        (
            "Présentation",
            {
                "fields": [
                    "description",
                    "duree_accompagnement",
                    "exemple_projet",
                    "etapes",
                ],
            },
        ),
        (
            "Caractéristiques",
            {
                "fields": [
                    "types",
                    "beneficiaires",
                    "organisme",
                    "organismes_secondaires",
                    "programmes",
                    "couverture_geographique",
                    "zones_geographiques",
                ],
            },
        ),
        (
            "Besoins",
            {
                "fields": [
                    "sujets",
                ],
            },
        ),
        (
            "Guichet",
            {
                "fields": [
                    "url_descriptif",
                    "url_demarche",
                    "recurrence_aide",
                    "date_debut",
                    "date_fin",
                    "contact",
                ],
            },
        ),
        (
            "Éligibilité",
            {
                "fields": [
                    "eligibilite_effectif_min",
                    "eligibilite_effectif_max",
                    "eligibilite_etape_avancement_projet",
                    "eligibilite_age",
                    "conditions",
                    "type_depense",
                    "filieres",
                ],
            },
        ),
        (
            "Données brutes",
            {
                "fields": [
                    "raw_data",
                ],
            },
        ),
    ]

    list_select_related = ("organisme",)
