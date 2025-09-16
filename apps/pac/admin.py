from django.contrib import admin

from product.admin import ReadOnlyModelAdmin

from .models import (
    ActeurGeographique,
    IndicateurContexte,
    IndicateurMesure,
    IndicateurRealisation,
    IndicateurResultat,
    Intervention,
    TypeIntervention,
    ObjectifGenerique,
    ObjectifSpecifique,
    Organisme,
    Secteur,
    Besoin,
)


@admin.register(ActeurGeographique)
class ActeurGeographiqueAdmin(ReadOnlyModelAdmin):
    list_display = ("code", "libelle")


@admin.register(IndicateurContexte)
class IndicateurContexteAdmin(ReadOnlyModelAdmin):
    list_display = ("code", "libelle", "secteur")
    list_filter = ("secteur",)


@admin.register(IndicateurMesure)
class IndicateurMesureAdmin(ReadOnlyModelAdmin):
    list_display = ("code", "libelle")


@admin.register(IndicateurRealisation)
class IndicateurRealisationAdmin(ReadOnlyModelAdmin):
    list_display = ("code", "libelle", "type_monitoring")
    list_filter = ("type_monitoring",)


@admin.register(IndicateurResultat)
class IndicateurResultatAdmin(ReadOnlyModelAdmin):
    list_display = (
        "code",
        "libelle",
        "type_monitoring",
        "type",
        "type_calcul",
        "surfacique",
    )
    list_filter = ("type_monitoring", "type", "type_calcul", "surfacique")


@admin.register(TypeIntervention)
class TypeInterventionAdmin(ReadOnlyModelAdmin):
    list_display = ("code_sfc", "code", "libelle", "forme", "fonds")
    list_filter = ("forme", "fonds")


@admin.register(ObjectifGenerique)
class ObjectifGeneriqueAdmin(ReadOnlyModelAdmin):
    list_display = ("code", "libelle")


@admin.register(ObjectifSpecifique)
class ObjectifSpecifiqueAdmin(ReadOnlyModelAdmin):
    list_display = ("code", "libelle")


@admin.register(Organisme)
class OrganismeAdmin(ReadOnlyModelAdmin):
    list_display = (
        "code",
        "code_structure_payeuse",
        "libelle",
        "libelle_structure_payeuse",
    )


@admin.register(Secteur)
class SecteurAdmin(ReadOnlyModelAdmin):
    list_display = ("code", "libelle")


@admin.register(Besoin)
class BesoinAdmin(ReadOnlyModelAdmin):
    list_display = ("code", "libelle", "priorite", "objectif_specifique")
    list_filter = ("priorite", "objectif_specifique")


@admin.register(Intervention)
class InterventionAdmin(ReadOnlyModelAdmin):
    list_display = (
        "code",
        "libelle",
        "structure_payante",
        "operateur",
        "forme",
        "fonds_agricole",
        "type_zone_ichn",
    )
    list_filter = (
        "structure_payante",
        "operateur",
        "forme",
        "fonds_agricole",
        "type_zone_ichn",
    )
