import csv


depts = dict()
with open("data/data.csv") as f:
    reader = csv.reader(f)
    for row in reader:
        depts[row[0]] = row[1]

with open("data/carte.html", "w", encoding="utf-8") as f:
    f.write(
        f"""<!DOCTYPE html><html lang="fr">
<head>
  <meta charset="utf-8" />
  <title>Carte du déploiement de Aides Agri</title>
  <link rel="stylesheet" href="../../../.venv/lib/python3.14/site-packages/dsfr/static/dsfr/dist/dsfr.min.css">
  <link rel="stylesheet" href="../../../static/vendor/DSFRChart.css">
  <script type="module" src="../../../.venv/lib/python3.14/site-packages/dsfr/static/dsfr/dist/dsfr.module.min.js"></script>
  <script type="module" src="../../../static/vendor/DSFRChart.js"></script>
  <style>
    dl {{
      display: flex;
      flex-wrap: wrap;
    }}
    dt {{
      height: 20px;
      width: 10%;
      border-radius: 4px;
    }}
    dd {{
      width: 90%;
    }}
  </style>
  <script>
    document.onreadystatechange = () => {{
      if (document.readyState !== "complete") {{
        return
      }}
      setTimeout(() => {{
        const mapinfo = document.querySelector(".map_info")
        mapinfo.innerHTML = ""
        mapinfo.appendChild(document.querySelector("aside"))
      }}, 1000)
    }}
  </script>
</head>
<body>
  <div class="fr-container fr-py-6w">
    <h1>Carte du déploiement Aides Agri</h1>
    <div class="fr-grid-row">
      <div class="fr-col fr-col-9">
        <map-chart
            data='{str(depts).replace("'", '"')}'
            name='Progression du déploiement Aides Agri'
            level='dep'
            date='21/09/2026'
        ></map-chart>
        <aside>
          <h2 class="fr-h5">Légende</h2>
          <dl class="fr-text--sm">
            <dt style="background-color: #dbdaff"><span class="fr-sr-only">Couleur #dbdaff, valeur 0</span></dt>
            <dd>Déploiement non commencé</dd>
            <dt style="background-color: #a4a4d7"><span class="fr-sr-only">Couleur #a4a4d7, valeur 1</span></dt>
            <dd>Contacts pris en DRAAF pour solliciter les SEA des DDT</dd>
            <dt style="background-color: #6e6daf"><span class="fr-sr-only">Couleur #6e6daf, valeur 2</span></dt>
            <dd>Contacts pris avec les SEA des DDT</dd>
            <dt style="background-color: #373787"><span class="fr-sr-only">Couleur #373787, valeur 3</span></dt>
            <dd>Réponse des SEA</dd>
            <dt style="background-color: #00005f"><span class="fr-sr-only">Couleur #00005f, valeur 4</span></dt>
            <dd>Déploiement étendu au-delà des DDT, comme les CA et d’autres acteurs</dd>
          </dl>
        </aside>
      </div>
    </div>
  </div>
</body>
</html>"""
    )
