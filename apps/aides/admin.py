import csv
import json
from copy import copy

from admin_extra_buttons.api import ExtraButtonsMixin, button
from django.contrib import admin
from django.contrib import messages
from django import forms
from django.contrib.admin.templatetags.admin_urls import admin_urlname
from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import UploadedFile
from django.db.models import QuerySet, TextField
from django.http.response import HttpResponseRedirect
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
    list_display = ("pk", "nom_court", "nom", "published", "aides_count")
    list_display_links = ("pk", "nom")
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
    list_display = ("pk", "nom", "urgence", "aides_count")
    list_display_links = ("pk", "nom")
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
    list_display = ("pk", "nom", "aides_count")
    list_display_links = ("pk", "nom")
    ordering = ("nom",)

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
    list_display = ("pk", "nom", "published", "position", "aides_count")
    list_display_links = ("pk", "nom")
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
    list_display = ("nom", "filiere")
    list_display_links = ("nom",)
    list_filter = ("filiere",)
    list_select_related = ("filiere",)
    ordering = ("nom",)


@admin.register(Production)
class ProductionAdmin(VersionAdmin):
    list_display = ("nom", "sous_filiere")
    list_display_links = ("nom",)
    list_filter = ("sous_filiere",)
    list_select_related = ("sous_filiere",)
    ordering = ("nom",)


class EasyMDEWidget(forms.widgets.Textarea):
    def render(self, name, value, attrs=None, renderer=None):
        if "class" not in attrs.keys():
            attrs["class"] = ""

        attrs["class"] += " easymde-box"
        attrs["data-easymde-options"] = json.dumps(
            {
                "inputStyle": "contenteditable",
                "toolbar": [
                    "bold",
                    "italic",
                    "link",
                    "|",
                    "heading-3",
                    "unordered-list",
                    "ordered-list",
                    "|",
                    "table",
                    "|",
                    "undo",
                    "redo",
                    "|",
                    "guide",
                ],
                "spellChecker": False,
                "nativeSpellCheck": True,
                "status": ["lines", "words", "cursor"],
            }
        )

        html = super().render(name, value, attrs, renderer=renderer)

        return mark_safe(html)

    class Media:
        js = ("vendor/easymde.min.js",)
        css = {"all": ("vendor/easymde.min.css",)}


