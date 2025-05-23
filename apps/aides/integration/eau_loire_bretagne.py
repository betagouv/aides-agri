import functools
import logging
from collections import defaultdict

from ._grist import AbstractAidesSource, AbstractRawFields
from ._utils import get_soup_from_url

logger = logging.getLogger(__name__)


class Fields(AbstractRawFields):
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


class EauLoireBretagne(AbstractAidesSource):
    def _scrape(self) -> list[dict]:
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
                    Fields.NOM.name_full: link.get_text(strip=True),
                    Fields.URL.name_full: base_url + url,
                    Fields.ENJEU.name_full: link.find_previous("h2").get_text(
                        strip=True
                    ),
                    Fields.ACTION.name_full: link.find_previous("h3").get_text(
                        strip=True
                    ),
                }
            )
            to_load.append(aide)
        for aide in to_load:
            soup = get_soup_from_url(aide[Fields.URL.name_full])
            for el in soup.css.select("#main article section p"):
                section_heading = el.find_previous("h3") or el.find_previous("h2")
                section_title = section_heading.get_text(strip=True)
                if section_title == Fields.DEPOT.value:
                    aide[Fields.DEPOT.name_full] = el.find("a").attrs["href"]
                elif section_title == Fields.FICHE.value:
                    aide[Fields.FICHE.name_full] = base_url + el.find("a").attrs["href"]
                else:
                    aide[Fields(section_title).name_full] += (
                        el.get_text(strip=True) + "\n\n"
                    )
        return to_load

    @functools.cached_property
    def _organisme(self) -> tuple[str, str]:
        return self.grist_integration.build_grist_organisme(
            "Agence de l'eau Loire-Bretagne"
        )

    def _enrich_aide(self, aide: dict):
        columns = self.grist_integration.__class__.VisibleSolutionsColumns
        aide.update(
            {
                columns.ORGANISME.value: self._organisme,
                columns.NOM.value: aide[Fields.NOM.name_full],
                columns.PROMESSE.value: aide[Fields.ENJEU.name_full]
                + ", "
                + aide[Fields.ACTION.name_full],
                columns.URL_DESCRIPTIF.value: aide[Fields.URL.name_full],
                columns.MONTANT_TAUX.value: aide[Fields.TAUX.name_full],
                columns.CONDITIONS.value: aide[Fields.CONDITIONS.name_full],
                columns.TYPE_DEPENSE.value: aide[Fields.COMPLEMENTS.name_full],
                columns.AUTRES_INFORMATIONS.value: aide[Fields.NOTES.name_full],
            }
        )
