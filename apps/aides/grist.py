import datetime

from django.conf import settings
from pygrister.api import GristApi

from .models import (
    Theme,
    Sujet,
    Operateur,
    Nature,
    ZoneGeographique,
    Aide,
)


grist = GristApi(config=settings.AIDES_PYGRISTER_CONFIG)


def import_all():
    import_themes()
    import_sujets()
    import_natures()
    import_zones_geographiques()
    import_operateurs()
    import_aides()


def import_themes():
    status, rows = grist.list_records("Ref_Themes")
    for row in rows:
        if not row["Nom"]:
            return
        modified = False
        obj, _ = Theme.objects.get_or_create(external_id=row["id"])
        if obj.nom != row["Nom"]:
            obj.nom = row["Nom"]
            modified = True
        if modified:
            obj.save()


def import_sujets():
    status, rows = grist.list_records("Ref_Sujets")
    for row in rows:
        if not row["Nom"]:
            return
        obj, _ = Sujet.objects.get_or_create(external_id=row["id"])
        modified = False
        if obj.nom != row["Nom"]:
            obj.nom = row["Nom"]
            modified = True
        if obj.themes.values_list("external_id", flat=True) != row["Themes"][1:]:
            obj.themes.clear()
            obj.themes.add(*Theme.objects.filter(external_id__in=row["Themes"][1:]))
            modified = True
        if modified:
            obj.save()


def import_operateurs():
    status, rows = grist.list_records("Ref_Operateurs")
    for row in rows:
        if not row["Operateur"]:
            return
        modified = False
        obj, _ = Operateur.objects.get_or_create(external_id=row["id"])
        if obj.nom != row["Operateur"]:
            obj.nom = row["Operateur"]
            modified = True
        if (
            row["Zones_geographiques"]
            and obj.zones_geographiques.values_list("external_id", flat=True)
            != row["Zones_geographiques"][1:]
        ):
            obj.zones_geographiques.clear()
            obj.zones_geographiques.add(
                *ZoneGeographique.objects.filter(
                    external_id__in=row["Zones_geographiques"][1:]
                )
            )
            modified = True
        if modified:
            obj.save()


def import_natures():
    status, rows = grist.list_records("Ref_Natures")
    for row in rows:
        if not row["Nom"]:
            return
        modified = False
        obj, _ = Nature.objects.get_or_create(external_id=row["id"])
        if obj.nom != row["Nom"]:
            obj.nom = row["Nom"]
            modified = True
        if modified:
            obj.save()


def import_zones_geographiques():
    status, rows = grist.list_records("Ref_Zones_geographiques")
    for row in rows:
        if not row["Nom"]:
            return
        obj, _ = ZoneGeographique.objects.get_or_create(external_id=row["id"])
        modified = False
        if obj.nom != row["Nom"]:
            obj.nom = row["Nom"]
            modified = True
        if obj.numero != row["Numero"]:
            obj.numero = row["Numero"]
            modified = True
        if obj.type != row["Type"]:
            obj.type = row["Type"]
            modified = True
        if row["Parent"] and (
            obj.parent is None or obj.parent.external_id != row["Parent"]
        ):
            obj.parent = ZoneGeographique.objects.get(external_id=row["Parent"])
            modified = True
        if row["EPCI"] and (
            obj.epci is None or obj.epci.external_id != row["EPCI"]
        ):
            obj.epci = ZoneGeographique.objects.get(external_id=row["EPCI"])
            modified = True
        if obj.code_postal != row["Code_postal"]:
            obj.code_postal = row["Code_postal"]
            modified = True
        if modified:
            obj.save()


