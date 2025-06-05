from django.conf import settings
from grist_loader.loader import GristLoader, register_grist_loader

from .models import (
    Theme,
    Sujet,
    Type,
    Organisme,
    Programme,
    ZoneGeographique,
    Filiere,
    SousFiliere,
    Production,
    GroupementProducteurs,
    Aide,
)


__all__ = [
    "TypeLoader",
    "SujetLoader",
    "TypeLoader",
    "OrganismeLoader",
    "ProgrammeLoader",
    "ZoneGeographiqueLoader",
    "GroupementProducteursLoader",
    "FiliereLoader",
    "SousFiliereLoader",
    "ProductionLoader",
    "AideLoader",
]


@register_grist_loader
class ThemeLoader(GristLoader):
    model = Theme
    pygrister_config = settings.AIDES_GRIST_LOADER_PYGRISTER_CONFIG
    table = "Themes_v2"
    fields = {
        "Libelle": Theme.nom,
        "Libelle_court": Theme.nom_court,
        "Biscuit2": Theme.description,
        "Urgence": Theme.urgence,
        "A_publier": Theme.published,
    }


@register_grist_loader
class SujetLoader(GristLoader):
    model = Sujet
    pygrister_config = settings.AIDES_GRIST_LOADER_PYGRISTER_CONFIG
    table = "Sujets_v2"
    fields = {
        "Libelle": Sujet.nom,
        "Libelle_court": Sujet.nom_court,
        "Themes": Sujet.themes,
        "A_publier": Sujet.published,
    }


@register_grist_loader
class TypeLoader(GristLoader):
    model = Type
    pygrister_config = settings.AIDES_GRIST_LOADER_PYGRISTER_CONFIG
    table = "Ref_Types"
    fields = {
        "Type_aide": Type.nom,
        "Description": Type.description,
    }


@register_grist_loader
class OrganismeLoader(GristLoader):
    model = Organisme
    pygrister_config = settings.AIDES_GRIST_LOADER_PYGRISTER_CONFIG
    table = "Ref_Organisme"
    required_cols = ("Nom",)
    fields = {
        "Nom": Organisme.nom,
        "Zones_geographiques": Organisme.zones_geographiques,
        "Logo": Organisme.logo_filename,
    }

    def load(self):
        logos_filenames = {
            attachment["id"]: attachment["fields"]["fileName"]
            for attachment in self.gristapi.list_attachments()[1]
        }
        super().load()
        for organisme in Organisme.objects.with_logo():
            logo_id = int(
                "".join([c for c in organisme.logo_filename if c.isnumeric()])
            )
            logo_filename = f"{logo_id}-{logos_filenames[logo_id]}"
            self.gristapi.download_attachment(f"/tmp/{logo_filename}", logo_id)
            organisme.logo_filename = logo_filename
            with open(f"/tmp/{logo_filename}", "rb") as f:
                organisme.logo = f.read()
            organisme.save()


@register_grist_loader
class ProgrammeLoader(GristLoader):
    model = Programme
    pygrister_config = settings.AIDES_GRIST_LOADER_PYGRISTER_CONFIG
    table = "Ref_Programmes"
    required_cols = ("Nom",)
    fields = {
        "Nom": Programme.nom,
    }


@register_grist_loader
class ZoneGeographiqueLoader(GristLoader):
    model = ZoneGeographique
    pygrister_config = settings.AIDES_GRIST_LOADER_PYGRISTER_CONFIG
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
class GroupementProducteursLoader(GristLoader):
    model = GroupementProducteurs
    pygrister_config = settings.AIDES_GRIST_LOADER_PYGRISTER_CONFIG
    table = "Ref_Groupements_producteurs"
    required_cols = ("Nom",)
    fields = {
        "Nom": GroupementProducteurs.nom,
        "Mention_longue": GroupementProducteurs.libelle,
    }


@register_grist_loader
class FiliereLoader(GristLoader):
    model = Filiere
    pygrister_config = settings.AIDES_GRIST_LOADER_PYGRISTER_CONFIG
    table = "Ref_Filieres"
    required_cols = ("Nom", "A_AFFICHER")
    fields = {
        "Nom": Filiere.nom,
        "Ordre": Filiere.position,
        "NAF": Filiere.code_naf,
    }


@register_grist_loader
class SousFiliereLoader(GristLoader):
    model = SousFiliere
    pygrister_config = settings.AIDES_GRIST_LOADER_PYGRISTER_CONFIG
    table = "Ref_Sous_filieres"
    required_cols = ("Nom",)
    fields = {
        "Nom": SousFiliere.nom,
        "Filiere": SousFiliere.filiere,
    }


@register_grist_loader
class ProductionLoader(GristLoader):
    model = Production
    pygrister_config = settings.AIDES_GRIST_LOADER_PYGRISTER_CONFIG
    table = "Ref_Productions"
    required_cols = ("Nom",)
    fields = {
        "Nom": Production.nom,
        "Sous_filiere": Production.sous_filiere,
    }


@register_grist_loader
class AideLoader(GristLoader):
    model = Aide
    pygrister_config = settings.AIDES_GRIST_LOADER_PYGRISTER_CONFIG
    table = "Solutions"
    required_cols = ("nom_aide",)
    filter = {
        "GO": [True],
    }
    fields = {
        "id_aide": Aide.slug,
        "nom_aide": Aide.nom,
        "promesse": Aide.promesse,
        "description": Aide.description,
        "taux_subvention_commentaire": Aide.montant,
        "condition_eligibilite": Aide.conditions,
        "Eligibilite_effectif_minimum": Aide.eligibilite_effectif_min,
        "Eligibilite_effectif_maximum": Aide.eligibilite_effectif_max,
        "Eligibilite_etat_avancement_projet": Aide.eligibilite_etape_avancement_projet,
        "Eligibilite_age": Aide.eligibilite_age,
        "aap_ami": Aide.aap_ami,
        "type_depense": Aide.type_depense,
        "url_descriptif": Aide.url_descriptif,
        "url_demarche": Aide.url_demarche,
        "contact": Aide.contact,
        "types_aide": Aide.types,
        "date_ouverture": Aide.date_debut,
        "date_cloture": Aide.date_fin,
        "porteur_aide": Aide.organisme,
        "porteurs_autres": Aide.organismes_secondaires,
        "programme_aides": Aide.programmes,
        "thematique_aide": Aide.sujets,
        "Couverture_Geographique": Aide.couverture_geographique,
        "zone_geographique": Aide.zones_geographiques,
        "Etapes": Aide.etapes,
        "beneficiaires_aide": Aide.beneficiaires,
        "Eligibilite_activites": Aide.filieres,
        "recurrence_aide": Aide.recurrence_aide,
        "exemple_projet": Aide.exemple_projet,
    }
