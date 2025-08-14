import logging

from markdownify import markdownify as md

from ._base import AbstractAidesSource, AbstractRawFields
from ._utils import get_soup_from_url


logger = logging.getLogger(__name__)


class Fields(AbstractRawFields):
    NOM = "nom"
    URL = "url"
    MONTANT = "Montant et accompagnement proposé"
    DESCRIPTION = "Votre projet"
    CRITERES = "Bénéficiaires et points d'attention"
    MODALITES = "Prochaines étapes"
    DEPOT = "Déposer une demande"
    CONTACT = "Contact"
    AUTRES_INFOS = "Foire aux questions"


class RegionAURA(AbstractAidesSource):
    base_url = "https://www.auvergnerhonealpes.fr"

    def _fetch_aides_from_page(self, page_number: int) -> tuple[list[str], bool]:
        soup = get_soup_from_url(
            f"{self.base_url}/aides",
            params={"f[0]": "profil:58118", "page": str(page_number)},
            with_cache=False,
        )
        return [
            str(link.attrs["href"]) for link in soup.css.select(".c-result a[href]")
        ], soup.css.select_one("a[rel=next]") is not None

    def _scrape_aide(self, url) -> dict:
        soup = get_soup_from_url(url)
        aide = {key.name_full: "" for key in Fields}
        aide.update(
            {
                Fields.NOM.name_full: soup.css.select_one("h1").get_text(strip=True),
                Fields.URL.name_full: url,
            }
        )
        for section_title in soup.css.select(".c-project__title"):
            aide[Fields(section_title.get_text(strip=True)).name_full] = md(
                str(section_title.find_next_sibling("div"))
            )
        return aide

    def _scrape(self) -> list[dict]:
        aides_urls = []
        aides = []
        page_number = 0
        next_page = True
        while next_page:
            page_aides, next_page = self._fetch_aides_from_page(page_number)
            aides_urls.extend(page_aides)
            page_number += 1
        for url in aides_urls:
            aides.append(self._scrape_aide(f"{self.base_url}{url}"))
        return aides
