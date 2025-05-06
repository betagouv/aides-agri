import functools
import logging

from markdownify import markdownify as md

from ._grist import AbstractRawFields, AbstractAidesSource
from ._utils import get_soup_from_url

logger = logging.getLogger(__name__)


class Fields(AbstractRawFields):
    NOM = "NOM"
    URL = "URL"
    OBJECTIFS_ET_TAUX = "OBJECTIFS_ET_TAUX"
    DESCRIPTION = "DESCRIPTION"
    PROCEDURE = "PROCEDURE"


class EauGrandSudOuest(AbstractAidesSource):
    def _scrape(self) -> list[dict]:
        soup = get_soup_from_url(
            "https://eau-grandsudouest.fr/aides-financieres",
            verify_tls=False,
            with_cache=False,
        )

        aides = []
        for theme in soup.find_all(class_="thematique-term-item"):
            url = theme.find("a").get("href")
            soup = get_soup_from_url(url, verify_tls=False)
            for found_aide in soup.css.select(
                ".paragraph--type--blocs-dropdown-enrichi"
            ):
                data = {key.name_full: "" for key in Fields}
                data[Fields.URL.name_full] = url

                nom = found_aide.find(class_="title-drop-down").string
                data[Fields.NOM.name_full] = nom.strip() if nom else ""
                data[Fields.DESCRIPTION.name_full] = md(
                    str(found_aide.find(class_="col-lg-7"))
                )
                container1 = found_aide.find(class_="col-lg-5").find(
                    class_="container-push-1"
                )
                if container1:
                    data[Fields.OBJECTIFS_ET_TAUX.name_full] = md(str(container1))
                container2 = found_aide.find(class_="col-lg-5").find(
                    class_="container-push-2"
                )
                if container2:
                    data[Fields.PROCEDURE.name_full] = md(str(container2))
                aides.append(data)

        return aides

    @functools.cached_property
    def _organisme(self) -> tuple[str, str]:
        return self.grist_integration.build_grist_organisme(
            "Agence de l'eau Grand Sud-Ouest"
        )

    @functools.cached_property
    def _sujets(self) -> tuple[str, ...]:
        return self.grist_integration.build_grist_sujets(["Eau"])

    def _enrich_aide(self, aide: dict) -> None:
        columns = self.grist_integration.VisibleSolutionsColumns
        aide.update(
            {
                columns.ORGANISME.value: self._organisme,
                columns.SUJETS.value: self._sujets,
                columns.NOM.value: aide[Fields.NOM.name_full],
                columns.URL_DESCRIPTIF.value: aide[Fields.URL.name_full],
                columns.DESCRIPTION.value: aide[Fields.DESCRIPTION.name_full],
                columns.MONTANT_TAUX.value: aide[Fields.OBJECTIFS_ET_TAUX.name_full],
            }
        )
