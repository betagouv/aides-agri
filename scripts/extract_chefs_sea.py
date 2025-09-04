import argparse
import csv

# Ce script génère un CSV prêt à être importé dans le CRM Notion, à partir d'un fichier Excel fourni à la main par les services du MASA.
#
# Il nécessite d’avoir :
# * Un export CSV Notion de la base de départements (https://www.notion.so/incubateur-masa/254de24614be80f8ab62fe3170a88437?v=254de24614be80399f2c000cfe092813).
# * Rangé ce fichier dans ./data/chefs-sea/departements.csv
# * Un export CSV Notion de la base des DDT (https://www.notion.so/incubateur-masa/18ade24614be815eb432fdd71dd5d16a?v=264de24614be80b8a829000cb640df3b).
# * Rangé ce fichier dans ./data/chefs-sea/ddts.csv
# * Exporté le fichier XLSX fourni au format CSV
# * Rangé ce fichier dans ./data/chefs-sea/YYYYMMDD-input.csv
#
# Il se lance de la manière suivante :
# ```
# cd scripts
# uv run extract_chefs_sea.py {YYYYMMDD}
# ```

departements = dict()
with open("data/chefs-sea/departements.csv") as f:
    reader = csv.reader(f)
    for row in reader:
        departements[row[0]] = (f"{row[0]} {row[1]}", row[2])

ddts = dict()
with open("data/chefs-sea/ddts.csv") as f:
    reader = csv.reader(f)
    for row in reader:
        ddts[row[0]] = (row[1], row[2])

parser = argparse.ArgumentParser()
parser.add_argument("datestamp")

args = parser.parse_args()

datestamp = args.datestamp

contacts = []
with open(f"data/chefs-sea/{datestamp}-input.csv") as f:
    reader = csv.reader(f)
    for row in reader:
        if row[0] in ("", "N°", "NN", "Légende"):
            continue
        departement = row[0].zfill(2)
        for col in (2, 3, 4):
            email = row[col].split(" ")[0].strip()
            if email in ("", "NN"):
                continue
            nom = " ".join(
                [
                    "-".join(
                        [word.capitalize() for word in part.split("-")]
                    )
                    for part in email.split("@")[0].split(".")
                 ]
            )
            adjoint = col > 2
            contacts.append([nom, email, departement, adjoint])

with open(f"data/{datestamp}-output.csv", "w") as f:
    writer = csv.writer(f)
    writer.writerow(["Nom", "Email", "Nom Organisation", "Poste / Fonction", "Numéro et nom Département", "Source de contact"])
    for contact in contacts:
        try:
            writer.writerow([
                contact[0],
                contact[1],
                ddts[contact[2]][0],
                "Chef(fe)-adjoint(e) de SEA" if contact[3] else "Chef(fe) de SEA",
                departements[contact[2]][0],
            ])
        except KeyError:
            print(f"DDT non trouvée pour le département {contact[2]}")
