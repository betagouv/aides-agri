from grist_loader.loader import GristLoader, register_grist_loader

from .models import (
    Theme,
    Sujet,
    Operateur,
    ZoneGeographique,
    Aide,
)


@register_grist_loader
class ThemeLoader(GristLoader):
    model = Theme
    table = "Themes_v2"
    fields = {
        "Libelle": Theme.nom,
        "Libelle_court": Theme.nom_court,
        "Biscuit2": Theme.description,
    }


@register_grist_loader
class SujetLoader(GristLoader):
    model = Sujet
    table = "Sujets_v2"
    fields = {
        "Libelle": Sujet.nom,
        "Libelle_court": Sujet.nom_court,
        "Themes": Sujet.themes,
    }


@register_grist_loader
class OperateurLoader(GristLoader):
    model = Operateur
    table = "Ref_Operateurs"
    required_cols = ("Nom",)
    fields = {
        "Nom": Operateur.nom,
        "Zones_geographiques": Operateur.zones_geographiques,
    }


@register_grist_loader
class ZoneGeographiqueLoader(GristLoader):
    model = ZoneGeographique
    table = "Ref_Zones_geographiques"
    required_cols = ("Nom",)
    fields = {
        "Nom": ZoneGeographique.nom,
        "Numero": ZoneGeographique.numero,
        "Type": ZoneGeographique.type,
        "Code_postal": ZoneGeographique.code_postal,
        "Parent": ZoneGeographique.parent,
        "EPCI": ZoneGeographique.epci,
    }


@register_grist_loader
class AideLoader(GristLoader):
    model = Aide
    table = "Solutions"
    required_cols = ("Nom",)
    filter = {
        "GO": [True],
    }
    fields = {
        "Nom": Aide.nom,
        "Promesse": Aide.promesse,
        "Description_Courte": Aide.description_courte,
        "Description_longue": Aide.description_longue,
        "min_effectif": Aide.effectif_min,
        "max_effectif": Aide.effectif_max,
        "Lien_vers_le_descriptif_complet": Aide.lien,
        "Types_d_aide": Aide.types,
        "Date_d_ouverture": Aide.date_debut,
        "Date_de_cloture": Aide.date_fin,
        "Couverture_Geographique": Aide.couverture_geographique,
        "Operateur_principal": Aide.operateur,
        "Operateurs_autres": Aide.operateurs_secondaires,
        "Themes": Aide.themes,
        "Sujets": Aide.sujets,
        "Zones_geographiques": Aide.zones_geographiques,
    }
