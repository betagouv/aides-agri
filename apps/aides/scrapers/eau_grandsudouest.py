import logging
from enum import Enum

from markdownify import markdownify as md

from ._common import get_soup_from_url, load_into_grist

logger = logging.getLogger(__name__)
scrapername = __name__.split(".")[-1]


class Fields(Enum):
    NOM = "NOM"
    URL = "URL"
    OBJECTIFS_ET_TAUX = "OBJECTIFS_ET_TAUX"
    DESCRIPTION = "DESCRIPTION"
    PROCEDURE = "PROCEDURE"


def scrape(to_grist: bool = True):
    soup = get_soup_from_url(
        "https://eau-grandsudouest.fr/aides-financieres", verify_tls=False
    )

    to_load = []
    for theme in soup.find_all(class_="thematique-term-item"):
        url = theme.find("a").get("href")
        soup = get_soup_from_url(url, verify_tls=False)
        for found_aide in soup.css.select(".paragraph--type--blocs-dropdown-enrichi"):
            data = {key.name: "" for key in Fields}
            data[Fields.URL.name] = url

            nom = found_aide.find(class_="title-drop-down").string
            data[Fields.NOM.name] = nom.strip() if nom else ""
            data[Fields.DESCRIPTION.name] = md(str(found_aide.find(class_="col-lg-7")))
            container1 = found_aide.find(class_="col-lg-5").find(
                class_="container-push-1"
            )
            if container1:
                data[Fields.OBJECTIFS_ET_TAUX.name] = md(str(container1))
            container2 = found_aide.find(class_="col-lg-5").find(
                class_="container-push-2"
            )
            if container2:
                data[Fields.PROCEDURE.name] = md(str(container2))
            to_load.append(data)

    load_into_grist(scrapername, to_load, for_real=to_grist)
