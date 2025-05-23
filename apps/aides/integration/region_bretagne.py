import datetime
import functools
import logging

from markdownify import markdownify as md

from ._grist import GristIntegration, AbstractAidesSource, AbstractRawFields
from ._utils import get_soup_from_url


logger = logging.getLogger(__name__)


class Fields(AbstractRawFields):
    NOM = "nom"
    URL = "url"
    INTRO = "intro"
    CONTEXTE = "contexte"
    OBJECTIFS = "Objectifs"
    TYPE = "Type d'aide"
    MONTANT = "Montant de l'aide"
    BENEFICIAIRES = "beneficiaires"
    DEPENSES = "depenses"
    CRITERES = "selection"
    MODALITES = "modalites"
    DATE_CLOTURE = "date_cloture"
    ENGAGEMENTS_COMMUNICATION = "Engagement de communication régionale"
    DEPOT = "Modalités de dépôt de la demande Régionale"


class RegionBretagne(AbstractAidesSource):
    def _scrape(self) -> list[dict]:
        base_url = "https://www.bretagne.bzh"
        aides = []
        soup = get_soup_from_url(
            f"{base_url}/aides/?mot-clef=&profil=entreprises-et-professionnels&thematique=agriculture&cloture=0&showall=0",
            with_cache=False,
        )
        for link in soup.css.select("article > a"):
            url = link.attrs["href"]
            aide = {key.name_full: "" for key in Fields}
            aide.update(
                {
                    Fields.NOM.name_full: link.find("h2").get_text(strip=True),
                    Fields.URL.name_full: url,
                }
            )
            aides.append(aide)
        for aide in aides:
            soup = get_soup_from_url(aide[Fields.URL.name_full])
            aide[Fields.INTRO.name_full] = soup.css.select_one("p.intro").get_text(
                strip=True
            )
            contexte_soup = soup.css.select_one(".contexte")
            if contexte_soup:
                aide[Fields.CONTEXTE.name_full] = md(str(contexte_soup))
            if found_date_cloture := soup.css.select_one("span.category.warning"):
                aide[Fields.DATE_CLOTURE.name_full] = (
                    found_date_cloture.get_text(strip=True).split(":")[-1].strip()
                )
            for heading in soup.css.select(
                ".accordeon-content h3, .beneficiaires, .depenses, .selection, .modalites"
            ):
                if heading.name == "h3":
                    heading_element = heading.parent
                    title = heading.get_text(strip=True)
                else:
                    heading_element = heading
                    title = heading.attrs["class"][0]
                if title == Fields.TYPE.value:
                    aide[Fields.TYPE.name_full] = ",".join(
                        [
                            tag.get_text(strip=True)
                            for tag in heading_element.css.select(".category")
                        ]
                    )
                else:
                    try:
                        aide[Fields(title).name_full] = md(str(heading_element))
                    except ValueError:
                        continue
        return aides

    mapping_types = {
        "Subvention": "Financement",
        "Accompagnement": "Conseil",
        "Intervention régionale": "Étude",
    }

    @classmethod
    def map_types(cls, raw_types: str):
        return [cls.mapping_types[raw_type] for raw_type in raw_types.split(",")]

    @functools.cached_property
    def _region_bretagne(self) -> tuple[str, str]:
        return self.grist_integration.build_grist_region("Bretagne")

    @functools.cached_property
    def _organisme_bretagne(self) -> tuple[str, str]:
        return self.grist_integration.build_grist_organisme(
            "Conseil régional de Bretagne"
        )

    def _enrich_aide(self, aide: dict) -> None:
        columns = GristIntegration.VisibleSolutionsColumns
        date_cloture = None
        if aide[Fields.DATE_CLOTURE.name_full]:
            try:
                date_cloture = (
                    datetime.datetime.strptime(
                        aide[Fields.DATE_CLOTURE.name_full], "%d/%m/%Y"
                    )
                    .date()
                    .isoformat()
                )
            except ValueError:
                pass
        aide.update(
            {
                columns.ZONE_GEOGRAPHIQUE.value: self._region_bretagne,
                columns.ORGANISME.value: self._organisme_bretagne,
                columns.NOM.value: aide[Fields.NOM.name_full],
                columns.URL_DESCRIPTIF.value: aide[Fields.URL.name_full],
                columns.PROMESSE.value: aide[Fields.INTRO.name_full],
                columns.MONTANT_TAUX.value: aide[Fields.MONTANT.name_full]
                .replace("### Montant de l'aide", "")
                .strip(),
                columns.CONDITIONS.value: aide[Fields.CRITERES.name_full]
                .replace("### Critères de sélection", "")
                .strip(),
                columns.TYPE_DEPENSE.value: aide[Fields.DEPENSES.name_full]
                .replace("### Dépenses éligibles", "")
                .strip(),
                columns.DESCRIPTION.value: (
                    aide[Fields.CONTEXTE.name_full]
                    + "\n"
                    + aide[Fields.OBJECTIFS.name_full]
                ),
                columns.TYPES.value: self.grist_integration.build_grist_types(
                    self.map_types(aide[Fields.TYPE.name_full])
                ),
                columns.DATE_CLOTURE.value: date_cloture,
            }
        )
