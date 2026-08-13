######################################
# TO BE COPIED/PASTED IN DJANGO SHELL #
#######################################
import requests

from aides.models import Organisme, ZoneGeographique


r = requests.get(
    "https://api-lannuaire.service-public.gouv.fr/api/explore/v2.1/catalog/datasets/api-lannuaire-administration/records?where=nom%20like%20%22direction%20d%C3%A9partementale%20des%20territoires%22&limit=100&select=id,code_insee_commune",
    headers={"User-Agent": "AidesAgri/1.0"},
    timeout=5,
)
for d in r.json():
    code_insee = d["code_insee_commune"]
    code_departement = code_insee[:3] if code_insee.startswith("97") else code_insee[:2]
    ddt = Organisme.objects.get(
        acronyme__startswith="DDT",
        zones_geographiques__type=ZoneGeographique.Type.DEPARTEMENT,
        zones_geographiques__code=code_departement,
    )
    ddt.id_annuaire_service_public = d["id"]
    ddt.save()
