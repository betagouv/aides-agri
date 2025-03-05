import csv
import os

from django.conf import settings

mapping_departements = dict()

_here = os.path.dirname(__file__)

# /!\ this code block is expensive, please make sure it's executed at application startup
with open(
    f"{_here}/{settings.AGRI_PATH_DATA}/mapping_departements.csv"
) as f:
    reader = csv.reader(f)
    for row in reader:
        mapping_departements[row[0]] = row[1]


def departement_from_commune(code_insee_commune: str) -> str:
    departements_outre_mer = ("97", "98")
    if any((code_insee_commune.startswith(outre_mer)) for outre_mer in departements_outre_mer):
        return code_insee_commune[:3]
    else:
        return code_insee_commune[:2]
