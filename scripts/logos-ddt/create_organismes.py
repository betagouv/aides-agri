#######################################
# TO BE COPIED/PASTED IN DJANGO SHELL #
#######################################
from django.utils.text import slugify

from aides.models import Organisme, ZoneGeographique


for dept in ZoneGeographique.objects.departements():
    if dept.code in (
        "59",
        "62",
        "80",
        "76",
        "27",
        "14",
        "50",
        "35",
        "22",
        "29",
        "56",
        "44",
        "85",
        "17",
        "33",
        "40",
        "64",
        "971",
        "972",
        "973",
        "974",
        "975",
        "66",
        "11",
        "34",
        "30",
        "13",
        "83",
        "06",
        "2A",
        "2B",
    ):
        nom = f"Direction Départementale du Territoire et de la Mer {dept.nom}"
        acronyme = f"DDTM {dept.code}"
    else:
        nom = f"Direction Départementale du Territoire {dept.nom}"
        acronyme = f"DDT {dept.code}"
    organisme = Organisme.objects.create(
        famille=Organisme.Famille.ETAT,
        secteurs=[Organisme.Secteur.AGRICULTURE, Organisme.Secteur.ENVIRONNEMENT],
        nom=nom,
        acronyme=acronyme,
        url=f"https://www.{slugify(dept.nom)}.gouv.fr/",
    )
    organisme.zones_geographiques.set([dept])
    try:
        with open(f"data/ddt-{dept.code}.png", "rb") as f:
            organisme.logo = f.read()
            organisme.logo_filename = f"ddt-{dept.code}.png"
            organisme.save()
    except FileNotFoundError:
        print(f"Logo non trouvé pour le département {dept.code}")
