import logging
from collections import defaultdict
from enum import StrEnum

from ._common import get_soup_from_url, load_into_grist

logger = logging.getLogger(__name__)
scrapername = __name__.split(".")[-1]


class Fields(StrEnum):
    NOM = "nom"
    URL = "url"
    ENJEU = "enjeu"
    ACTION = "action"
    DESCRIPTION = "description"
    TAUX = "Taux d'aide"
    NOTES = "Notes importantes"
    CONDITIONS = "Conditions d'éligibilité"
    COMPLEMENTS = "Informations complémentaires"
    FICHE = "Consulter la fiche action"
    THEMATIQUE_RIVAGE = "Nom de la thématique sur RIVAGE"
    DEPOT = "Vous créez votre demande d'aide en ligne"


def scrape(to_grist: bool = True):
    base_url = "https://aides-redevances.eau-loire-bretagne.fr"
    to_load = []
    already_seen = set()
    soup = get_soup_from_url(
        f"{base_url}/home/aides/acteurs-agricoles/aides-pour-les-acteurs-agricoles.html"
    )
    for link in soup.css.select("#main div article section li > a[href^='/']"):
        url = link.attrs["href"]
        if url in already_seen:
            continue
        already_seen.add(url)
        aide = defaultdict(str)
        aide.update(
            {
                Fields.NOM.name: link.get_text(strip=True),
                Fields.URL.name: base_url + url,
                Fields.ENJEU.name: link.find_previous("h2").get_text(strip=True),
                Fields.ACTION.name: link.find_previous("h3").get_text(strip=True),
            }
        )
        to_load.append(aide)
    for aide in to_load:
        soup = get_soup_from_url(aide[Fields.URL.name])
        for el in soup.css.select("#main article section p"):
            section_heading = el.find_previous("h3") or el.find_previous("h2")
            section_title = section_heading.get_text(strip=True)
            if section_title == Fields.DEPOT:
                aide[Fields.DEPOT.name] = el.find("a").attrs["href"]
            elif section_title == Fields.FICHE:
                aide[Fields.FICHE.name] = base_url + el.find("a").attrs["href"]
            else:
                aide[Fields(section_title).name] += el.get_text(strip=True) + "\n\n"
    load_into_grist(scrapername, to_load, for_real=to_grist)
