from django.contrib import admin
from django import forms
from django.urls import reverse
from django.utils.safestring import mark_safe
from reversion.admin import VersionAdmin

from product.admin import ReadOnlyModelAdmin

from ..models import (
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
)
from ._common import ArrayFieldCheckboxSelectMultiple


@admin.register(Theme)
class ThemeAdmin(VersionAdmin):
    list_display = (
        "id",
        "nom_court",
        "published",
        "urgence",
        "sujets_count",
        "aides_count",
    )
    list_display_links = ("id", "nom_court")
    list_filter = ("published",)
    ordering = ("nom_court",)

    def sujets_count(self, obj):
        return mark_safe(
            f'<a href="{reverse("admin:aides_sujet_changelist")}?themes__id__exact={obj.pk}">{obj.sujets_count}</a>'
        )

    def aides_count(self, obj):
        return mark_safe(
            f'<a href="{reverse("admin:aides_aide_changelist")}?sujets__themes__id__exact={obj.pk}">{obj.aides_count}</a>'
        )

    sujets_count.short_description = "Nombre de sujets"
    aides_count.short_description = "Nombre d’aides"

    def get_queryset(self, request):
        return super().get_queryset(request).with_sujets_count().with_aides_count()


@admin.register(Sujet)
class SujetAdmin(VersionAdmin):
    list_display = ("id", "nom_court", "nom", "published", "aides_count")
    list_display_links = ("id", "nom")
    list_filter = ("published", "themes")
    ordering = ("nom_court",)

    def aides_count(self, obj):
        return mark_safe(
            f'<a href="{reverse("admin:aides_aide_changelist")}?sujets__id__exact={obj.pk}">{obj.aides_count}</a>'
        )

    aides_count.short_description = "Nombre d’aides"

    def get_queryset(self, request):
        return super().get_queryset(request).with_aides_count()


@admin.register(Type)
class TypeAdmin(VersionAdmin):
    list_display = ("id", "nom", "urgence", "aides_count")
    list_display_links = ("id", "nom")
    ordering = ("nom",)

    def aides_count(self, obj):
        return mark_safe(
            f'<a href="{reverse("admin:aides_aide_changelist")}?types__id__exact={obj.pk}">{obj.aides_count}</a>'
        )

    aides_count.short_description = "Nombre d’aides"

    def get_queryset(self, request):
        return super().get_queryset(request).with_aides_count()


@admin.register(Programme)
class ProgrammeAdmin(VersionAdmin):
    list_display = ("id", "nom", "aides_count")
    list_display_links = ("id", "nom")
    ordering = ("nom",)

    def aides_count(self, obj):
        return mark_safe(
            f'<a href="{reverse("admin:aides_aide_changelist")}?programmes__id__exact={obj.pk}">{obj.aides_count}</a>'
        )

    aides_count.short_description = "Nombre d’aides"

    def get_queryset(self, request):
        return super().get_queryset(request).with_aides_count()


class OrganismeForm(forms.ModelForm):
    model = Organisme

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["secteurs"].widget = ArrayFieldCheckboxSelectMultiple(
            choices=Organisme.Secteur.choices
        )


@admin.register(Organisme)
class OrganismeAdmin(VersionAdmin):
    list_display = ("id", "nom", "acronyme", "famille", "secteurs", "aides_count")
    list_display_links = ("id", "nom")
    list_filter = ("famille",)
    search_fields = ("nom", "acronyme")
    autocomplete_fields = ("zones_geographiques",)
    exclude = ("logo_filename",)
    ordering = ("nom",)

    form = OrganismeForm

    def aides_count(self, obj):
        return mark_safe(
            f'<a href="{reverse("admin:aides_aide_changelist")}?organisme__id__exact={obj.pk}">{obj.aides_count}</a>'
        )

    aides_count.short_description = "Nombre d’aides"

    def get_queryset(self, request):
        return super().get_queryset(request).defer("logo").with_aides_count()


@admin.register(ZoneGeographique)
class ZoneGeographiqueAdmin(ReadOnlyModelAdmin):
    list_display = ("type", "code", "nom", "aides_count")
    list_display_links = ("code", "nom")
    list_filter = ("type",)
    search_fields = ("nom", "code_postal")

    def aides_count(self, obj):
        if obj.aides_count == 0:
            return ""
        return mark_safe(
            f'<a href="{reverse("admin:aides_aide_changelist")}?zones_geographiques__id__exact={obj.pk}">{obj.aides_count}</a>'
        )

    aides_count.short_description = "Nombre d’aides"

    def get_queryset(self, request):
        return super().get_queryset(request).with_aides_count()


@admin.register(GroupementProducteurs)
class GroupementProducteursAdmin(VersionAdmin):
    list_display = ("nom", "libelle")
    ordering = ("nom",)


@admin.register(Filiere)
class FiliereAdmin(VersionAdmin):
    list_display = ("id", "nom", "published", "position", "aides_count")
    list_display_links = ("id", "nom")
    list_filter = ("published",)
    ordering = ("nom",)

    def aides_count(self, obj):
        return mark_safe(
            f'<a href="{reverse("admin:aides_aide_changelist")}?filieres__id__exact={obj.pk}">{obj.aides_count}</a>'
        )

    aides_count.short_description = "Nombre d’aides"

    def get_queryset(self, request):
        return super().get_queryset(request).with_aides_count()


@admin.register(SousFiliere)
class SousFiliereAdmin(VersionAdmin):
    list_display = ("id", "nom", "filiere")
    list_display_links = (
        "id",
        "nom",
    )
    list_filter = ("filiere",)
    list_select_related = ("filiere",)
    ordering = ("nom",)


@admin.register(Production)
class ProductionAdmin(VersionAdmin):
    list_display = ("id", "nom", "sous_filiere")
    list_display_links = (
        "id",
        "nom",
    )
    list_filter = ("sous_filiere",)
    list_select_related = ("sous_filiere",)
    ordering = ("nom",)
