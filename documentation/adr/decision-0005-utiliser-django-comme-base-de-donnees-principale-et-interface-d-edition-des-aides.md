# Décision 0005 : utiliser Django comme base de données principale et comme interface d’édition des aides

Date : 2025-07-17

## Statut

Accepté

## Contexte

Aides Agri a besoin d’importer dans son système des aides depuis différents canaux, de les dédoublonner, puis de les enrichir afin de, finalement, les publier sur son site.

### Problématiques

* Import :
    * Depuis un fichier CSV au schéma libre ;
    * En consommant une API tierce, de manière régulière ;
    * En scrapant un site web, de manière régulière ;
    * Par un partenaire qui pousserait ses données dans une API ;
    * Par un partenaire qui saisirait des informations dans un formulaire ;
    * Via une saisie manuelle dans un formulaire ;
* Dédoublonnage :
    * Les doublons évidents doivent être automatiquement ignorés dès la phase d’import ;
    * Les doublons potentiels doivent être signalés pour vérification par l’équipe ;
* Enrichissement :
    * L’équipe doit pouvoir, manuellement, transformer certaines informations brutes : déplacement dans des champs dédiés, agrégation, transformation d’un texte brute en référence à une entité, classification, éditorialisation ;
    * Avoir et appliquer des règles éditoriales et de mise en forme ;
    * Traçabilité et historisation des modifications ;
    * Ajouter des images (schémas), tableaux, liens hypertexte [ça contribue au référencement] ;
    * Gestion de l’édition en même temps par plusieurs ;
* Publication :
    * On veut pouvoir publier et dépublier des nouvelles aides quotidiennement, voire plus fréquemment si besoin ;
    * Ne pas laisser en ligne des aides dont l’”URL descriptif” n’est plus valide ;
    * Correspondance entre le schéma de données et la présentation sur le site ;
    * Intégration d’un workflow de validation ;
    * Prévisualisation de la fiche avant publication ;
    * Contrôle technique avant publication qui permet d’identifier le niveau de qualité pour la publication et ou/ optimisation de la fiche pour les moteurs de recherche ;
* Mise à jour :
    * Si une aide est modifiée à la source, nous devons être en mesure de l’identifier et d’appliquer les modifications à notre version enrichie et publiée ;
    * Application de règles de mises à jour et de contrôle ;
* Pilotage :
    * Vues statistiques sur l’état de la base de données ;
* Qualité / robustesse :
    * La base de données contenant les aides est le bien le plus précieux de la start-up Aides Agri ; elle doit être sauvegardée régulièrement ;
    * La gestion des changements de schéma doivent être maîtrisés ;
    * Ouverture des données et coopération interministérielle.

### Analyse de l’existant, à savoir Grist

* Import :
    * CSV format libre : 🤸 très facile de créer une table bac-à-sable ad-hoc ;
    * API tierce ou scraping : ❌ pas de solution pour l’instant car :
        * Inenvisageable d’importer une nouvelle table par source de données et par jour dans le document de travail principal ; ça ferait trop de tables, trop de vues, etc. ;
        * Mais impossible de travailler à l’intégration et l’enrichissement manuels des aides importées automatiquement si on est dans deux documents Grist différents ; c’est pour ça que j’ai pour l’instant fait des exports/imports manuels de tables d’import vers des tables d’intégration, mais ce processus n’est pas viable ;
    * API et/ou formulaire pour les partenaires : 👍 possible de créer un formulaire exposé à l’externe ou un endpoint d’API qui viendrait insérer dans une table bac-à-sable dédiée au partenaire ;
* Dédoublonnage :
    * Automatique : pas de solution car pas encore de solution pour l’import automatisé ;
    * Manuel : possible de créer des champs qui identifient une aide telle qu’elle était lors de son import ;
