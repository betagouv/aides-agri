# Aides Agri – Sécurisation du service

Cette documentation décrit les dispositifs de sécurisation du service ayant leur place au sein de la base de code.

## Dépendances logicielles

### Politique de sélection des dépendances

Les dépendances logicielles sont choisies selon les critères suivants :
* Viabilité ;
* Simplicité (notamment éviter les dépendances ajoutant des briques d’infrastructure) ;
* Valeur ajoutée par rapport à un développement spécifique.

### Politique de déclaration des dépendances

* Elles doivent être définies de manière centralisée par système de paquets :
  * Pour Python (installation depuis https://pypi.org/), le fichier [pyproject.toml](../../pyproject.toml) ;
  * Pour Javascript, qui peut inclure du CSS (installation depuis https://www.npmjs.com/), le fichier [package.json](../../package.json) ;
* Leurs numéros de versions doivent être spécifiés par la compatibilité :
  * Pour Python, l'opérateur `~=X.Y` ;
  * Pour Javascript, l'opérateur `^X` ;
* Elles doivent faire l'objet d'un verrouillage afin que pour une version Git donnée, quel que soit le moment de l'installation, les versions précises des paquets soient connues :
  * Pour Python c'est le gestionnaire de paquets [uv](https://docs.astral.sh/uv/) qui s'en charge via la commande `uv lock` qui stocke les versions précises dans le fichier [uv.lock](../../uv.lock) ;
  * Pour Javascript c'est le gestionnaire de paquets [npm](https://www.npmjs.com/) qui s'en charge via la commande `npm install` qui  stocke les versions précises dans le fichier [package-lock.json](../../package-lock.json) ;

### Politique de mise à jour des dépendances

* Elles font l'objet d'une surveillance des vulnérabilités connues par le service [Dependabot Vulnerabilities](https://github.com/betagouv/aides-agri/security/dependabot) mis à disposition par GitHub, qui peut :
  * Alerter à propos d'une vulnérabilité dans une dépendance ;
  * Ouvrir une _pull request_ proposant la mise à jour qui permet de corriger la vulnérabilité ;
* Elles font l'objet d'un mécanisme de mises à jour automatiques par le service [Dependabot version updates (en anglais)](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-version-updates) mis à disposition par GitHub :
  * Avec une politique de temporisation à 7 jours suivant la publication des mises à jour, afin de mitiger les risques d'attaques de supply-chain ;
  * Pour le cas des dépendances Python, pour lesquelles Dependabot ne parvient pas toujours à détecter les mises à jour, [un script Bash spécifique](../../scripts/upgrade-python-deps.sh) a été implémenté et peut être exécuté en local afin de s'y substituer.

## Le framework Django

### Côté serveur

Suivant [les recommandations OWASP (en anglais)](https://cheatsheetseries.owasp.org/cheatsheets/Django_Security_Cheat_Sheet.html), les dispositions suivantes ont été prises :
* Les configurations Django sont séparées en plusieurs points d'entrée :
  * La configuration de déploiement chez l'hébergeur Scalingo est isolée dans [un fichier dédié](../../conf/settings/scalingo.py) ;
  * La configuration de développement (sensible car elle utilise le mode DEBUG) est isolée dans [un fichier dédié](../../conf/settings/devel.py) ;
* La configuration par défaut nécessite `DEBUG = False` l'externalisation en variables d'environnement des jetons de sécurité sensibles (`SECRET_KEY` notamment, les informations de connexion à la base de données également) ;
* La configuration pour déploiement chez Scalingo embarque un certain nombre de durcissements des réglages de sécurité sont appliqués.

### Pour le web

Une stratégie de sécurité des contenus ([CSP, Content Security Policy (en anglais)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) stricte est mise en œuvre :
* Grâce à la dépendance logicielle [django-csp](https://pypi.org/project/django-csp/) ;
* Définie dans [un fichier de réglages dédié](../../conf/settings/apps/csp.py) ;
* Politique par défaut :
  * Seul le domaine local a le droit d'injecter du Javascript, du CSS, des polices et des images sur le site ;
  * Les balises `<script>` et `<style>` dans le HTML sont autorisées si elles portent un [nonce (en anglais)](https://developer.mozilla.org/en-US/docs/Glossary/Nonce) qui permet de s'assurer qu'elles n'ont pas été injectées à la volée dans le DOM ;
  * Le code Javascript et CSS _inline_ (injecté via les attributs `on*` et `style` est interdit) ;
* Quelques dérogations sont appliquées (principalement pour des services externes comme Matomo ou Sentry, cf le diagramme de flux de [la documentation d'infrastructure](infrastructure-deploiement.md)), et toujours justifiées par un commentaire directement dans le code.

### L'authentification

#### Pour le site web

Aucune fonctionnalité ne requiert d'authentification.

#### Pour l'interface d'administration (le "back-office")

* Le système d'authentification (par nom d'utilisateur et mot de passe) de Django est utilisé :
  * Les contraintes de mots de passe les plus usuelles sont activées ;
  * Les mots de passe sont stockés hashés selon les standards Django de 2025 ;
* Django gère nativement des permissions CRUD par type d'objet manipulé ;
* Un seul utilisateur (le développeur de l'équipe) a les pleins pouvoirs ;
  * Et un autre utilisateur (l'intrapreneur de l'équipe) a la permission de définir les permissions des autres utilisateur ; 
* Aucune permission n'est assignée directement à un utilisateur, le système de groupes, natif à Django, est utilisé ;
* Une authentification à deux facteurs (2FA, MFA) est mise en œuvre grâce à la dépendance Python [django-two-factor-auth](https://pypi.org/project/django-two-factor-auth/) (qui, elle même, s'appuie sur [django-otp](https://pypi.org/project/django-otp/)) :
  * Une [surcharge locale du site d'administration de Django](../../conf/admin.py) permet de s'assurer que l'usage du 2FA est bien forcé pour accéder à l'interface d'administration ;
* Un système de surveillance des tentatives d'authentification échouées a été mis en œuvre :
  * Via la dépendance [django-axes](https://pypi.org/project/django-axes) ;
  * En désactivant, [comme recommandé dans la documentation pour les sites soumis au RGPD (en anglais)](https://django-axes.readthedocs.io/en/latest/3_usage.html#data-privacy-and-gdpr), le traçage et le stockage des adresses IP sources de tentatives d'authentification.

## Politique liée à la découverte de vulnérabilités

* Un fichier [SECURITY.md](../../SECURITY.md) existe à la racine du dépôt Git ;
* Surtout, conformément au standard [security.txt](https://securitytxt.org/), [un fichier security.txt](https://aides-agri.beta.gouv.fr/.well-known/security.txt) existe sur le site web :
  * Il définit comment joindre l'équipe en cas de découverte de vulnérabilité ;
  * Il garantit son authenticité et son intégrité par signature PGP ;

## Pratiques de développement

* La base de code est hébergée [sur GitHub](https://github.com/betagouv/aides-agri/), avec :
  * La branche `main` verrouillée en écriture, sans dérogation possible ;
  * La nécessité de signer les commits pour pouvoir intégrer un commit sur la branche `main` ;
  * La surveillance CodeQL activée.
