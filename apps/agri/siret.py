import csv
import datetime
import os

from django.conf import settings
import requests


mapping_naf_short = dict()
mapping_naf_complete = dict()
mapping_effectif = dict()
mapping_effectif_complete = dict()
mapping_categories_juridiques = dict()

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
        if row[0] == "null":
            mapping_effectif[None] = mapping_effectif[row[0]]
            mapping_effectif_complete[None] = mapping_effectif_complete[row[0]]


# /!\ this code block is expensive, please make sure it's executed at application startup
with open(f"{_here}/{settings.AGRI_PATH_DATA}/mapping_categories_juridiques.csv") as f:
    reader = csv.reader(f)
    for row in reader:
        mapping_categories_juridiques[row[0]] = row[1]


class SearchUnavailable(RuntimeError):
    pass


def search(query: str) -> list[dict]:
    try:
        r = requests.get(
            f"https://recherche-entreprises.api.gouv.fr/search?q={query}",
            timeout=3,
        )
        r.raise_for_status()
        hits = []
        for hit in r.json()["results"]:
            for etablissement in hit["matching_etablissements"]:
                try:
                    libelle_naf = mapping_naf_short[
                        etablissement["activite_principale"]
                    ]
                except KeyError:
                    libelle_naf = ""
                etablissement["libelle_activite_principale"] = libelle_naf
            hits.append(hit)
        return hits
    except requests.RequestException:
        raise SearchUnavailable()


def get(query: str) -> dict:
    societe = search(query)[0]
    societe["libelle_nature_juridique"] = mapping_categories_juridiques.get(
        societe["nature_juridique"], "n/a"
    )
    matching_etablissements = societe.pop("matching_etablissements")
    etablissement = matching_etablissements[0]
    etablissement["societe"] = societe
    etablissement["nom"] = (
        etablissement["nom_commercial"]
        if etablissement["nom_commercial"]
        else societe["nom_complet"]
    )
    for key in etablissement:
        if isinstance(key, str) and key.startswith("date_") and etablissement[key]:
            etablissement[key] = datetime.date.fromisoformat(etablissement[key])
    return etablissement
