from grist.loader import GristLoader, register_grist_loader

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
    table = "Ref_Themes"
    required_cols = ("Nom",)
    fields = {
        "Nom": Theme.nom,
    }


@register_grist_loader
class SujetLoader(GristLoader):
    model = Sujet
    table = "Ref_Sujets"
    required_cols = ("Nom",)
    fields = {
        "Nom": Sujet.nom,
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
    table = "Aides"
    required_cols = ("Nom",)
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
