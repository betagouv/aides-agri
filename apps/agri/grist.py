from grist.loader import GristLoader, register_grist_loader

from .models import Filiere, SousFiliere, Production, GroupementProducteurs


@register_grist_loader
class GroupementProducteursLoader(GristLoader):
    model = GroupementProducteurs
    table = "Ref_Groupements_producteurs"
    required_cols = ("Nom",)
    fields = {
        "Nom": GroupementProducteurs.nom,
        "Mention_longue": GroupementProducteurs.libelle,
    }


@register_grist_loader
class FiliereLoader(GristLoader):
    model = Filiere
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
    table = "Ref_Sous_filieres"
    required_cols = ("Nom",)
    fields = {
        "Nom": SousFiliere.nom,
        "Filiere": SousFiliere.filiere,
    }


@register_grist_loader
class ProductionLoader(GristLoader):
    model = Production
    table = "Ref_Productions"
    required_cols = ("Nom",)
    fields = {
        "Nom": Production.nom,
        "Sous_filiere": Production.sous_filiere,
    }
