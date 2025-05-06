import enum
import logging
import unicodedata

from bs4 import BeautifulSoup
from markdownify import markdownify as md

from ._grist import load_into_grist


logger = logging.getLogger(__name__)
scrapername = __name__.split(".")[-1]


class Fields(enum.StrEnum):
    OBJECTIFS = "→ OBJECTIFS"
    TYPE_ACTIONS = "TYPE D'ACTIONS"
    BENEFICIAIRES = "BENEFICIAIRES ELIGIBLES"
    TERRITOIRES = "TERRITOIRES ELIGIBLES"
    ACTIONS_ELIGIBLES = "ACTIONS ET DEPENSES ELIGIBLES"
    ACTIONS_NON_ELIGIBLES = "ACTIONS ET DEPENSES NON ELIGIBLES"
    CONDITIONS = "CONDITIONS D'AIDES"
    CONDITIONS_SOLDE = "CONDITIONS DE SOLDE DE L'AIDE"
    MODALITES = "MODALITE DE CALCUL DES AIDES"


_to_ignore = (
    "Bassin de Corse",
    "Bassin Rhône-Méditerranée",
    "Bassin de CorseBassin Rhône-Méditerranée",
)


def _normalize_heading(heading_text: str) -> str:
    return (
        "".join(
            [
                c
                for c in unicodedata.normalize("NFD", heading_text)
                if unicodedata.category(c) != "Mn"
            ]
        )
        .replace("  ", " ")
        .strip()
    )


def _scrape(filename: str):
    with open(f"/tmp/{filename}/{filename}.html") as f:
        soup = BeautifulSoup(f.read(), "html.parser")

        title = soup.find("h1").get_text(strip=True)

        code = title.split("-")[0].strip()

        data = {"code": code, "nom": title}

        headings = ["h1", "h2", "h3", "h4"]
        for heading in soup.find_all(headings):
            key = _normalize_heading(heading.text)

            if key not in Fields:
                continue

            data[key] = ""
            for sibling in heading.find_next_siblings():
                if data[key] and sibling.name in headings:
                    break
                if sibling.get_text(strip=True) in _to_ignore:
                    continue
                data[key] += "\n" + md(str(sibling))
    return data


def scrape():
    filenames = (
        "agri2-filieres",
        "3-2-agri3-groupes",
    )

    to_load = []
    for filename in filenames:
        to_load.append(_scrape(filename))

    load_into_grist(scrapername, to_load)
