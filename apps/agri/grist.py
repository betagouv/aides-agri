from django.conf import settings
from pygrister.api import GristApi, GristApiNotConfigured

from .models import Filiere, SousFiliere, Production, GroupementProducteurs


try:
    gristapi = GristApi(config=settings.AIDES_PYGRISTER_CONFIG)
except GristApiNotConfigured:
    gristapi = GristApi()


def load_all():
    load_groupements_producteurs()
    load_filieres()
    load_sous_filieres()
    load_productions()


def load_groupements_producteurs():
    status, rows = gristapi.list_records("Ref_Groupements_producteurs")
    for row in rows:
        if not row["Nom"].strip():
            continue
        obj, _ = GroupementProducteurs.objects.get_or_create(external_id=row["id"])
        modified = False
        if not obj.nom.strip() or obj.nom != row["Nom"]:
            obj.nom = row["Nom"].strip()
            modified = True
        if not obj.libelle or obj.libelle != row["Mention_longue"]:
            obj.libelle = row["Mention_longue"].strip()
            modified = True
        if modified:
            obj.save()


def load_filieres():
    status, rows = gristapi.list_records("Ref_Filieres")
    for row in rows:
        if not row["Nom"].strip():
            continue
        if not row["A_AFFICHER"]:
            continue
        obj, _ = Filiere.objects.get_or_create(external_id=row["id"])
        modified = False
        if not obj.nom.strip() or obj.nom != row["Nom"]:
            obj.nom = row["Nom"].strip()
            modified = True
        if not obj.position or obj.position != row["Ordre"]:
            obj.position = row["Ordre"]
            modified = True
        if not obj.code_naf or obj.code_naf != row["NAF"]:
            obj.code_naf = row["NAF"].strip()
            modified = True
        if modified:
            obj.save()


def load_sous_filieres():
    status, rows = gristapi.list_records("Ref_Sous_filieres")
    for row in rows:
        if not row["Nom"].strip():
            continue
        obj, _ = SousFiliere.objects.get_or_create(external_id=row["id"])
        modified = False
        if not obj.nom.strip() or obj.nom != row["Nom"]:
            obj.nom = row["Nom"].strip()
            modified = True
        if row["Filiere"] and (
            obj.filiere is None or obj.filiere.external_id != row["Filiere"]
        ):
            try:
                obj.filiere = Filiere.objects.get(external_id=row["Filiere"])
                modified = True
            except Filiere.DoesNotExist:
                pass
        if modified:
            obj.save()


def load_productions():
    status, rows = gristapi.list_records("Ref_Productions")
    for row in rows:
        if not row["Nom"].strip():
            continue
        obj, _ = Production.objects.get_or_create(external_id=row["id"])
        modified = False
        if not obj.nom.strip() or obj.nom != row["Nom"]:
            obj.nom = row["Nom"].strip()
            modified = True
        if row["Sous_filiere"] and (
            obj.sous_filiere is None
            or obj.sous_filiere.external_id != row["Sous_filiere"]
        ):
            try:
                obj.sous_filiere = SousFiliere.objects.get(
                    external_id=row["Sous_filiere"]
                )
                modified = True
            except SousFiliere.DoesNotExist:
                pass
        if modified:
            obj.save()
