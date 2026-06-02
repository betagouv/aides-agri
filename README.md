# Aides Agri [![Dependabot](https://github.com/betagouv/aides-agri/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/betagouv/aides-agri/actions/workflows/dependabot/dependabot-updates) [![CodeQL](https://github.com/betagouv/aides-agri/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/betagouv/aides-agri/actions/workflows/github-code-scanning/codeql) [![codecov](https://codecov.io/github/betagouv/aides-agri/graph/badge.svg?token=xjak0wulP0)](https://codecov.io/github/betagouv/aides-agri)

Base de code du service public numérique [Aides Agri](https://beta.gouv.fr/startups/plateforme-agriculteurs.html).

[<img src="https://github.com/incubateur-agriculture/.github/blob/main/logo-la-ruche-masa.jpg" width="400">](https://incubateur-agriculture.beta.gouv.fr/)

## 🚜 Description fonctionnelle

Cette base de code gère un catalogue des dispositifs d’aide publics destinés aux exploitations agricoles françaises. Elle propose deux interfaces utilisateurs :
* Un outil d’administration et d’édition des aides par l’équipe Aides Agri ;
* Un parcours usager pour aiguiller les exploitantes et exploitants agricoles vers des dispositifs adaptés à leur situation et à leur besoin.

## 📗 Documentation technique

La documentation technique est centralisée dans le répertoire `/documentation/` et contient :
* Un Dossier d’Architecture Technique pour un instantané de ce qu’il faut savoir sur ce système dans le répertoire [`/documentation/dat/`](documentation/dat/) ;
* Un journal des décisions d’architecture technique (ADR) dans le répertoire [`/documentation/adr/`](documentation/adr/).

## 🤓 Travailler sur ce produit

### Pré-requis

La présence des outils suivants est requise sur le système :
* [uv](https://docs.astral.sh/uv/) pour gérer les dépendances Python ;
* [just](https://just.systems/) pour exécuter les commandes disponibles en profitant de l’environnement virtuel de uv et des variables d’environnement présentes dans le fichier `.env` ;
* [Docker](https://docs.docker.com/engine/install/) pour avoir un PostgreSQL indépendant du système.

### Installation

1. Installer les dépendances Python
  ```shell
  just install
  ```

#### Le fichier `.env`

Pour démarrer, très peu de variables d’environnement sont requises. Un fichier `.env.example` est fourni, prêt à être dupliqué en `.env`, dans lequel il faut modifier deux valeurs.

### Lancement du site

1. Lancer PostgreSQL
  ```shell
  docker compose up
  ```
2. S’assurer que le schéma de la base est à jour
  ```shell
  just migrate
  ```
3. Lancer le site
  ```shell
  just runserver
  ```

#### Au premier lancement

1. Peupler la configuration DSFR
   ```shell
   just manage loaddump dsfr_config
   ```
2. Créer un super-utilisateur
   ```shell
   just manage createsuperuser
   ```

### Commandes `just` disponibles

#### Pour Django

* Commande générique pour accéder au manage.py de Django avec les bonnes variables d’environnement et l’environnement virtuel uv activé :
  ```shell
  just manage COMMAND
  ```
* Les raccourcis suivants sont disponibles :
  * `just runserver` ;
  * `just shell` ;
  * `just makemigrations` ;
  * `just migrate` ;
  * `just test`.

#### Pour Scalingo

* `just scalingo-ssh {ENVIRONNEMENT}` permet d’atterrir en SSH sur un nouveau conteneur clone du conteneur `web` ;
* `just scalingo-django-shell {ENVIRONNEMENT}` permet d’atterrir en shell Django sur un nouveau conteneur clone du conteneur `web` ;
* `just scalingo-django-command {ENVIRONNEMENT} {COMMANDE}` permet de lancer une commande Django sur un nouveau conteneur clone du conteneur `web`.

### Le flux de travail

* La branche `main` est bloquée, chaque évolution doit se faire sur une branche et faire l’objet d’une PR ;
* Chaque PR doit porter dans sa description un lien vers la raison pour laquelle l’évolution du code est nécessaire (Notion en cas de nouvelle fonctionnalité ou feedback, Sentry en cas de crash applicatif) ;
* Chaque évolution de code doit venir avec ses tests ; les tests fonctionnels sont à privilégier, et l’approche TDD est encouragée en cas de correction de bug ;
* La branche `main` est déployée sur l’environnement `dev` à chaque merge ;
* Les autres environnements font l’objet de déploiements déclenchés manuellement via l’interface de Scalingo.

## Acknowledgements

This project is tested with BrowserStack.
