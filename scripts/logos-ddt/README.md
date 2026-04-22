# Récupération des logos des DDT(M) de tous les départements français

## Mode d’emploi

1. Générer une liste des URLs des sites des préfectures à partir des départements présents dans la base de données Aides Agri :
   ```python
   import csv

   from django.utils.text import slugify
   
   from aides.models import ZoneGeographique
   
   with open("data/urls.csv", "w") as f:
       writer = csv.writer(f)
       for dept in ZoneGeographique.objects.departements():
           writer.writerow([dept.code, f"https://www.{slugify(dept.nom)}.gouv.fr"])

   ``` 

2. Installer les pré-requis :

   ```shell
   uv run playwright install firefox
   ```

3. Réaliser, à l’aide de Playwright, une capture d’écran du logo présent dans le pied de page de chacun de ces sites :

   ```shell
   uv run download_logo_prefets.py
   ```

4. Construire les logos complets en concaténant chaque logo de préfecture avec le logo DDT ou DDTM adéquat :

   ```shell
   ./merge_logos.sh
   ```

5. Ouvrir en SSH un container Scalingo sur lequel on uploade les logos pour pouvoir les associer

   ```shell
   zip -o data/logos.zip data/ddt*.png
   scalingo run --app=aides-agri-prod --file=data/logos.zip bash
   ```

6. Jouer le script de création des Organismes avec association des logos :

   ```shell
   unzip /tmp/uploads/logos.zip
   ./manage.py shell
   # Copier/coller du script create_organismes.py
   ```

7. Re-déployer l’application pour que les serveurs frontaux exposent les nouvelles images sur le web.
