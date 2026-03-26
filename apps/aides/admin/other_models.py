import csv
import datetime

from admin_extra_buttons.decorators import button
from admin_extra_buttons.mixins import ExtraButtonsMixin
from django.contrib import admin
from django.db import models
from django import forms
from django.http import HttpResponse
from django.urls import reverse
from django.utils.safestring import mark_safe
from reversion.admin import VersionAdmin

from ui.admin.widgets import ArrayFieldCheckboxSelectMultiple

from ..models import (
    Theme,
    Sujet,
    Type,
    Programme,
    Organisme,
    ZoneGeographique,
    Filiere,
    Beneficiaires,
)


class CsvExportMixin(ExtraButtonsMixin):
    @staticmethod
    def _bool_to_csv_str(value: bool):
        return "OUI" if value else "NON"

    def _get_csv_fields(self) -> list[models.Field]:
        raise NotImplementedError(
            "_get_csv_header() has to be implemented by WithCsvExportMixin subclasses"
        )

    def _get_csv_content(self) -> list:
        raise NotImplementedError(
            "_get_csv_content() has to be implemented by WithCsvExportMixin subclasses"
        )

    @button(label="Exporter tout en CSV")
    def export_to_csv(self, request):
        filename = f"{datetime.date.today().isoformat()}-aides-agri-{self.model._meta.model_name}"
        response = HttpResponse(
            content_type="text/csv",
            headers={"Content-Disposition": f'attachment; filename="{filename}.csv"'},
        )

        writer = csv.writer(response)
        writer.writerow([field.field.verbose_name for field in self._get_csv_fields()])
        for row in self._get_csv_content():
            writer.writerow(row)

        return response


@admin.register(Theme)
class ThemeAdmin(CsvExportMixin, VersionAdmin):
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

    def _get_csv_fields(self) -> list[str]:
        return [
            Theme.nom_court,
            Theme.nom,
            Theme.description,
            Theme.urgence,
            Theme.is_prioritaire,
            Theme.published,
        ]

    def _get_csv_content(self) -> list:
        content = []
        for obj in Theme.objects.all():
            content.append(
                [
                    obj.nom_court,
                    obj.nom,
                    obj.description,
                    self._bool_to_csv_str(obj.urgence),
                    self._bool_to_csv_str(obj.is_prioritaire),
                    self._bool_to_csv_str(obj.published),
                ]
            )
        return content

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
class SujetAdmin(CsvExportMixin, VersionAdmin):
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

    def _get_csv_fields(self) -> list[str]:
        return [
            Sujet.nom_court,
            Sujet.nom,
            Sujet.themes,
            Sujet.published,
        ]

    def _get_csv_content(self) -> list:
        content = []
        for obj in Sujet.objects.all().prefetch_related("themes"):
            content.append(
                [
                    obj.nom_court,
                    obj.nom,
                    ", ".join([theme.nom_court for theme in obj.themes.all()]),
                    self._bool_to_csv_str(obj.published),
                ]
            )
        return content


@admin.register(Type)
class TypeAdmin(CsvExportMixin, VersionAdmin):
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

    def _get_csv_fields(self) -> list[str]:
        return [
            Type.nom,
            Type.description,
            Type.urgence,
            Type.score_priorite_aides,
        ]

    def _get_csv_content(self) -> list:
        content = []
        for obj in Type.objects.all():
            content.append(
                [
                    obj.nom,
                    obj.description,
                    self._bool_to_csv_str(obj.urgence),
                    obj.score_priorite_aides,
                ]
            )
        return content


@admin.register(Programme)
class ProgrammeAdmin(CsvExportMixin, VersionAdmin):
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

    def _get_csv_fields(self) -> list[str]:
        return [Programme.nom]

    def _get_csv_content(self) -> list:
        content = []
        for obj in Type.objects.all():
            content.append([obj.nom])
        return content


class OrganismeForm(forms.ModelForm):
    model = Organisme

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["secteurs"].widget = ArrayFieldCheckboxSelectMultiple(
            choices=Organisme.Secteur.choices
        )


@admin.register(Organisme)
class OrganismeAdmin(CsvExportMixin, VersionAdmin):
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

    def _get_csv_fields(self) -> list[str]:
        return [
            Organisme.nom,
            Organisme.acronyme,
            Organisme.famille,
            Organisme.secteurs,
            Organisme.url,
            Organisme.courriel,
            Organisme.is_masa,
        ]

    def _get_csv_content(self) -> list:
        content = []
        for obj in Organisme.objects.all():
            content.append(
                [
                    obj.nom,
                    obj.acronyme,
                    obj.famille,
                    ", ".join(obj.secteurs),
                    obj.url,
                    obj.courriel,
                    self._bool_to_csv_str(obj.is_masa),
                ]
            )
        return content


@admin.register(ZoneGeographique)
class ZoneGeographiqueAdmin(admin.ModelAdmin):
    list_display = ("type", "code", "nom", "aides_count")
    list_display_links = ("code", "nom")
    list_filter = ("type",)
    search_fields = ("nom", "code_postal")

    def has_add_permission(self, *args):
        return False

    def has_change_permission(self, *args):
        return False

    def has_delete_permission(self, *args):
        return False

    def aides_count(self, obj):
        if obj.aides_count == 0:
            return ""
        return mark_safe(
            f'<a href="{reverse("admin:aides_aide_changelist")}?zones_geographiques__id__exact={obj.pk}">{obj.aides_count}</a>'
        )

    aides_count.short_description = "Nombre d’aides"

    def get_queryset(self, request):
        return super().get_queryset(request).with_aides_count()


@admin.register(Beneficiaires)
class BeneficiairesAdmin(CsvExportMixin, VersionAdmin):
    list_display = ("nom", "libelle", "is_groupement")
    ordering = ("nom",)

    def _get_csv_fields(self) -> list[str]:
        return [Beneficiaires.nom, Beneficiaires.libelle, Beneficiaires.is_groupement]

    def _get_csv_content(self) -> list:
        content = []
        for obj in Beneficiaires.objects.all():
            content.append(
                [obj.nom, obj.libelle, self._bool_to_csv_str(obj.is_groupement)]
            )
        return content


@admin.register(Filiere)
class FiliereAdmin(CsvExportMixin, VersionAdmin):
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

    def _get_csv_fields(self) -> list[str]:
        return [Filiere.nom, Filiere.codes_naf, Filiere.published, Filiere.position]

    def _get_csv_content(self) -> list:
        content = []
        for obj in Filiere.objects.all():
            content.append(
                [
                    obj.nom,
                    obj.codes_naf,
                    self._bool_to_csv_str(obj.published),
                    obj.position,
                ]
            )
        return content
