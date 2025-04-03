import csv
import datetime

import requests

from ._common import load_into_grist

dataname = f"aides-entreprises-{datetime.date.today().isoformat()}"
filename = f"/tmp/{dataname}"
tablename = f"load-{dataname}".replace("-", "_").capitalize()


def scrape():
    with open(f"{filename}.csv", "bw") as f:
        r = requests.get("https://data.aides-entreprises.fr/files/aides.csv")
        f.write(r.content)
    with open(f"{filename}.csv", encoding="windows-1252") as f:
        reader = csv.reader(f)
        for row in reader:
            print(row)
