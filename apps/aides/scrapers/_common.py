import csv
import datetime
import itertools
import logging

import requests
from bs4 import BeautifulSoup
from django.conf import settings
from pygrister.api import GristApi


logger = logging.getLogger(__name__)
gristapi = GristApi(config=settings.GRIST_PYGRISTER_CONFIG)


def get_soup_from_url(url: str, verify_tls: bool = True) -> BeautifulSoup:
    headers = {"User-Agent": "AidesAgri/1.0 ; david.guillot@beta.gouv.fr"}

    # Send a GET request to the URL
    response = requests.get(url, headers=headers, timeout=5, verify=verify_tls)
    response.raise_for_status()  # Raise an HTTPError for bad responses

    soup = BeautifulSoup(response.content, "html.parser")
    return soup


def load_into_grist(entityname: str, to_load: list[dict], for_real: bool = True):
    if not to_load:
        logger.warning(f"Nothing to load into Grist for scraper {entityname}, aborting")
        return

    tablename = f"load-{entityname}-{datetime.date.today().isoformat()}".replace(
        "-", "_"
    ).capitalize()

    with open(f".data/{tablename}.csv", "w") as f:
        csvwriter = csv.DictWriter(f, to_load[0].keys())
        csvwriter.writeheader()
        for row in to_load:
            csvwriter.writerow(row)

    if not for_real:
        return

    gristapi.open_session()
    _, tableids = gristapi.add_tables(
        [
            {
                "id": tablename,
                "columns": [
                    {"id": col, "fields": {"label": col}} for col in to_load[0].keys()
                ],
            }
        ]
    )
    tableid = tableids[0]
    for batch in itertools.batched(to_load, n=100):
        try:
            gristapi.add_records(tableid, list(batch))
        except requests.exceptions.RequestException as e:
            raise e  # c'est juste le bon point pour mettre le breakpoint du debugger
    gristapi.close_session()