* Enrichissement :
    * Édition : 🤔 beaucoup de choses semblent possibles, mais on n’a pas encore la bonne structure, et elle pourrait nécessiter pas mal de vues différentes, et on rencontre les difficultés suivantes :
        * Très facile de casser la structure (renommage de champ, rupture de relation entre entités) et d’avoir des données corrompues (texte brut dans un champ de relation, etc.) ;
        * Pas de possibilité de partager ou mettre en favori une URL d’une vue filtrée ; il faut créer une nouvelle vue à chaque fois qu’on veut un filtre spécifique qu’on veut partager, ou être condamné à travailler sur des écrans ayant des dizaines d’aides non pertinentes, avec pour conséquence des ralentissements techniques de l’interface et du temps passé à scroller dans toutes les directions ;
    * Conflits d’édition : 🚣 l’édition est collaborative en temps réel, mais de manière invisible, du coup parfois on a des résultats étonnants où on n’est pas sûr de quelles sont les données qui sont réellement enregistrées ;
    * Historisation : c’est un peu obscur, et c’est très difficile de récupérer une ancienne version ;
* Publication :
    * Publication régulière : 🚧 facile de publier, mais dépublication encore à réfléchir, même si clairement il n’y a pas de point de blocage, juste plein de manières différentes d’aborder la question ;
    * Dépublication des aides ayant une URL invalide : géré côté Site ;
* Viabilité :
    * Sauvegardes : 👍 les données sont sauvegardées régulièrement et on peut retourner voir une ancienne version ; ceci dit on n’est pas sûr de savoir restaurer un point de sauvegarde de manière fiable ;
    * Fiabilité des évolutions du schéma : 👎 c’est l’un des points noirs de l’architecture actuelle :
        * Nécessite de maintenir autant de bases de données que d’environnements de déploiement du site, afin de ne pas casser les routines de communication Site ↔ Base (ce qu’on n’a pas aujourd’hui, donc toute évolution du schéma, qui comme on l’a dit plus tôt, est très facile, oblige à déployer une nouvelle version du code du Site pour tous les environnements, sous peine de panne majeure du Site) ;
        * Nécessite de maintenir une documentation manuelle sur les champs, les règles de gestion, les formules, etc. À moins d’avoir une routine d’extraction du code source de chacune des tables qu’on exporterait dans Notion ;
    * Ouverture des données et coopération inter-ministérielle : 👍 tout est possible de ce point de vue-là, moyennant un peu de configuration ; pas de testablilité par contre ;

### Étude de la solution utilisée par Aides Territoires

* Tout est dans la base de données du site ;
* Tout se fait dans l’interface d’admin du site.

### Étude de la solution utilisée par Transition Écologique des Entreprises

* Outils :
    * Base de données : Baserow, équivalent Airtable/Grist ; remarques :
        * Schéma plutôt stable car la SE est assez mûre ;
        * Alternance rapide entre la vue liste et la vue formulaire appréciée des éditeurs ;
    * Chargement des aides dans le site : un script exécuté quotidiennement via Github Workflows qui prend les aides sur l’API Baserow et les mets chacune dans un fichier plat stocké avec le code du site ;
    * Intégration de nouvelles aides : entièrement à la main dans Baserow ;
* Workflow :
    1. Intégration de nouvelles aides : totalement manuelle et unitaire, “principalement via des retours de partenaires qui souhaitent voir telle ou telle aide sur notre site” ;
    2. Édition des aides : 1 personne dont c’est la mission principale au sein de la SE (environ à mi-temps) + 3 personnes qui peuvent lui prêter main forte (en moyenne sur l’année on peut tabler sur 0.75 ETP donc) ;
* L’avenir :
    * Viser l’exhaustivité, mais ça reste à l’état de projet ; la problématique étudiée en ce moment c’est l’éditorialisation de masse en utilisant le LLM Albert en lui donnant des guides d’écriture spécifiques à chaque champ en se basant sur les lignes existantes.

## Décision

Aides Agri utilisera désormais la base de données PostgreSQL gérée par Django comme source de vérité pour les aides et toutes les données qui leur sont liées.

L’interface d’administration de Django sera utilisée et adaptée au flux de travail autour de l’édition des aides :
* Tableau de bord du processus de priorisation, triage et édition des aides ;
* Éditeur de texte riche au format Markdown ;

## Conséquences

### Positives

* Plus besoin d’un système de synchronisation de Grist vers Django ;
* L’interface d’édition des aides sera plus conviviale ;
* Garantie d’intégrité des données grâce à la base de données relationnelle.

### Négatives

* Toute évolution du schéma des données nécessite une évolution technique du produit.
