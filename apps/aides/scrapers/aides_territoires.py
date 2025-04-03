import csv
import datetime

import requests
from markdownify import markdownify as md
from xlsx2csv import Xlsx2csv

from ._common import gristapi

dataname = f"aides-territoires-{datetime.date.today().isoformat()}"
filename = f"/tmp/{dataname}"
tablename = f"load-{dataname}".replace("-", "_").capitalize()


def scrape():
    with open(f"{filename}.xlsx", "bw") as f:
        r = requests.get(
            "https://aides-territoires.beta.gouv.fr/aides/exporter/?organization_type_slug=farmer"
        )
        f.write(r.content)
    Xlsx2csv(f"{filename}.xlsx", output_encoding="utf-8").convert(f"{filename}.csv")


def load():
    with open(f"{filename}.csv") as f:
        csvreader = csv.reader(f)
        cols = []
        to_load = []
        for i, row in enumerate(csvreader):
            if i == 0:
                gristapi.add_tables(
                    [
                        {
                            "id": tablename,
                            "columns": [
                                {"id": col, "fields": {"label": col}} for col in row
                            ],
                        }
                    ]
                )
                cols = [c["id"] for c in gristapi.list_cols(tablename)[1]]
                continue
            rowdata = dict()
            for icol, coldata in enumerate(row):
                if coldata.startswith("<"):
                    coldata = md(coldata)
                rowdata[cols[icol]] = coldata
            to_load.append(rowdata)
            if i % 100 == 0:
                gristapi.add_records(tablename, to_load)
                to_load = []
