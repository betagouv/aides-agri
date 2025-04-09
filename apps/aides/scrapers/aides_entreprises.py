import csv
import logging
import re

import requests

from ._common import get_soup_from_url, load_into_grist

logger = logging.getLogger(__name__)
scrapername = __name__.split(".")[-1]


def _scrape(entity: str, to_grist: bool = True):
    entityname = f"{scrapername}_{entity}"
    filename = f"/tmp/{entityname}"
    to_load = []
    with open(f"{filename}.csv", "bw") as f:
        r = requests.get(f"https://data.aides-entreprises.fr/files/{entity}.csv")
        f.write(r.content)
    with open(f"{filename}.csv", encoding="windows-1252") as f:
        reader = csv.DictReader(f, delimiter=";")
        for row in reader:
            to_load.append(row)
    load_into_grist(entityname, to_load, for_real=to_grist)


def scrape(to_grist: bool = True):
    soup = get_soup_from_url("https://data.aides-entreprises.fr/stock")
    for link_to_csv in soup.find_all("a", href=re.compile(r".*\.csv$")):
        entity = link_to_csv.attrs["href"].split("/")[-1].split(".")[0]
        _scrape(entity, to_grist=to_grist)
