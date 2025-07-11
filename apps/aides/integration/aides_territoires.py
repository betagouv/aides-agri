import logging

from django.conf import settings
from markdownify import markdownify as md

from ._base import AbstractAidesSource, AbstractRawFields
from ._utils import do_request

logger = logging.getLogger(__name__)


class Fields(AbstractRawFields):
    NOM_NORMALISE = "name"
    NOM = "name_initial"
    URL = "url"
    URL_DESCRIPTIF = "origin_url"
    DESCRIPTION = "description"
    PROGRAMMES = "programs"
    CONDITIONS = "eligibility"
    ZONES_GEOGRAPHIQUES = "perimeter"
    COUVERTURE_GEOGRAPHIQUE = "perimeter_scale"
    TYPE_DEPENSE = "destinations"
    URL_DEMARCHE = "application_url"
    TYPES = "aid_types"
    CATEGORIES = "categories"
    PORTEURS = "financers"
    TAUX_MIN = "subvention_rate_lower_bound"
    TAUX_MAX = "subvention_rate_upper_bound"
    TAUX_COMMENTAIRE = "subvention_comment"
    DATE_DEBUT = "predeposit_date"
    DATE_FIN = "submission_deadline"
    AAP_AMI = "is_call_for_project"


class AidesTerritoires(AbstractAidesSource):
    base_url = "https://aides-territoires.beta.gouv.fr"
    token = ""

    def _do_api_call(self, url) -> dict:
        if not self.token:
            r = do_request(
                f"{self.base_url}/api/connexion/",
                method="post",
                headers={"X-AUTH-TOKEN": settings.AIDES_AIDES_TERRITOIRES_API_KEY},
            )
            self.token = r.json().get("token")
        r = do_request(url, headers={"Authorization": f"Bearer {self.token}"})
        r.raise_for_status()
        return r.json()

    def _fetch_aides_from_page(self, url) -> tuple[list[dict], str]:
        aides = []
        d = self._do_api_call(url)
        for hit in d.get("results"):
            aide = dict()
            for field in Fields:
                value = hit.get(field.value)

                if field == Fields.URL:
                    value = f"{self.base_url}{value}"
                elif value and field in (Fields.DESCRIPTION, Fields.CONDITIONS):
                    value = md(value)

                aide[field.name_full] = value
            aides.append(aide)
        return aides, d.get("next")

    def _scrape(self) -> list[dict]:
        aides = []
        url = f"{self.base_url}/api/aids/?organization_type_slugs=farmer"
        while url:
            page_aides, url = self._fetch_aides_from_page(url)
            aides.extend(page_aides)
        return aides
