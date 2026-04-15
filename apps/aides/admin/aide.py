import copy
import datetime
import uuid

from admin_extra_buttons.api import ExtraButtonsMixin, button
from django.contrib import admin
from django.contrib.admin.utils import flatten_fieldsets
from django.contrib.admin.views.main import ChangeList
from django import forms
from django.contrib.admin.templatetags.admin_urls import admin_urlname
from django.db.models import TextField, Q, Count
from django.db.models import TextField, Count
from django.http.response import HttpResponseRedirect, HttpResponse
from django.shortcuts import redirect
from django.template.response import TemplateResponse
from django.urls import reverse
from django.utils.safestring import mark_safe
from markdown import markdown
from reversion.admin import VersionAdmin

from admin_concurrency.admin import ConcurrentModelAdmin
from ui.admin.widgets import ArrayFieldCheckboxSelectMultiple

from ..models import ZoneGeographique, Aide, Sujet, BaseJuridique
from ..interop import write_aides_as_csv


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


class BaseJuridiqueAdminInline(admin.StackedInline):
    model = BaseJuridique
    extra = 1

    def _are_inheritied_from_parent(self, obj):
        return obj and obj.parent and obj.parent.bases_juridiques.exists()

    def has_add_permission(self, request, obj):
        return super().has_add_permission(
            request, obj
        ) and not self._are_inheritied_from_parent(obj)

    def has_delete_permission(self, request, obj=None):
        return super().has_delete_permission(
            request, obj=obj
        ) and not self._are_inheritied_from_parent(obj)

    def has_change_permission(self, request, obj=None):
        return super().has_change_permission(
            request, obj=obj
        ) and not self._are_inheritied_from_parent(obj)


