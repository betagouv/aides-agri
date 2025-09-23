# Ce script génère un fichier CSV prêt à être importé dans l'outil d'édition des aides,
# à partir d'un fichier Markdown lui-même généré depuis le PDF,
# mais aussi à partir d'autres fichiers CSV.
#
# Il nécessite d’avoir :
# * Une traduction Markdown du gros PDF du PSN, avec les titres des dispositifs en titre de niveau 2 ;
import argparse
import csv

from markdown_parser import MarkdownTree

parser = argparse.ArgumentParser()
parser.add_argument('filename')
args = parser.parse_args()

filename = args.filename
output_filename = "output/" + filename.split(".")[0] + ".csv"

doc = ""
with open(filename) as f:
    doc = f.read()

tree = MarkdownTree()
tree.parse(doc)

rows = []
fieldnames = ["Code", "Nom"]
for h1 in tree.root.children:
    code, nom = h1.title.split(" ", maxsplit=1)
    row = {"Code": code.strip(), "Nom": nom.strip()}
    for h2 in h1.children:
        title = h2.title.strip()
        if title not in fieldnames:
            fieldnames.append(title)
        row[title] = "".join([c.strip() for c in h2.content])
    rows.append(row)


with open(output_filename, "w") as f:
    writer = csv.DictWriter(f, fieldnames=list(fieldnames))
    writer.writeheader()
    for row in rows:
        writer.writerow(row)
