# Récupération des logos des DDT(M) de tous les départements français

## Mode d’emploi

1. Installer les pré-requis :

   ```shell
   uv run playwright install firefox
   ```

2. Réaliser, à l’aide de Playwright, une capture d’écran du logo présent dans le pied de page de chacun de ces sites :

   ```shell
   uv run download_logo_prefets.py
   uv run download_logo_prefets_regions.py
   ```

3. Construire les logos complets en concaténant chaque logo de préfecture avec le logo DDT ou DDTM adéquat :

   ```shell
   ./merge_logos.sh
   ./merge_logos_draaf_dreal.sh
   ```

4. Ouvrir en SSH un container Scalingo sur lequel on uploade les logos pour pouvoir les associer

   ```shell
   zip -o data/logos.zip data/ddt*.png
   scalingo run --app=aides-agri-prod --file=data/logos.zip bash
   ```

   ```shell
   zip -o data/logos.zip data/dr*.png
   scalingo run --app=aides-agri-prod --file=data/logos.zip bash
   ```

5. Jouer le script de création des Organismes avec association des logos :

   ```shell
   unzip /tmp/uploads/logos.zip
   ./manage.py shell
   # Copier/coller du script create_organismes.py
   ```

6. Re-déployer l’application pour que les serveurs frontaux exposent les nouvelles images sur le web.
