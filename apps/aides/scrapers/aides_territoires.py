import csv
import logging

import requests
from markdownify import markdownify as md
from xlsx2csv import Xlsx2csv

from ._common import load_into_grist

logger = logging.getLogger(__name__)
scrapername = __name__.split(".")[-1]


def scrape(to_grist: bool = True):
    filename = f"/tmp/{scrapername}"
    with open(f"{filename}.xlsx", "bw") as f:
        r = requests.get(
            "https://aides-territoires.beta.gouv.fr/aides/exporter/?organization_type_slug=farmer"
        )
        f.write(r.content)
    Xlsx2csv(f"{filename}.xlsx", output_encoding="utf-8").convert(f"{filename}.csv")

    with open(f"{filename}.csv") as f:
        csvreader = csv.DictReader(f)
        to_load = []
        for i, row in enumerate(csvreader):
            for col, data in row.items():
                if data.startswith("<"):
                    row[col] = md(data)
            to_load.append(row)

    load_into_grist(scrapername, to_load, for_real=to_grist)
