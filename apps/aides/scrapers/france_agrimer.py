import datetime
import logging
from enum import StrEnum

from markdownify import markdownify as md

from ._common import get_soup_from_url, load_into_grist

logger = logging.getLogger(__name__)

tablename = f"load-france-agrimer-{datetime.date.today().isoformat()}".replace(
    "-", "_"
).capitalize()

base_url = "https://www.franceagrimer.fr"


class Fields(StrEnum):
    NOM = "nom"
    DESCRIPTION_LONGUE = "description_longue"
    DATE_DEBUT = "date_debut"
    DATE_FIN = "date_fin"
    PERIODE = "periode"
    CIBLE = "cible"
    PROCEDURE = "procedure"
    AUTRES = "autres"


def scrape():
    soup = get_soup_from_url(
        f"{base_url}/Accompagner/Planification-ecologique/Planification-ecologique-agriculteurs"
    )
    to_load = []
    for link in soup.find_all("a", class_="rubrique"):
        soup = get_soup_from_url(base_url + link.get("href"))
        data = {key.value: "" for key in Fields}

        data[Fields.NOM.value] = str(soup.find("h1").string).strip()

        found_date_range = soup.find(class_="intro__date")
        if found_date_range:
            all_found_dates = found_date_range.find_all("span")
            data[Fields.DATE_DEBUT.value] = (
                datetime.datetime.strptime(all_found_dates[0].string, "%d/%m/%Y")
                .date()
                .isoformat()
            )
            data[Fields.DATE_FIN.value] = (
                datetime.datetime.strptime(all_found_dates[-1].string, "%d/%m/%Y")
                .date()
                .isoformat()
            )

        data[Fields.DESCRIPTION_LONGUE.value] = md(
            str(soup.find(class_="ezxmltext-field"))
        )

        for found_aide_section in soup.find_all(class_="aide-section"):
            section = found_aide_section.find("h3").string.strip()
            if section == "Quand ?":
                field = Fields.PERIODE
            elif section == "Pour qui ?":
                field = Fields.CIBLE
            elif section == "Comment ?":
                field = Fields.PERIODE
            else:
                field = Fields.AUTRES
            data[field.value] = md(
                str(found_aide_section.find(class_="ezxmltext-field"))
            )
        to_load.append(data)
    load_into_grist(tablename, to_load)
