import datetime
import logging
from enum import Enum

from markdownify import markdownify as md

from ._common import get_soup_from_url, load_into_grist

logger = logging.getLogger(__name__)
scrapername = __name__.split(".")[-1]


class Fields(Enum):
    NOM = "NOM"
    URL = "URL"
    DESCRIPTION_LONGUE = "DESCRIPTION_LONGUE"
    DATE_DEBUT = "DATE_DEBUT"
    DATE_FIN = "DATE_FIN"
    PERIODE = "PERIODE"
    CIBLE = "CIBLE"
    PROCEDURE = "PROCEDURE"
    AUTRES = "AUTRES"


def scrape(to_grist: bool = True):
    base_url = "https://www.franceagrimer.fr"
    soup = get_soup_from_url(
        f"{base_url}/Accompagner/Planification-ecologique/Planification-ecologique-agriculteurs"
    )
    to_load = []
    for link in soup.find_all("a", class_="rubrique"):
        url = base_url + link.get("href")
        soup = get_soup_from_url(url)
        data = {key.name: "" for key in Fields}

        data[Fields.NOM.name] = str(soup.find("h1").string).strip()
        data[Fields.URL.name] = url

        found_date_range = soup.find(class_="intro__date")
        if found_date_range:
            all_found_dates = found_date_range.find_all("span")
            data[Fields.DATE_DEBUT.name] = (
                datetime.datetime.strptime(all_found_dates[0].string, "%d/%m/%Y")
                .date()
                .isoformat()
            )
            data[Fields.DATE_FIN.name] = (
                datetime.datetime.strptime(all_found_dates[-1].string, "%d/%m/%Y")
                .date()
                .isoformat()
            )

        data[Fields.DESCRIPTION_LONGUE.name] = md(
            str(soup.find(class_="ezxmltext-field"))
        )

        for found_aide_section in soup.find_all(class_="aide-section"):
            section = found_aide_section.find("h3").get_text(strip=True)
            if section == "Quand ?":
                field = Fields.PERIODE
            elif section == "Pour qui ?":
                field = Fields.CIBLE
            elif section == "Comment ?":
                field = Fields.PROCEDURE
            else:
                field = Fields.AUTRES
            data[field.name] = md(
                str(found_aide_section.find(class_="ezxmltext-field"))
            )
        to_load.append(data)

    load_into_grist(scrapername, to_load, for_real=to_grist)
