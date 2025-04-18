import enum
import logging

from markdownify import markdownify as md

from ._common import get_soup_from_url, load_into_grist


logger = logging.getLogger(__name__)
scrapername = __name__.split(".")[-1]


class Fields(enum.Enum):
    NOM = "nom"
    URL = "url"
    PROMESSE = "promesse"
    CONTEXTE = "contexte"
    OBJECTIFS = "Objectifs"
    TYPE = "Type d'aide"
    MONTANT = "Montant de l'aide"
    BENEFICIAIRES = "beneficiaires"
    DEPENSES = "depenses"
    CRITERES = "selection"
    MODALITES = "modalites"
    ENGAGEMENTS_COMMUNICATION = "Engagement de communication régionale"
    DEPOT = "Modalités de dépôt de la demande Régionale"


def scrape(to_grist: bool = True):
    base_url = "https://www.bretagne.bzh"
    to_load = []
    soup = get_soup_from_url(
        f"{base_url}/aides/?mot-clef=&profil=entreprises-et-professionnels&thematique=agriculture&cloture=0&showall=0"
    )
    for link in soup.css.select("article > a"):
        url = link.attrs["href"]
        aide = {key.name: "" for key in Fields}
        aide.update(
            {
                Fields.NOM.name: link.find("h2").get_text(strip=True),
                Fields.URL.name: url,
            }
        )
        to_load.append(aide)
    for aide in to_load:
        soup = get_soup_from_url(aide[Fields.URL.name])
        aide[Fields.PROMESSE.name] = soup.css.select_one("p.intro").get_text(strip=True)
        contexte_soup = soup.css.select_one(".contexte")
        if contexte_soup:
            aide[Fields.CONTEXTE.name] = md(str(contexte_soup))
        for heading in soup.css.select(
            ".accordeon-content h3, .beneficiaires, .depenses, .selection, .modalites"
        ):
            if heading.name == "h3":
                heading_element = heading.parent
                title = heading.get_text(strip=True)
            else:
                heading_element = heading
                title = heading.attrs["class"][0]
            if title not in Fields:
                continue
            if title == Fields.TYPE.value:
                aide[Fields(title).name] = ",".join(
                    [
                        tag.get_text(strip=True)
                        for tag in heading_element.css.select(".category")
                    ]
                )
            else:
                aide[Fields(title).name] = md(str(heading_element))

    load_into_grist(scrapername, to_load, for_real=to_grist)
