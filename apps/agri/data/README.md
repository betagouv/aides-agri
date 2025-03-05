# Fichiers statiques de données

## Mapping des codes NAF avec les noms des activités

- Source : https://www.data.gouv.fr/fr/datasets/nomenclature-dactivites-francaise-naf/
  - Lien "Télécharger les fichiers de la NAF en vigueur" (https://www.insee.fr/fr/information/2120875 au 2025-02-19)
  - Lien "Libellés longs, courts et abrégés de tous les postes" (https://www.insee.fr/fr/statistiques/fichier/2120875/int_courts_naf_rev_2.xls au 2025-02-19)
- Transformations apportées :
  - Export de XLS vers CSV
  - Suppression de la première colonne
  - Suppression des lignes vides ou non signifiantes (`SECTION quelque chose`)
- Utilisation : le fichier est lu lors de la phase de démarrage du projet Django et monté en mémoire sous la forme d'un dictionnaire qui pourra être interrogé facilement et rapidement

## Mapping des tranches d'effectif salarié

- Source : https://sirene.fr/static-resources/htm/v_sommaire_311.htm#27
- Transformations apportées :
  - Mise au format CSV
  - Simplification des libellés
- Utilisation : le fichier est lu lors de la phase de démarrage du projet Django et monté en mémoire sous la forme d'un dictionnaire qui pourra être interrogé facilement et rapidement

## Mapping des catégories juridiques d'entreprises

- Source : https://www.insee.fr/fr/information/2028129
- Transformations apportées :
  - Mise au format CSV
- Utilisation : le fichier est lu lors de la phase de démarrage du projet Django et monté en mémoire sous la forme d'un dictionnaire qui pourra être interrogé facilement et rapidement