def import_aides():
    couvertures_geographiques = {c["id"]: c["Nom"].strip() for c in grist.list_records("Ref_Couvertures_geographiques")[1]}
    status, rows = grist.list_records("Aides")
    for row in rows:
        if not row["Titre"].strip():
            continue
        obj, _ = Aide.objects.get_or_create(external_id=row["id"])
        modified = False
        if not obj.nom.strip() or obj.nom != row["Titre"]:
            obj.nom = row["Titre"].strip()
            modified = True
        if (
            row["Type_d_aide"]
            and obj.natures.values_list("external_id", flat=True)
            != row["Type_d_aide"][1:]
        ):
            obj.natures.clear()
            obj.natures.add(
                *Nature.objects.filter(
                    external_id__in=row["Type_d_aide"][1:]
                )
            )
            modified = True
        if row["Operateur_principal"] and (
            obj.operateur is None
            or obj.operateur.external_id != row["Operateur_principal"]
        ):
            try:
                obj.operateur = Operateur.objects.get(
                    external_id=row["Operateur_principal"]
                )
                modified = True
            except Operateur.DoesNotExist:
                print(f"Opérateur inconnu : {row['Operateur_principal']}")
            except ValueError:
                print(f"Mauvais format d'opérateur : {row['Operateur_principal']}")
        if (
            row["Operateurs_autres"]
            and obj.operateurs_secondaires.values_list("external_id", flat=True)
            != row["Operateurs_autres"][1:]
        ):
            obj.operateurs_secondaires.clear()
            obj.operateurs_secondaires.add(
                *Operateur.objects.filter(
                    external_id__in=row["Operateurs_autres"][1:]
                )
            )
            modified = True
        if (
            row["Themes"]
            and obj.themes.values_list("external_id", flat=True)
            != row["Themes"][1:]
        ):
            obj.themes.clear()
            obj.themes.add(
                *Theme.objects.filter(
                    external_id__in=row["Themes"][1:]
                )
            )
            modified = True
        if (
            row["Sous_Themes"]
            and obj.sujets.values_list("external_id", flat=True)
            != row["Sous_Themes"][1:]
        ):
            obj.sujets.clear()
            obj.sujets.add(
                *Sujet.objects.filter(
                    external_id__in=row["Sous_Themes"][1:]
                )
            )
            modified = True
        if obj.promesse != row["Promesse"]:
            obj.promesse = row["Promesse"]
            modified = True
        if obj.description_courte != row["Description_Courte"]:
            obj.description_courte = row["Description_Courte"]
            modified = True
        if obj.description_longue != row["Description_longue"]:
            obj.description_longue = row["Description_longue"]
            modified = True
        if obj.effectif_min != row["min_effectif"]:
            obj.effectif_min = row["min_effectif"]
            modified = True
        if obj.effectif_max != row["max_effectif"]:
            obj.effectif_max = row["max_effectif"]
            modified = True
        if obj.lien != row["Lien_vers_le_descriptif_complet"]:
            obj.lien = row["Lien_vers_le_descriptif_complet"]
            modified = True
        if row["Date_d_ouverture"] and obj.date_debut != row["Date_d_ouverture"]:
            try:
                obj.date_debut = datetime.datetime.fromtimestamp(
                    row["Date_d_ouverture"]
                )
                modified = True
            except TypeError:
                print(f"Mauvais format de date d'ouverture : {row['Date_d_ouverture']}")
        if row["Date_de_cloture"] and obj.date_fin != row["Date_de_cloture"]:
            try:
                obj.date_fin = datetime.datetime.fromtimestamp(row["Date_de_cloture"])
                modified = True
            except TypeError:
                print(f"Mauvais format de date de fermeture : {row['Date_de_cloture']}")
        if row["Couverture_Geographique"] and (
            obj.couverture_geographique is None
            or obj.couverture_geographique != couvertures_geographiques[row["Couverture_Geographique"]]
        ):
            try:
                obj.couverture_geographique = couvertures_geographiques[row["Couverture_Geographique"]]
                modified = True
            except ValueError:
                print(
                    f"Mauvais format de couverture géographique : {row['Couverture_Geographique']}"
                )
        if (
            row["Zones_geographiques"]
            and obj.zones_geographiques.values_list("external_id", flat=True)
            != row["Zones_geographiques"][1:]
        ):
            obj.zones_geographiques.clear()
            obj.zones_geographiques.add(
                *ZoneGeographique.objects.filter(
                    external_id__in=row["Zones_geographiques"][1:]
                )
            )
            modified = True
        if modified:
            obj.save()
