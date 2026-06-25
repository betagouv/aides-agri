from django_auto_admin_fieldsets.admin import AutoFieldsetsMixin
from django.contrib import admin
from django.forms import ModelForm

from ..models import Demarche, Porteur, ReferentInterne


class PorteurInlineAdmin(admin.TabularInline):
    model = Porteur
    extra = 0
    autocomplete_fields = ("organisme",)


class ReferentInterneInlineAdmin(admin.TabularInline):
    model = ReferentInterne
    extra = 0


class CreateDemarcheForm(ModelForm):
    class Meta:
        model = Demarche
        fields = ("url_source", "document_source", "titre")


@admin.register(Demarche)
class DemarcheAdmin(AutoFieldsetsMixin, admin.ModelAdmin):
    list_display = ("code", "titre", "status")
    list_filter = ("status", "types_aides", "eligibilite_categorie_taille_entreprise")
    autocomplete_fields = (
        "programmes_parents",
        "eligibilite_geographique",
        "eligibilite_geographique_exclusions",
        "bases_juridiques",
        "demande_de_paiement_de",
    )
    inlines = [PorteurInlineAdmin, ReferentInterneInlineAdmin]
    readonly_fields = ("code", "url_source", "document_source")
    search_fields = ("titre", "promesse")
    fieldsets = [
        (
            "Métadonnées",
            {"fields": ("code", "url_source", "document_source", "status")},
        ),
        (
            "Présentation",
            {
                "fields": (
                    "titre",
                    "promesse",
                    "description",
                    "types_aides",
                    "programmes_parents",
                    "bases_juridiques",
                )
            },
        ),
        ("Dates", {"fields": (("date_ouverture", "date_cloture"),)}),
        (
            "Ciblage",
            {
                "fields": (
                    "cibles",
                    "ciblage_secteur_activite",
                    ("ciblage_naf", "ciblage_naf_exclusions"),
                )
            },
        ),
        (
            "Éligibilité",
            {
                "fields": (
                    "eligibilite",
                    (
                        "eligibilite_geographique",
                        "eligibilite_geographique_exclusions",
                    ),
                    (
                        "eligibilite_forme_juridique",
                        "eligibilite_forme_juridique_exclusions",
                    ),
                    (
                        "eligibilite_effectif_minimal",
                        "eligibilite_effectif_maximal",
                        "eligibilite_categorie_taille_entreprise",
                    ),
                    "eligibilite_annees_existence_minimal",
                )
            },
        ),
        ("Autres", {"fields": ["__remaining__"]}),
    ]

    class Media:
        css = {"screen": ["admin/referentiel/demarche/form.css"]}

    def get_form(self, request, obj=None, **kwargs):
        if obj:
            return super().get_form(request, obj, **kwargs)
        return CreateDemarcheForm

    def get_readonly_fields(self, request, obj=None):
        if obj:
            return super().get_readonly_fields(request, obj)
        return ()

    def get_fieldsets(self, request, obj=None):
        if obj:
            return super().get_fieldsets(request, obj)
        return [(None, {"fields": self.get_fields(request, obj)})]

    def get_inlines(self, request, obj):
        if obj:
            return super().get_inlines(request, obj)
        return []