@admin.register(Aide)
class AideAdmin(ExtraButtonsMixin, ConcurrentModelAdmin, VersionAdmin):
    class Media:
        css = {"screen": ["admin/aides/aide/form.css"]}
        js = ["admin/aides/aide/init_easymde.js"]

    actions = ["make_parent_aide_from_existing_aides"]
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
        "is_published",
        "status",
        "sujets",
        "sujets__themes",
        "types",
        ("programmes", admin.RelatedOnlyFieldListFilter),
        ("organisme", admin.RelatedOnlyFieldListFilter),
        ("filieres", admin.RelatedOnlyFieldListFilter),
        ("eligibilite_beneficiaires", admin.RelatedOnlyFieldListFilter),
        ("zones_geographiques", admin.RelatedOnlyFieldListFilter),
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
        "is_published",
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
                    ("is_published",),
                    (
                        "date_created",
                        "date_modified",
                        "first_published_at",
                        "last_published_at",
                    ),
                    ("status",),
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
            "Pour publication minimale",
            {
                "classes": ["collapse"],
                "fields": [
                    "types",
                    "filieres",
                    ("couverture_geographique", "zones_geographiques"),
                    "sujets",
                    ("eligibilite_effectif_min", "eligibilite_effectif_max"),
                    "recurrence_aide",
                    ("date_debut", "date_fin"),
                    "url_descriptif",
                    "url_demarche",
                    "contact",
                ],
            },
        ),
        (
            "Pour publication éditorialisée",
            {
                "classes": ["collapse"],
                "fields": [
                    "promesse",
                    "description_de_base",
                    "description",
                    "exemple_projet",
                    ("montant", "participation_agriculteur"),
                    "etapes",
                    "eligibilite_beneficiaires",
                    ("conditions", "type_depense"),
                    "eligibilite_cumulable",
                    "base_juridique",
                ],
            },
        ),
        (
            "Autres / Nice-to-have",
            {
                "classes": ["collapse"],
                "fields": [
                    "organismes_secondaires",
                    "programmes",
                ],
            },
        ),
        (
            "Données brutes",
            {"classes": ["collapse"], "fields": ["raw_data"]},
        ),
    ]
    change_form_template = "admin/aides/aide/change_form.html"
    formfield_overrides = {
        TextField: {"widget": EasyMDEWidget},
    }
    inlines = (BaseJuridiqueAdminInline,)

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
            kwargs["queryset"] = (
                Sujet.objects.all().order_by("nom_court").prefetch_related("themes")
            )
        return super().formfield_for_manytomany(db_field, request, **kwargs)

    def get_form(self, request, obj=None, change=False, **kwargs):
        form = super().get_form(request, obj=obj, change=change, **kwargs)
        if "eligibilite_etape_avancement_projet" in form.base_fields:
            form.base_fields[
                "eligibilite_etape_avancement_projet"
            ].widget = ArrayFieldCheckboxSelectMultiple(
                choices=Aide.EtatAvancementProjet.choices
            )
        if obj and "status" in form.base_fields:
            if obj.is_derivable:
                statuses_to_remove = (Aide.Status.VALIDATED,)
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
                fieldsets[0][1]["fields"].insert(0, "parent")
            if not obj.is_derivable and not obj.parent:
                fieldsets[4][1]["fields"].remove("description_de_base")
            elif obj.is_derivable:
                fieldsets[4][1]["fields"].remove("description")
            return fieldsets
        elif "parent" in request.GET:
            return [("Infos de base", {"fields": ["parent", "nom", "is_derivable"]})]
        else:
            return [
                (
                    "Infos de base",
                    {"fields": ["nom", "organisme", "url_descriptif", "is_derivable"]},
                ),
                self.fieldsets[1],
                self.fieldsets[2],
            ]

    def get_inlines(self, request, obj):
        if obj:
            return super().get_inlines(request, obj)
        else:
            return []

    def get_changeform_initial_data(self, request):
        initial = super().get_changeform_initial_data(request)
        if "parent" in request.GET:
            parent = Aide.objects.get(pk=initial["parent"])
            initial["nom"] = parent.nom
        return initial

    def get_readonly_fields(self, request, obj=None):
        readonly_fields = copy.deepcopy(self.readonly_fields)
        if obj:
            if obj.can_be_published():
                readonly_fields.remove("is_published")
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
                            "is_published",
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
        aide.status = Aide.Status.CHOSEN
        aide.parent_id = parent_pk
        aide.nom = nom
        aide.slug = ""
        aide.sneak_peek_token = uuid.uuid4()
        aide.is_derivable = is_derivable
        aide.save()
        aide.sujets.set(sujets)
        aide.organismes_secondaires.set(organismes_secondaires)
        aide.programmes.set(programmes)
        aide.filieres.set(filieres)
        aide.types.set(types)
        aide.zones_geographiques.set(zones_geographiques)
        AideAdmin._create_bases_juridiques_from_aide_id_to_aide(aide_id, aide)
        return aide

    @staticmethod
    def _create_bases_juridiques_from_aide_id_to_aide(aide_id: int, aide: Aide):
        to_create = []
        for base_juridique in BaseJuridique.objects.filter(aide_id=aide_id):
            to_create.append(
                BaseJuridique(
                    aide_id=aide.pk,
                    libelle=base_juridique.libelle,
                    url=base_juridique.url,
                    commentaire=base_juridique.commentaire,
                )
            )
        BaseJuridique.objects.bulk_create(to_create)

    @button(
        label="Décliner",
        visible=lambda widget: widget.context["original"].is_to_be_derived,
        html_attrs={"class": "addlink"},
    )
    def derive(self, request, object_id):
        return redirect(f"../../add?parent={object_id}")

    @button(
        label="Décliner dans chaque département",
        visible=lambda widget: (
            widget.context["original"].is_departemental
            and not widget.context["original"].zones_geographiques.exists()
            and widget.context["original"].is_to_be_derived
        ),
        html_attrs={"class": "addlink"},
    )
    def derive_for_departements(self, request, object_id):
        aide = Aide.objects.get(pk=object_id)
        context = self.get_common_context(request)
        if request.method == "POST":
            departements = ZoneGeographique.objects.departements()
            for departement in departements:
                new_aide = self._derive_aide(
                    object_id, f"{aide.nom} ({departement.nom})", False
                )
                new_aide.zones_geographiques.add(departement)
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
                request, "admin/aides/aide/derive_for_departements.html", context
            )

    @admin.action(description="Créer une fiche mère à partir de ces aides")
    def make_parent_aide_from_existing_aides(self, request, queryset):
        parent = Aide.objects.create(
            nom="Fiche mère (nom temporaire à modifier)",
            status=Aide.Status.CHOSEN,
            is_derivable=True,
        )
        first_aide = queryset.first()
        for fieldname in [
            k
            for k, v in queryset.aggregate(
                **{
                    field.name: Count(field.name, distinct=True)
                    for field in Aide.get_derivable_fields()
                }
            ).items()
            if v == 1
        ]:
            if getattr(Aide, fieldname).field.many_to_many:
                getattr(parent, fieldname).set(getattr(first_aide, fieldname).all())
            else:
                setattr(parent, fieldname, getattr(first_aide, fieldname))
        parent.save()
        queryset.update(parent_id=parent.pk)
        self.message_user(
            request, f"L’aide parent {parent.nom} a bien été créée, la voici."
        )
        return HttpResponseRedirect(
            reverse("admin:aides_aide_changelist", query={"id__iexact": parent.pk})
        )

    @button(label="Dupliquer", html_attrs={"class": "addlink"})
    def duplicate(self, request, object_id):
        aide = Aide.objects.get(pk=object_id)
        context = self.get_common_context(request)
        if request.method == "POST":
            new_aide = Aide()
            new_aide.nom = f"{aide.nom} (copie)"
            new_aide.status = Aide.Status.CHOSEN
            new_aide.save()
            for field in request.POST.getlist("fields"):
                if field == "bases_juridiques":
                    AideAdmin._create_bases_juridiques_from_aide_id_to_aide(
                        object_id, new_aide
                    )
                elif getattr(Aide, field).field.many_to_many:
                    getattr(new_aide, field).set(getattr(aide, field).all())
                else:
                    setattr(new_aide, field, getattr(aide, field))
            new_aide.save()
            return redirect(
                reverse(admin_urlname(context["opts"], "change"), args=[new_aide.pk])
            )
        else:
            context.update(
                {
                    "title": "Dupliquer une aide",
                    "original": aide,
                    "fields": {
                        getattr(Aide, f).field: ", ".join(
                            [str(rel) for rel in getattr(aide, f).all()]
                        )
                        if getattr(Aide, f).field.many_to_many
                        else markdown(getattr(aide, f))
                        if isinstance(getattr(aide, f), str)
                        else getattr(aide, f"get_{f}_display")
                        if getattr(Aide, f).field.choices
                        else getattr(aide, f)
                        for f in self.get_fields(request, aide)
                        if f
                        not in (
                            "nom",
                            "is_published",
                            "status",
                            "internal_comments",
                            "priority",
                            "slug",
                            "raw_data",
                            "date_created",
                            "date_modified",
                            "first_published_at",
                            "last_published_at",
                        )
                        and (
                            getattr(aide, f).exists()
                            if getattr(Aide, f).field.many_to_many
                            else getattr(aide, f)
                        )
                    },
                }
            )
            if aide.bases_juridiques.exists():
                remote_field = BaseJuridique.aide.field.remote_field
                remote_field.verbose_name = "Bases juridiques"
                context["fields"][remote_field] = markdown(
                    "\n".join(
                        [f"[{b.libelle}]({b.url})" for b in aide.bases_juridiques.all()]
                    )
                )
            return TemplateResponse(request, "admin/aides/aide/duplicate.html", context)

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

    def save_model(self, request, obj: Aide, *args) -> None:
        super().save_model(request, obj, *args)
        for child in obj.children.all():
            for field in obj.derivable_fields:
                setattr(child, field.name, getattr(obj, field.name))
            child.save()

    def save_related(
        self, request, form: forms.BaseModelForm, formsets, change
    ) -> None:
        if not change:
            return
        super().save_related(request, form, formsets, change)
        obj: Aide = form.instance
        for child in obj.children.all():
            for field in obj.derivable_m2m_relationships:
                getattr(child, field.name).set(getattr(obj, field.name).all())
            child.save()