@admin.register(Aide)
class AideAdmin(ExtraButtonsMixin, ConcurrentModelAdmin, VersionAdmin):
    class Media:
        css = {"screen": ["admin/aides/aide/form.css"]}
        js = ["admin/aides/aide/init_easymde.js"]

    list_display = ("pk", "nom", "organisme", "is_published", "priority")
    list_display_links = ("nom",)
    list_select_related = ("organisme",)
    ordering = ("priority", "pk")
    list_filter = (
        "status",
        "sujets",
        "sujets__themes",
        "types",
        ("programmes", admin.RelatedOnlyFieldListFilter),
        ("organisme", admin.RelatedOnlyFieldListFilter),
        ("filieres", admin.RelatedOnlyFieldListFilter),
        ("zones_geographiques", admin.RelatedOnlyFieldListFilter),
        ("assigned_to", admin.RelatedOnlyFieldListFilter),
    )
    autocomplete_fields = ("zones_geographiques", "organisme", "organismes_secondaires")
    readonly_fields = (
        "slug",
        "raw_data",
        "date_created",
        "date_modified",
        "last_published_at",
    )
    search_fields = ("nom", "promesse")
    fieldsets = [
        (
            "Infos de base",
            {
                "fields": ["nom", "organisme", "slug"],
            },
        ),
        (
            "Présentation",
            {
                "classes": ["collapse"],
                "fields": [
                    "promesse",
                    "description",
                    "exemple_projet",
                    "etapes",
                ],
            },
        ),
        (
            "Caractéristiques",
            {
                "classes": ["collapse"],
                "fields": [
                    "types",
                    "organismes_secondaires",
                    "programmes",
                    "aap_ami",
                    ("beneficiaires", "filieres"),
                    ("montant", "participation_agriculteur"),
                    "duree_accompagnement",
                    ("couverture_geographique", "zones_geographiques"),
                ],
            },
        ),
        (
            "Besoins",
            {
                "classes": ["collapse"],
                "fields": ["sujets"],
            },
        ),
        (
            "Guichet",
            {
                "classes": ["collapse"],
                "fields": [
                    "url_descriptif",
                    "url_demarche",
                    "contact",
                    ("recurrence_aide", "date_debut", "date_fin"),
                ],
            },
        ),
        (
            "Éligibilité",
            {
                "classes": ["collapse"],
                "fields": [
                    ("eligibilite_effectif_min", "eligibilite_effectif_max"),
                    "eligibilite_age",
                    "conditions",
                    "type_depense",
                    "eligibilite_cumulable",
                ],
            },
        ),
        (
            "Données brutes",
            {"classes": ["collapse"], "fields": ["raw_data"]},
        ),
        (
            "Cycle de vie",
            {
                "classes": ["collapse"],
                "fields": [
                    ("source", "integration_method"),
                    ("priority", "date_target_publication"),
                    ("date_created", "date_modified", "last_published_at"),
                    ("status", "assigned_to"),
                    "raison_desactivation",
                    "internal_comments",
                ],
            },
        ),
    ]
    formfield_overrides = {
        TextField: {"widget": EasyMDEWidget},
    }

    def get_form(self, *args, **kwargs):
        form = super().get_form(*args, **kwargs)
        if "beneficiaires" in form.base_fields:
            form.base_fields["beneficiaires"].widget = ArrayFieldCheckboxSelectMultiple(
                choices=Aide.Beneficiaire.choices
            )
        if "eligibilite_etape_avancement_projet" in form.base_fields:
            form.base_fields[
                "eligibilite_etape_avancement_projet"
            ].widget = ArrayFieldCheckboxSelectMultiple(
                choices=Aide.EtatAvancementProjet.choices
            )
        return form

    def get_fieldsets(self, request, obj=None):
        if not obj:
            return [
                ("Infos de base", {"fields": ("nom", "organisme", "url_descriptif")}),
                (
                    "Cycle de vie",
                    {
                        "classes": ["collapse"],
                        "fields": [
                            ("source", "integration_method"),
                            ("priority", "date_target_publication"),
                            ("status", "assigned_to"),
                            "internal_comments",
                        ],
                    },
                ),
            ]
        return super().get_fieldsets(request, obj=obj)

    @admin.display(boolean=True, description="Publiée")
    def is_published(self, obj):
        return obj.is_published

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
                objs = Aide.objects.bulk_create(to_create)
                return redirect(
                    reverse(
                        admin_urlname(context["opts"], "changelist"),
                        query={"id__exact": [obj.pk for obj in objs]},
                    )
                )
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

    @button(
        label="Décliner dans chaque département",
        visible=lambda widget: widget.context["original"].couverture_geographique
        == Aide.CouvertureGeographique.DEPARTEMENTAL
        and not widget.context["original"].zones_geographiques.exists(),
    )
    def create_variants_for_departements(self, request, object_id):
        aide = Aide.objects.get(pk=object_id)
        context = self.get_common_context(request)
        if request.method == "POST":
            sujets = aide.sujets.all()
            organismes_secondaires = aide.organismes_secondaires.all()
            programmes = aide.programmes.all()
            filieres = aide.filieres.all()
            types = aide.types.all()
            departements = ZoneGeographique.objects.departements()
            pks = []
            for departement in departements:
                new_aide = copy(aide)
                new_aide.pk = None
                new_aide.slug = f"{aide.slug}-{departement.code}"
                new_aide.save()
                pks.append(new_aide.pk)
                new_aide.zones_geographiques.add(departement)
                new_aide.sujets.set(sujets)
                new_aide.organismes_secondaires.set(organismes_secondaires)
                new_aide.programmes.set(programmes)
                new_aide.filieres.set(filieres)
                new_aide.types.set(types)
            self.message_user(
                request,
                mark_safe(
                    f"L’aide <a href='../{aide.pk}/change'>{aide.nom} portée par {aide.organisme.nom}</a> a bien été déclinée pour {departements.count()} départements."
                ),
            )
            return redirect(
                reverse(
                    admin_urlname(context["opts"], "changelist"),
                    query={"id__exact": pks},
                )
            )
        else:
            context.update(
                {
                    "title": "Décliner une aide pour tous les départements",
                    "original": aide,
                }
            )
            return TemplateResponse(
                request,
                "admin/create_variants_for_departements.html",
                context,
            )

    @button(label="Vue Kanban")
    def dashboard(self, request):
        context = self.get_common_context(request)
        context.update(
            {
                "title": "Vue des aides en Kanban",
                "aides_by_status": {
                    status: Aide.objects.filter(status=status)
                    .select_related("organisme", "assigned_to")
                    .order_by("date_target_publication", "priority")
                    for status in Aide.Status
                    if status not in (Aide.Status.ARCHIVED, Aide.Status.REJECTED)
                },
            }
        )
        if request.GET.get("mine", None):
            for status, qs in context["aides_by_status"].items():
                context["aides_by_status"][status] = qs.filter(assigned_to=request.user)
        return TemplateResponse(request, "admin/dashboard.html", context)

    def response_post_save_change(self, request, obj):
        if "_save_and_back_to_dashboard" in request.POST:
            return HttpResponseRedirect(reverse("admin:aides_aide_dashboard"))
        else:
            return super().response_post_save_change(request, obj)


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
