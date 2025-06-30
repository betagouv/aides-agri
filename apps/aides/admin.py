import csv

from admin_extra_buttons.api import ExtraButtonsMixin, button
from django.contrib import admin
from django.contrib import messages
from django import forms
from django.contrib.admin.templatetags.admin_urls import admin_urlname
from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import UploadedFile
from django.db.models import QuerySet
from django.shortcuts import redirect
from django.template.response import TemplateResponse
from django.urls import reverse
from django.utils.text import slugify
from django.utils.safestring import mark_safe
from reversion.admin import VersionAdmin

from admin_concurrency.admin import ConcurrentModelAdmin
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
from .tasks import enrich_aide


@admin.register(Theme)
class ThemeAdmin(VersionAdmin):
    list_display = (
        "pk",
        "nom_court",
        "published",
        "urgence",
        "sujets_count",
        "aides_count",
    )
    list_display_links = ("pk", "nom_court")
    list_filter = ("published",)

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
    list_display = (
        "pk",
        "nom",
        "published",
        "aides_count",
    )
    list_display_links = ("pk", "nom")
    list_filter = ("published", "themes")

    def aides_count(self, obj):
        return mark_safe(
            f'<a href="{reverse("admin:aides_aide_changelist")}?sujets__id__exact={obj.pk}">{obj.aides_count}</a>'
        )

    aides_count.short_description = "Nombre d’aides"

    def get_queryset(self, request):
        return super().get_queryset(request).with_aides_count()


@admin.register(Type)
class TypeAdmin(VersionAdmin):
    list_display = ("pk", "nom", "urgence", "aides_count")
    list_display_links = ("pk", "nom")

    def aides_count(self, obj):
        return mark_safe(
            f'<a href="{reverse("admin:aides_aide_changelist")}?types__id__exact={obj.pk}">{obj.aides_count}</a>'
        )

    aides_count.short_description = "Nombre d’aides"

    def get_queryset(self, request):
        return super().get_queryset(request).with_aides_count()


@admin.register(Programme)
class ProgrammeAdmin(VersionAdmin):
    list_display = ("pk", "nom", "aides_count")
    list_display_links = ("pk", "nom")

    def aides_count(self, obj):
        return mark_safe(
            f'<a href="{reverse("admin:aides_aide_changelist")}?programmes__id__exact={obj.pk}">{obj.aides_count}</a>'
        )

    aides_count.short_description = "Nombre d’aides"

    def get_queryset(self, request):
        return super().get_queryset(request).with_aides_count()


class ArrayFieldCheckboxSelectMultiple(forms.SelectMultiple):
    def format_value(self, value):
        """Return selected values as a list."""
        if value is None and self.allow_multiple_selected:
            return []
        elif self.allow_multiple_selected:
            value = [v for v in value.split(",")]

        if not isinstance(value, (tuple, list)):
            value = [value]

        results = [str(v) if v is not None else "" for v in value]
        return results


class OrganismeForm(forms.ModelForm):
    model = Organisme

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["secteurs"].widget = ArrayFieldCheckboxSelectMultiple(
            choices=Organisme.Secteur.choices
        )


@admin.register(Organisme)
class OrganismeAdmin(VersionAdmin):
    list_display = ("pk", "nom", "acronyme", "famille", "secteurs", "aides_count")
    list_display_links = ("pk", "nom")
    list_filter = ("famille",)
    search_fields = ("nom", "acronyme")
    autocomplete_fields = ("zones_geographiques",)
    exclude = ("logo_filename",)

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
    list_display = ("type", "code", "nom")
    list_display_links = ("code", "nom")
    list_filter = ("type",)
    search_fields = ("nom", "code_postal")


@admin.register(GroupementProducteurs)
class GroupementProducteursAdmin(VersionAdmin):
    list_display = ("nom", "libelle")


@admin.register(Filiere)
class FiliereAdmin(VersionAdmin):
    list_display = ("pk", "nom", "published", "position", "aides_count")
    list_display_links = ("pk", "nom")
    list_filter = ("published",)

    def aides_count(self, obj):
        return mark_safe(
            f'<a href="{reverse("admin:aides_aide_changelist")}?filieres__id__exact={obj.pk}">{obj.aides_count}</a>'
        )

    aides_count.short_description = "Nombre d’aides"

    def get_queryset(self, request):
        return super().get_queryset(request).with_aides_count()


@admin.register(SousFiliere)
class SousFiliereAdmin(VersionAdmin):
    list_display = ("nom", "filiere")
    list_display_links = ("nom",)
    list_filter = ("filiere",)
    list_select_related = ("filiere",)


@admin.register(Production)
class ProductionAdmin(VersionAdmin):
    list_display = ("nom", "sous_filiere")
    list_display_links = ("nom",)
    list_filter = ("sous_filiere",)
    list_select_related = ("sous_filiere",)


