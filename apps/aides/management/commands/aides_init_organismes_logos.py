from pathlib import Path

import requests
from django.conf import settings
from django.core.management.base import BaseCommand
from pygrister.api import GristApi


gristapi = GristApi(settings.AIDES_GRIST_LOADER_PYGRISTER_CONFIG)


class Command(BaseCommand):
    token = ""

    def _fetch_api_page(self, url) -> tuple[dict[str, str], str | None]:
        r = requests.get(
            url, headers={"Authorization": f"Bearer {self.token}"}, timeout=5
        )
        d = r.json()
        return {
            hit["text"].lower().split("(")[0].strip(): hit["logo"]
            for hit in d.get("results")
            if hit["logo"]
        }, d.get("next")

    def _get_list_of_logos(self) -> dict[str, str]:
        r = requests.post(
            "https://aides-territoires.beta.gouv.fr/api/connexion/",
            headers={"X-AUTH-TOKEN": settings.AIDES_AIDES_TERRITOIRES_API_KEY},
            timeout=5,
        )
        self.token = r.json().get("token")
        url = "https://aides-territoires.beta.gouv.fr/api/backers/?itemsPerPage=100"
        logos = dict()
        while url:
            page_logos, url = self._fetch_api_page(url)
            logos.update(**page_logos)
        return logos

    def handle(self, *args, **options):
        # First, fetch all backers from aides-territoires API
        logos_by_nom = self._get_list_of_logos()

        # Then, download each logo and match it to an Organisme from Grist
        organismes_by_nom = {
            o["Nom"].lower().strip(): o["id"]
            for o in gristapi.list_records("Ref_Organisme")[1]
        }
        Path("/tmp/logos").mkdir(parents=True, exist_ok=True)
        attachments_ids_by_organisme = dict()
        for logo_nom, logo_url in logos_by_nom.items():
            r = requests.get(logo_url, timeout=5)
            logo_name = logo_url.split("/")[-1]
            logo_filename = f"/tmp/logos/{logo_name}"
            with open(logo_filename, "wb") as fd:
                for chunk in r.iter_content(chunk_size=128):
                    fd.write(chunk)
            if logo_nom in organismes_by_nom:
                try:
                    _, ids = gristapi.upload_attachment(logo_filename)
                    attachments_ids_by_organisme[organismes_by_nom[logo_nom]] = ids[0]
                except requests.exceptions.HTTPError:
                    print(f"Erreur lors de l'upload du logo de {logo_nom}")
            else:
                print(f"Pas d'organisme trouvé pour {logo_nom}")

        # Finally, update Organismes in Grist
        gristapi.update_records(
            "Ref_Organisme",
            [
                {"id": organisme, "Logo": logo}
                for organisme, logo in attachments_ids_by_organisme.items()
            ],
        )
