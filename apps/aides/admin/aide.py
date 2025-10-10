import copy
import csv
import json

from admin_extra_buttons.api import ExtraButtonsMixin, button
from django.contrib import admin
from django.contrib.admin.views.main import ChangeList
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

from ..models import ZoneGeographique, Aide
from ..tasks import (
    enrich_aide,
    admin_notify_assignee,
    admin_notify_cc,
    admin_notify_new_cc,
)
from ._common import ArrayFieldCheckboxSelectMultiple


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

    list_display = (
        "id",
        "nom",
        "organisme",
        "is_published",
        "priority",
        "ancestors",
        "derivatives",
    )
    list_display_links = ("id", "nom")
    list_select_related = ("organisme",)
    ordering = ("-priority", "nom", "id")
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
        ("parent", admin.RelatedOnlyFieldListFilter),
    )
    autocomplete_fields = ("zones_geographiques", "organisme", "organismes_secondaires")
    readonly_fields = [
        "parent",
        "is_derivable",
        "slug",
        "raw_data",
        "date_created",
        "date_modified",
        "last_published_at",
        "priority",
    ]
    search_fields = ("nom", "promesse")
    fieldsets = [
        (
            "Infos de base",
            {
                "fields": ["nom", "organisme", "slug", "is_derivable"],
            },
        ),
        (
            "Cycle de vie",
            {
                "classes": ["collapse"],
                "fields": [
                    ("source", "integration_method"),
                    ("priority", "date_target_publication"),
                    ("date_created", "date_modified", "last_published_at"),
                    ("status", "assigned_to", "cc_to"),
                    "raison_desactivation",
                    "internal_comments",
                ],
            },
        ),
        (
            "Priorisation",
            {
                "classes": ["collapse"],
                "fields": [
                    ("importance", "demande_du_pourvoyeur"),
                    ("urgence", "enveloppe_globale", "taille_cible_potentielle"),
                    "is_meconnue",
                ],
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
    ]
    formfield_overrides = {
        TextField: {"widget": EasyMDEWidget},
    }

    class AideChangeList(ChangeList):
        def get_queryset(self, request, **kwargs):
            qs = super().get_queryset(request, **kwargs)
            if "parent__id__exact" not in request.GET:
                qs = qs.filter(parent_id=None)
            return qs

    def get_changelist(self, request, **kwargs):
        return AideAdmin.AideChangeList

    @admin.display(description="Ancêtres")
    def ancestors(self, obj):
        # TODO remplacer l'ID par le code quand il existera
        if obj.parent:
            grandparent = self.ancestors(obj.parent)
            grandparent = grandparent + " &gt; " if grandparent else ""
            return mark_safe(
                f'{grandparent}<a href="{obj.parent_id}">{obj.parent_id}</a>'
            )
        else:
            return ""

    @admin.display(description="Déclinaisons")
    def derivatives(self, obj):
        variants_count = Aide.objects.filter(parent_id=obj.pk).count()
        if variants_count:
            return mark_safe(
                f'<a href="?parent__id__exact={obj.pk}">Voir les {variants_count}</a>'
            )
        else:
            return ""

    def get_form(self, request, obj=None, change=False, **kwargs):
        form = super().get_form(request, obj=obj, change=change, **kwargs)
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
        if obj:
            if obj.is_derivable:
                statuses_to_remove = (Aide.Status.PUBLISHED, Aide.Status.VALIDATED)
            else:
                statuses_to_remove = (Aide.Status.TO_BE_DERIVED,)
            form.base_fields["status"].choices = [
                c
                for c in form.base_fields["status"].choices
                if c[0] not in statuses_to_remove
            ]
        return form

    def get_fieldsets(self, request, obj=None):
        if obj:
            fieldsets = copy.deepcopy(self.fieldsets)
            if obj.parent:
                fieldsets[0][1]["fields"].insert(0, ("parent",))
            if obj.is_derivable or obj.parent:
                fieldsets[2][1]["fields"].insert(1, ("description_de_base",))
            return fieldsets
        elif "parent" in request.GET:
            return [("Infos de base", {"fields": ["parent", "nom", "is_derivable"]})]
        else:
            return [
                (
                    "Infos de base",
                    {"fields": ["nom", "organisme", "url_descriptif", "is_derivable"]},
                ),
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
                (
                    "Priorisation",
                    {
                        "classes": ["collapse"],
                        "fields": [
                            ("importance", "demande_du_pourvoyeur"),
                            (
                                "urgence",
                                "enveloppe_globale",
                                "taille_cible_potentielle",
                            ),
                            "is_meconnue",
                        ],
                    },
                ),
            ]

    def get_changeform_initial_data(self, request):
        initial = super().get_changeform_initial_data(request)
        if "parent" in request.GET:
            parent = Aide.objects.get(pk=initial["parent"])
            initial["nom"] = parent.nom
        return initial

    def get_readonly_fields(self, request, obj=None):
        readonly_fields = copy.deepcopy(self.readonly_fields)
        if obj:
            if obj.parent:
                readonly_fields.extend(
                    [
                        field
                        for field in self.get_fields(request)
                        if field
                        not in (
                            "is_derivable",
                            "nom",
                            "status",
                            "priority",
                            "couverture_geographique",
                        )
                        and (
                            (
                                not hasattr(getattr(obj.parent, field), "exists")
                                and getattr(obj.parent, field)
                            )
                            or (
                                hasattr(getattr(obj.parent, field), "exists")
                                and getattr(obj.parent, field).exists()
                            )
                        )
                    ]
                )
        else:
            readonly_fields.remove("is_derivable")
            if "parent" in request.GET:
                readonly_fields.remove("parent")
        return readonly_fields

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

    @staticmethod
    def _derive_aide(aide_id: int, nom: str, is_derivable: bool) -> Aide:
        aide = Aide.objects.get(pk=aide_id)
        parent_pk = aide.pk
        sujets = aide.sujets.all()
        organismes_secondaires = aide.organismes_secondaires.all()
        programmes = aide.programmes.all()
        filieres = aide.filieres.all()
        types = aide.types.all()
        zones_geographiques = aide.zones_geographiques.all()
        aide.pk = None
        aide._state.adding = True
        aide.status = Aide.Status.TODO
        aide.parent_id = parent_pk
        aide.nom = nom
        aide.slug = ""
        aide.is_derivable = is_derivable
        aide.save()
        aide.sujets.set(sujets)
        aide.organismes_secondaires.set(organismes_secondaires)
        aide.programmes.set(programmes)
        aide.filieres.set(filieres)
        aide.types.set(types)
        aide.zones_geographiques.set(zones_geographiques)
        return aide

    @button(
        label="Décliner",
        visible=lambda widget: widget.context["original"].is_to_be_derived,
        html_attrs={"class": "addlink"},
    )
    def derive(self, request, object_id):
        return redirect(f"../../add?parent={object_id}")

    @button(
        label="Décliner dans chaque département",
        visible=lambda widget: widget.context["original"].is_departemental
        and not widget.context["original"].zones_geographiques.exists()
        and widget.context["original"].is_to_be_derived,
        html_attrs={"class": "addlink"},
    )
    def derive_for_departements(self, request, object_id):
        aide = Aide.objects.get(pk=object_id)
        context = self.get_common_context(request)
        if request.method == "POST":
            departements = ZoneGeographique.objects.departements()
            for departement in departements:
                self._derive_aide(object_id, f"{aide.nom} ({departement.nom})", False)
            self.message_user(
                request,
                mark_safe(
                    f'L’aide <a href="{aide.pk}">{aide.nom} portée par {aide.organisme.nom}</a> a bien été déclinée pour {departements.count()} départements.'
                ),
            )
            return redirect(
                reverse(
                    admin_urlname(context["opts"], "changelist"),
                    query={"parent__id__exact": object_id},
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
                request, "admin/derive_for_departements.html", context
            )

    @button(label="Vue Kanban")
    def dashboard(self, request):
        context = self.get_common_context(request)
        context.update(
            {
                "title": "Vue des aides en Kanban",
                "aides_by_status": {
                    status.label: Aide.objects.filter(
                        status=status, parent_id=request.GET.get("parent", None)
                    )
                    .select_related("organisme", "assigned_to")
                    .order_by("date_target_publication", "-priority")
                    for status in Aide.Status
                    if status not in (Aide.Status.ARCHIVED,)
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

    def save_form(self, request, form, change):
        if not change and "parent" in form.cleaned_data:
            return self._derive_aide(
                form.cleaned_data["parent"].pk,
                form.cleaned_data["nom"],
                form.cleaned_data["is_derivable"],
            )
        else:
            return super().save_form(request, form, change)

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        base_url = f"{request.scheme}://{request.headers['host']}"
        if obj.assigned_to and (not change or "assigned_to" in form.changed_data):
            admin_notify_assignee.enqueue(obj.pk, base_url)
        if obj.cc_to.exists() and (not change or "status" in form.changed_data):
            admin_notify_cc.enqueue(obj.pk, base_url)

    def save_related(self, request, form, formsets, change):
        if not change:
            return
        obj = form.instance
        old_ccs = set(obj.cc_to.all())
        super().save_related(request, form, formsets, change)
        if obj.cc_to.exists() and (not change or "cc_to" in form.changed_data):
            base_url = f"{request.scheme}://{request.headers['host']}"
            ccs = set(obj.cc_to.all())
            to_notify = ccs.difference(old_ccs)
            if to_notify:
                admin_notify_new_cc.enqueue(
                    obj.pk, base_url, [user.pk for user in to_notify]
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
