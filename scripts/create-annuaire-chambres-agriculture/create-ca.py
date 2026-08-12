######################################
# TO BE COPIED/PASTED IN DJANGO SHELL #
#######################################
import csv
import re

import requests

from aides.models import Organisme, ZoneGeographique


with open("scripts/create-annuaire-chambres-agriculture/data/ca.csv") as f:
    reader = csv.DictReader(f)
    parent = Organisme.objects.get(acronyme="CDA France")
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
        if row["image_url"]:
            try:
                r = requests.get(
                    "https://chambres-agriculture.fr" + row["image_url"], timeout=5
                )
                r.raise_for_status()
                o.illustration = r.content
                o.save()
            except requests.RequestException:
                pass
        if zone:
            o.zones_geographiques.add(zone)


print(
    ZoneGeographique.objects.departements().exclude(
        organisme__acronyme__startswith="CA "
    )
)
