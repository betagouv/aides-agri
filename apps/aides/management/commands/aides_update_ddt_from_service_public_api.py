import json

import requests
from django.core.management.base import BaseCommand

from ...models import Organisme


def extract_url(data: dict) -> str:
    d = json.loads(data["site_internet"])
    return d[0]["valeur"] if d else ""


def extract_telephone(data: dict) -> str:
    d = json.loads(data["telephone"])
    return d[0]["valeur"] if d else ""


def extract_adresse(data: dict) -> str:
    d = json.loads(data["adresse"])
    if not d:
        return ""
    adresse = d[0]
    return (
        f"{adresse['numero_voie']}\n{adresse['code_postal']} {adresse['nom_commune']}"
    )


def _format_heure(heure: str) -> str:
    return heure[:-3].replace(":", "h")


def extract_horaires(data: dict) -> str:
    if not data["plage_ouverture"]:
        return ""
    d = json.loads(data["plage_ouverture"])
    horaires = []
    for ouverture in d:
        if ouverture["nom_jour_debut"] == ouverture["nom_jour_fin"]:
            phrase = f"Le {ouverture['nom_jour_debut'].lower()} : "
        else:
            phrase = f"Du {ouverture['nom_jour_debut'].lower()} au {ouverture['nom_jour_fin'].lower()} : "
        phrase += f"de {_format_heure(ouverture['valeur_heure_debut_1'])} à {_format_heure(ouverture['valeur_heure_fin_1'])}"
        if ouverture["valeur_heure_debut_2"]:
            phrase += f" et de {_format_heure(ouverture['valeur_heure_debut_2'])} à {_format_heure(ouverture['valeur_heure_fin_2'])}"
        horaires.append(phrase)
    return "\n".join(horaires)


class Command(BaseCommand):
    def handle(self, *args, **options):
        r = requests.get(
            "https://api-lannuaire.service-public.gouv.fr/api/explore/v2.1/catalog/datasets/api-lannuaire-administration/records?where=nom%20like%20%22direction%20d%C3%A9partementale%20des%20territoires%22&limit=100&select=id,nom,adresse,telephone,site_internet,adresse_courriel,plage_ouverture,siren",
            headers={"User-Agent": "AidesAgri/1.0"},
            timeout=5,
        )
        results = r.json()["results"]
        ddt_by_id = {ddt["id"]: ddt for ddt in results}
        qs = Organisme.objects.filter(id_annuaire_service_public__in=ddt_by_id.keys())
        for organisme in qs:
            ddt = ddt_by_id[organisme.id_annuaire_service_public]
            organisme.siren = ddt["siren"]
            organisme.courriel = ddt["adresse_courriel"] or ""
            organisme.url = extract_url(ddt)
            organisme.telephone = extract_telephone(ddt)
            organisme.adresse = extract_adresse(ddt)
            organisme.horaires = extract_horaires(ddt)
        Organisme.objects.bulk_update(
            qs, ["siren", "courriel", "url", "telephone", "adresse", "horaires"]
        )
