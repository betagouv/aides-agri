import csv


depts = dict()
with open("data/data.csv") as f:
    reader = csv.reader(f)
    for row in reader:
        depts[row[0]] = row[1]

with open("data/carte.html", "w", encoding="utf-8") as f:
    f.write(
        f"""<!DOCTYPE html><html>
        <head>
        <meta charset="utf-8" />
        <title>Carte du déploiement de Aides Agri</title>
        <link rel="stylesheet" href="../../../.venv/lib/python3.14/site-packages/dsfr/static/dsfr/dist/dsfr.min.css">
        <link rel="stylesheet" href="../../../static/vendor/DSFRChart.css">
        <script type="module" src="../../../.venv/lib/python3.14/site-packages/dsfr/static/dsfr/dist/dsfr.module.min.js"></script>
        <script type="module" src="../../../static/vendor/DSFRChart.js"></script>
        </head>
        <body>
          <div class="fr-container">
            <map-chart
                data='{str(depts).replace("'", '"')}'
                value='10'
                name='Nom de l’indicateur'
                level='dep'
                date='11/02/2025'
            ></map-chart>
          </div>
        </body>
        </html>"""
    )
