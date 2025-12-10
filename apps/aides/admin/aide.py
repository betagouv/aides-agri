import copy
import datetime

from admin_extra_buttons.api import ExtraButtonsMixin, button
from django.contrib import admin
from django.contrib.admin.utils import flatten_fieldsets
from django.contrib.admin.views.main import ChangeList
from django import forms
from django.contrib.admin.templatetags.admin_urls import admin_urlname
from django.db.models import TextField, Q
from django.http.response import HttpResponseRedirect, HttpResponse
from django.shortcuts import redirect
from django.template.response import TemplateResponse
from django.urls import reverse
from django.utils.safestring import mark_safe
from reversion.admin import VersionAdmin

from admin_concurrency.admin import ConcurrentModelAdmin

from ..models import ZoneGeographique, Aide, Sujet
from ..interop import write_aides_as_csv
from ._common import ArrayFieldCheckboxSelectMultiple


class EasyMDEWidget(forms.widgets.Textarea):
    def render(self, name, value, attrs=None, renderer=None):
        if "class" not in attrs.keys():
            attrs["class"] = ""

        attrs["class"] += " easymde-box"

        html = super().render(name, value, attrs, renderer=renderer)

        return mark_safe(html)

    class Media:
        js = ("vendor/easymde.min.js",)
        css = {"all": ("vendor/easymde.min.css",)}


class SujetsMultipleChoiceField(forms.ModelMultipleChoiceField):
    def label_from_instance(self, obj: Sujet):
        return f"{obj.nom_court} ({', '.join([theme.nom_court for theme in obj.themes.all()])})"


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
        "first_published_at",
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
                    (
                        "date_created",
                        "date_modified",
                        "first_published_at",
                        "last_published_at",
                    ),
                    ("status", "assigned_to", "cc_to"),
                    "bureau_valideur",
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
                    (
                        "importance",
                        "demande_du_pourvoyeur",
                        "is_territoire_en_deploiement",
                    ),
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
                    "base_juridique",
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

    def formfield_for_manytomany(self, db_field, request, **kwargs):
        if db_field.name == "sujets":
            kwargs["form_class"] = SujetsMultipleChoiceField
            kwargs["queryset"] = Sujet.objects.all().prefetch_related("themes")
        return super().formfield_for_manytomany(db_field, request, **kwargs)

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
        if obj and "status" in form.base_fields:
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
                fieldsets[3][1]["fields"].insert(1, ("description_de_base",))
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
                            "bureau_valideur",
                        ],
                    },
                ),
                (
                    "Priorisation",
                    {
                        "classes": ["collapse"],
                        "fields": [
                            (
                                "importance",
                                "demande_du_pourvoyeur",
                                "is_territoire_en_deploiement",
                            ),
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
                        for field in flatten_fieldsets(
                            self.get_fieldsets(request, obj=obj)
                        )
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
        q_filter = Q()
        if parent_id := request.GET.get("parent", None):
            q_filter = q_filter & Q(parent_id=parent_id)
        context.update(
            {
                "title": "Vue des aides en Kanban",
                "aides_by_status": {
                    status.label: Aide.objects.filter(status=status)
                    .filter(q_filter)
                    .select_related("organisme", "assigned_to", "parent")
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

    @button(label="Exporter toutes les aides en CSV")
    def export_csv(self, request):
        filename = f"{datetime.date.today().isoformat()}-aides-agri-toutes-les-aides"
        response = HttpResponse(
            content_type="text/csv",
            headers={"Content-Disposition": f'attachment; filename="{filename}.csv"'},
        )

        write_aides_as_csv(response, Aide.objects.values_list("pk", flat=True))
        return response

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

    def save_related(self, request, form, formsets, change):
        if not change:
            return
        super().save_related(request, form, formsets, change)
