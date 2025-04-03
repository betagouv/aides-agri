import itertools
import logging

import requests
from bs4 import BeautifulSoup
from django.conf import settings
from pygrister.api import GristApi


logger = logging.getLogger(__name__)
gristapi = GristApi(config=settings.GRIST_PYGRISTER_CONFIG)


def get_soup_from_url(url: str) -> BeautifulSoup:
    headers = {"User-Agent": "AidesAgri/1.0 ; david.guillot@beta.gouv.fr"}

    # Send a GET request to the URL
    response = requests.get(url, headers=headers, timeout=5, verify=False)
    response.raise_for_status()  # Raise an HTTPError for bad responses

    soup = BeautifulSoup(response.content, "html.parser")
    return soup


def load_into_grist(tablename: str, to_load: list[dict]):
    if not to_load:
        logger.warning(f"Nothing to load into Grist for table {tablename}, aborting")
        return

    gristapi.open_session()
    gristapi.add_tables(
        [
            {
                "id": tablename,
                "columns": [
                    {"id": col, "fields": {"label": col}} for col in to_load[0].keys()
                ],
            }
        ]
    )
    for batch in itertools.batched(to_load, n=100):
        gristapi.add_records(tablename, list(batch))
    gristapi.close_session()