@admin.register(Aide)
class AideAdmin(ExtraButtonsMixin, ConcurrentModelAdmin, VersionAdmin):
    class Media:
        js = ["admin/aides/aide/trix_form.js"]

    list_display = ("nom", "organisme")
    list_display_links = ("nom",)
    list_filter = (
        "sujets",
        "sujets__themes",
        "types",
        "programmes",
        "organisme",
        "filieres",
    )
    autocomplete_fields = ("zones_geographiques", "organisme", "organismes_secondaires")
    change_form_template = "admin/aides/aide/change_form.html"
    readonly_fields = ("raw_data",)
    fieldsets = [
        (
            "Infos de base",
            {
                "fields": [
                    ("nom", "organisme"),
                ],
            },
        ),
        (
            "Présentation",
            {
                "fields": [
                    "promesse",
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
                    ("beneficiaires", "filieres"),
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
                    ("url_descriptif", "url_demarche"),
                    "contact",
                    ("recurrence_aide", "date_debut", "date_fin"),
                ],
            },
        ),
        (
            "Éligibilité",
            {
                "fields": [
                    ("eligibilite_effectif_min", "eligibilite_effectif_max"),
                    ("eligibilite_etape_avancement_projet", "eligibilite_age"),
                    "conditions",
                    "type_depense",
                ],
            },
        ),
        (
            "Données brutes",
            {"fields": ["raw_data"]},
        ),
        ("Cycle de vie", {"fields": ["status"]}),
    ]

    list_select_related = ("organisme",)

    actions = ["perform_auto_enrich"]

    @button(label="Importer un fichier CSV d'aides", html_attrs={"class": "addlink"})
    def upload(self, request):
        context = self.get_common_context(request)
        if request.method == "POST":
            form = UploadForm(request.POST, request.FILES)
            if form.is_valid():
                csvreader = csv.DictReader(
                    chunk.decode() for chunk in request.FILES["csvfile"]
                )
                to_create = []
                for row in csvreader:
                    to_create.append(
                        Aide(
                            nom=row["nom_aide"],
                            slug=f"999-{slugify(row['nom_aide'])}",
                            raw_data=row,
                        )
                    )
                Aide.objects.bulk_create(to_create)
                return redirect(admin_urlname(context["opts"], "changelist"))
        else:
            form = UploadForm()
        context.update({"form": form, "title": "Importer un fichier CSV d'aides"})
        return TemplateResponse(request, "admin/upload_aides_csv.html", context)

    @admin.action(description="Mapper les champs bruts pour enrichissement automatique")
    def perform_auto_enrich(self, request, queryset: QuerySet):
        if "perform_auto_enrich" in request.POST:
            mapping = {
                key[4:]: value
                for key, value in request.POST.items()
                if key.startswith("map-")
            }
            for aide in queryset:
                enrich_aide.enqueue(aide.pk, mapping)
            self.message_user(
                request,
                "Enrichissement automatique lancé, sera prêt dans quelques secondes",
            )
            return None
        else:
            raw_data_keys = queryset.first().raw_data.keys()
            for obj in queryset:
                if not obj.raw_data or obj.raw_data.keys() != raw_data_keys:
                    self.message_user(
                        request,
                        "Toutes les aides sélectionnées pour le mapping doivent provenir du même import.",
                        messages.ERROR,
                    )
                    return None
            context = self.get_common_context(request)
            context.update(
                {
                    "title": "Sélectionner le champ à enrichir pour chaque champ brut de l'import",
                    "raw_data_keys": raw_data_keys,
                    "aide_fields": (Aide.organisme,),
                    "select_across": request.POST["select_across"],
                    "index": request.POST["index"],
                    "pks": queryset.values_list("pk", flat=True),
                }
            )
            return TemplateResponse(
                request,
                "admin/map_aide_raw_fields.html",
                context,
            )


def validate_content_type_csv(value: UploadedFile):
    if value.content_type != "text/csv":
        raise ValidationError(
            "Merci d'envoyer un fichier CSV valide", params={"value": value}
        )


def validate_first_row_header(value: UploadedFile):
    try:
        csvreader = csv.DictReader(chunk.decode() for chunk in value)
        for row in csvreader:
            if len(row.keys()) == 1:
                raise ValidationError("Le délimiteur CSV doit être la virgule (,).")
            if "nom_aide" not in row.keys():
                raise ValidationError(
                    "La première ligne du fichier doit être un entête avec au moins la colonne 'nom_aide'",
                    params={"value": value},
                )
            return
    except UnicodeDecodeError:
        raise ValidationError(
            "Merci d'envoyer un fichier CSV valide", params={"value": value}
        )


class UploadForm(forms.Form):
    csvfile = forms.FileField(
        label="Choisir un fichier CSV à envoyer",
        help_text="Le délimiteur attendu est la virgule. La première ligne du fichier doit être une ligne d'entête indiquant les noms des colonnes ; l'une de ces colonnes doit être nommée 'nom_aide'",
        validators=[validate_content_type_csv, validate_first_row_header],
    )
