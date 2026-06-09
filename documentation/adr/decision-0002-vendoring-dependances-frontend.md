# Décision 0002 : vendorer les dépendances "_front-end_"

Date : 2025-01-20

## Statut

Accepté

## Contexte

Comme décidé dans [la décision 0001](decision-0001-django-templating.md), ce produit verra ses pages web générées côté serveur par des templates Django.

L’une des conséquences positives de cette décision est le faible nombre de dépendances Javascript. Mais il y en a quand même, au nombre de 4 _a minima_ :
* Un mini-framework Javascript pour gérer les interactions purement côté client ;
* Une bibliothèque Javascript pour gérer les interactions côté client qui déclenchent une requête au serveur et viennent modifier une partie de la page web ;
* Le DSK Sentry parce que c’est l’outil de monitoring des erreurs proposé par la DINUM ;
* Le SDK Matomo parce que c’est l’outil de suivi de l’usage proposé par la DINUM.

### État de l’art

La plupart des sites web générant leurs pages côté serveur utilisent l’une des deux stratégies opposées suivantes :
* Déclarer les dépendances Javascript dans un `package.json`, verrouiller leurs versions dans un `package-lock.json`, les installer via `npm install` dans un répertoire `node_modules/`, et constuire un _bundle_ en compilant, via Webpack ou Vite, un fichier JS qui réalise des `import` des bibliothèques :
  * Avantages :
    * Les dépendances sont listées de manière claire ;
    * Un outil de mise à jour automatisée des dépendances peut maintenir la pile technique à niveau à moindre coût et sans charge mentale.
  * Inconvénients :
    * Le processus de construction du _bundle_, réalisé en CI/CD, est effectué même si les dépendances n’ont pas changé et oblige à sortir des sentiers battus (par exemple, pour un déploiement chez Scalingo, deux `buildpacks` sont nécessaires : un pour l’application serveur, l’autre pour le `bundle` client).
* Injecter les dépendances Javascript pré-compilées via un CDN :
  * Avantages :
    * Pas de phase de construction.
  * Inconvénients :
    * Oblige à assouplir la CSP pour y inclure des exceptions concernant les CDN ;
    * Rend dépendant des CDN et donc de leurs performances et résilience ;
    * Disperse les dépendances Javascript dans la codebase et rend donc plus difficile leur bonne compréhension et leur maintien à jour.

## Décision

Les dépendances Javascript seront listées dans `package.json` et verrouillées dans `package-lock.json`.

Puis les fichiers nécessaires au fonctionnement du produit seront **copiés** et enregistrés (au sens SCM du terme, _versionnés_ donc) dans ce dépôt, dans le répertoire dédié `static/vendor`. Cela pourra être fait de deux manières :
* Pour les dépendances fournissant un _bundle_ pré-compilé, ce _bundle_ pourra être copié directement ;
* Pour les autres, un mini-script de construction, basé sur `esbuild`, sera exécuté pour construire le _bundle_ afin de le placé dans le même répertoire que les autres.

Cette opération sera réalisée seulement lors de l’ajout d’une nouvelle dépendance Javascript ou lors d’une mise à jour.

À l’idéal cette opération sera réalisée automatiquement en CI.

## Conséquences

### Positives

* Les dépendances seront clairement identifiées et centralisées ;
* Les dépendances pourront être mises à jour automatiquement par, par exemple, Dependabot ;
* Aucune étape de construction spécifique n’est nécessaire au moment du déploiement ;
* Les fichiers CSS et JS sont chargés depuis le domaine de l’application, ce qui facilite la mise en œuvre d’une CSP stricte.

### Négatives

* Cette stratégie étant peu commune, elle nécessite une petite courbe d’apprentissage.
