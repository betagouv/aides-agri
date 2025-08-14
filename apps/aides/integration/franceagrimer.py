import datetime
import logging

import requests.exceptions
from bs4 import BeautifulSoup
from markdownify import markdownify as md

from ._base import AbstractAidesSource, AbstractRawFields
from ._utils import get_soup_from_url

logger = logging.getLogger(__name__)
scrapername = __name__.split(".")[-1]


class Fields(AbstractRawFields):
    NOM = "NOM"
    URL = "URL"
    PROGRAMME = "PROGRAMME"
    DESCRIPTION = "DESCRIPTION"
    CONTACTS = "CONTACTS"
    DATE_DEBUT = "DATE_DEBUT"
    DATE_FIN = "DATE_FIN"
    PERIODE = "Quand ?"
    CIBLE = "Pour qui ?"
    PROCEDURE = "Comment ?"


class FranceAgrimer(AbstractAidesSource):
    BASE_URL = "https://www.franceagrimer.fr"
    URLS = (
        "/Accompagner/Planification-ecologique/Planification-ecologique-agriculteurs",
        "/Accompagner/France-2030-Souverainete-alimentaire-et-transition-agroecologique/France-2030-Agriculteurs",
        "/Accompagner/Dispositifs-par-filiere/",
    )

    PROGRAMMES = {"France-2030-Agriculteurs": "France 2030"}

    def _scrape_rubrique(self, url: str, soup: BeautifulSoup) -> list[dict]:
        aides = []
        if soup.css.select_one(".intro__content"):
            aides.append(self._scrape_aide(url, soup))
        elif soup.css.select_one(".rubrique"):
            for link in soup.find_all("a", class_="rubrique"):
                url = self.BASE_URL + link.get("href")
                try:
                    soup = get_soup_from_url(url, with_cache=False)
                    aides.extend(self._scrape_rubrique(url, soup))
                except requests.exceptions.HTTPError:
                    continue
        else:
            return []
        return aides

    def _scrape_aide(self, url: str, soup: BeautifulSoup) -> dict:
        aide = {key.name_full: "" for key in Fields}

        aide[Fields.NOM.name_full] = str(soup.find("h1").string).strip()
        aide[Fields.URL.name_full] = url
        aide[Fields.PROGRAMME.name_full] = url.split("/")[-2]

        found_date_range = soup.find(class_="intro__date")
        if found_date_range:
            all_found_dates = found_date_range.find_all("span")
            if all_found_dates:
                aide[Fields.DATE_DEBUT.name_full] = (
                    datetime.datetime.strptime(all_found_dates[0].string, "%d/%m/%Y")
                    .date()
                    .isoformat()
                )
                aide[Fields.DATE_FIN.name_full] = (
                    datetime.datetime.strptime(all_found_dates[-1].string, "%d/%m/%Y")
                    .date()
                    .isoformat()
                )

        aide[Fields.CONTACTS.name_full] = md(
            str(soup.css.select_one(".ezxmltext-field"))
        )
        aide[Fields.DESCRIPTION.name_full] = md(
            str(soup.css.select_one("h2.titre-aide + div.ezxmltext-field"))
        )

        for found_aide_section in soup.find_all(class_="aide-section"):
            section = found_aide_section.find("h3").get_text(strip=True)
            try:
                field = Fields(section)
                aide[field.name_full] = md(
                    str(found_aide_section.find(class_="ezxmltext-field"))
                )
            except ValueError:
                print(f"pas de champ trouvé pour le titre {section}")

        return aide

    def _scrape(self) -> list[dict]:
        aides = []
        for url in self.URLS:
            soup = get_soup_from_url(f"{self.BASE_URL}{url}", with_cache=False)
            aides.extend(self._scrape_rubrique(url, soup))
        return aides
