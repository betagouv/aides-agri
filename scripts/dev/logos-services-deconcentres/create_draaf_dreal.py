#######################################
# TO BE COPIED/PASTED IN DJANGO SHELL #
#######################################
from django.utils.text import slugify

from aides.models import Organisme, ZoneGeographique


for region in ZoneGeographique.objects.regions():
    if region.code in ("01", "02", "03", "04", "06"):
        nom_draaf = "Direction de l’Alimentation, de l’Agriculture et de la Forêt"
        nom_dreal = "Direction de l’Environnement, de l’Aménagement et du Logement"
        acronyme_draaf = "DAAF"
        acronyme_dreal = "DEAL"
        url_draaf = f"daaf.{slugify(region.nom)}"
        url_dreal = slugify(region.nom)
    elif region.code == "11":
        nom_draaf = "Direction Régionale Interdépartementale de l’Alimentation, de l’Agriculture et de la Forêt"
        nom_dreal = "Direction Régionale Interdépartementale de l’Environnement, de l’Aménagement et des Transports"
        acronyme_draaf = "DRIAAF"
        acronyme_dreal = "DRIEAT"
        url_draaf = f"driaaf.{slugify(region.nom)}"
        url_dreal = "drieat." + slugify(region.nom)
    else:
        nom_draaf = (
            "Direction Régionale de l’Alimentation, de l’Agriculture et de la Forêt"
        )
        nom_dreal = (
            "Direction Régionale de l’Environnement, de l’Aménagement et du Logement"
        )
        acronyme_draaf = "DRAAF"
        acronyme_dreal = "DREAL"
        if region.code == "93":
            url_draaf = "draaf.paca"
            url_dreal = "paca"
        else:
            url_draaf = f"draaf.{slugify(region.nom)}"
            url_dreal = slugify(region.nom)
    organisme_draaf = Organisme.objects.create(
        famille=Organisme.Famille.ETAT,
        secteurs=[Organisme.Secteur.AGRICULTURE],
        nom=f"{nom_draaf} {region.nom}",
        acronyme=f"{acronyme_draaf} {region.nom}",
        url=f"https://{url_draaf}.agriculture.gouv.fr/",
    )
    organisme_dreal = Organisme.objects.create(
        famille=Organisme.Famille.ETAT,
        secteurs=[Organisme.Secteur.ENVIRONNEMENT],
        nom=f"{nom_dreal} {region.nom}",
        acronyme=f"{acronyme_dreal} {region.nom}",
        url=f"https://www.{url_dreal}.developpement-durable.gouv.fr/",
    )
    organisme_draaf.zones_geographiques.set([region])
    organisme_dreal.zones_geographiques.set([region])
    try:
        with open(f"data/draaf-{region.code}.png", "rb") as f:
            organisme_draaf.illustration = f.read()
            organisme_draaf.save()
    except FileNotFoundError:
        print(f"Logo DRAAF non trouvé pour la région {region.code}")
    try:
        with open(f"data/dreal-{region.code}.png", "rb") as f:
            organisme_dreal.illustration = f.read()
            organisme_dreal.save()
    except FileNotFoundError:
        print(f"Logo DREAL non trouvé pour la région {region.code}")
