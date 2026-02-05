import csv
import os

from django.conf import settings


mapping_naf_short = dict()
mapping_naf_complete = dict()
mapping_effectif = dict()
mapping_effectif_complete = dict()
mapping_effectif_by_insee_codes = dict()

_here = os.path.dirname(__file__)

# /!\ this code block is expensive, please make sure it's executed at application startup
with open(f"{_here}/{settings.AGRI_PATH_DATA}/mapping_codes_naf.csv") as f:
    reader = csv.reader(f)
    for row in reader:
        mapping_naf_short[row[0]] = row[3]
        mapping_naf_complete[row[0]] = {"long": row[1], "short": row[3]}
mapping_naf_short_unique = {
    v: k for k, v in {v: k for k, v in mapping_naf_short.items()}.items()
}
mapping_naf_complete_unique = {
    k: mapping_naf_complete[k] for k, v in mapping_naf_short_unique.items()
}


# /!\ this code block is expensive, please make sure it's executed at application startup
with open(
    f"{_here}/{settings.AGRI_PATH_DATA}/mapping_tranche_effectif_salarie.csv"
) as f:
    reader = csv.reader(f)
    for row in reader:
        mapping_effectif[row[0]] = row[1]
        mapping_effectif_complete[row[0]] = {
            "label": row[1],
            "min": row[2],
            "max": row[3],
        }
        for insee_code in row[4].split(","):
            mapping_effectif_by_insee_codes[insee_code] = row[0]
