import datetime
from enum import Enum

from markdownify import markdownify as md

from ._common import get_soup_from_url, load_into_grist

tablename = f"load-eau-grand-sud-ouest{datetime.date.today().isoformat()}".replace(
    "-", "_"
).capitalize()


class Fields(Enum):
    NOM = "nom"
    DESCRIPTION_LONGUE = "description_longue"
    DESCRIPTION_COURTE = "description_courte"
    PROCEDURE = "procedure"


def scrape():
    soup = get_soup_from_url("https://eau-grandsudouest.fr/aides-financieres")
    to_load = []
    for theme in soup.find_all(class_="thematique-term-item"):
        soup = get_soup_from_url(theme.find("a").get("href"))
        for found_aide in soup.find_all(
            class_="paragraph--type--blocs-dropdown-enrichi"
        ):
            data = {key.value: "" for key in Fields}

            nom = found_aide.find(class_="title-drop-down").string
            data[Fields.NOM.value] = nom.strip() if nom else ""
            data[Fields.DESCRIPTION_COURTE.value] = md(
                str(found_aide.find(class_="col-lg-7"))
            )
            container1 = found_aide.find(class_="col-lg-5").find(
                class_="container-push-1"
            )
            if container1:
                data[Fields.DESCRIPTION_LONGUE.value] = md(str(container1))
            container2 = found_aide.find(class_="col-lg-5").find(
                class_="container-push-2"
            )
            if container2:
                data[Fields.PROCEDURE.value] = md(str(container2))
            to_load.append(data)
    load_into_grist(tablename, to_load)
