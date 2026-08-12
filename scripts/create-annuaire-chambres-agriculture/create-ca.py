######################################
# TO BE COPIED/PASTED IN DJANGO SHELL #
#######################################
import csv
import re

from aides.models import Organisme, ZoneGeographique

with open("scripts/create-annuaire-chambres-agriculture/data/ca.csv") as f:
    reader = csv.DictReader(f)
    parent = Organisme.objects.get(acronyme="CA")
    for row in reader:
        code_postal = re.findall(r"\d{5}", row["adresse"])[-1]
        if "régionale" in row["nom"]:
            localisation = row["nom"][
                row["nom"].index(f" {re.findall(r'[A-Z]', row['nom'])[1]}") :
            ].strip()
            try:
                zone = ZoneGeographique.objects.regions().get(nom__iexact=localisation)
            except ZoneGeographique.DoesNotExist:
                zone = None
        else:
            localisation = (
                code_postal[:3] if code_postal.startswith("97") else code_postal[:2]
            )
            try:
                zone = ZoneGeographique.objects.departements().get(code=localisation)
            except ZoneGeographique.DoesNotExist:
                zone = None
        o = Organisme.objects.create(
            parent=parent,
            acronyme=f"CA {localisation}",
            nom=row["nom"],
            adresse=row["adresse"],
            courriel=row["mail"],
            telephone=row["telephone"].split("\n")[0],
            url=row["url"],
        )
        if zone:
            o.zones_geographiques.add(zone)


print(
    ZoneGeographique.objects.departements().exclude(
        organisme__acronyme__startswith="CA "
    )
)
