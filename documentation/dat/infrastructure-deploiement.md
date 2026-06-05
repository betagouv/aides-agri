# Aides Agri – Infrastructure et déploiement

## Diagramme d’infrastructure haut niveau

```mermaid
architecture-beta
    group scalingo(cloud)[Scalingo]

    service web(server)[Web] in scalingo
    service worker(server)[Worker] in scalingo
    service db(database)[PostgreSQL] in scalingo

    db:R <-- L:web
    db:T <-- L:worker
```

Dans ce diagramme :
* Le service `web` se matérialise par ;
  * Un nombre variable de containers Docker gérés par l’offre PaaS de Scalingo
    * Ce nombre varie entre 2 (pour assurer une redondance permanente) et 10 (maximum possible) ;
    * Ce nombre est géré par le système d’autoscaling de Scalingo ([documentation en anglais](https://doc.scalingo.com/platform/app/scaling/scalingo-autoscaler)) ;
  * Sur chaque container s’exécute la pile technique web décrite ci-dessous ;
* Le service `worker` se matérialise par un unique container Docker ;
* Le service `db` se matérialise par un service managé par Scalingo (qui peut être un nœud unique ou un cluster redondé).

## Services externes

### Envoi d’e-mail : Brevo

* Description : Service d’e-mailing hébergé en France ;
* Utilisation par Aides Agri : envoi d’e-mails transactionnels ;
* Mode d’interaction : API HTTPS.

### Suivi de l’usage du site : instance Matomo de la DINUM

* Description : logiciel open-source de suivi de l’usage d’une application web, hébergé par la DINUM sur https://stats.beta.gouv.fr/ ;
* Utilisation par Aides Agri : suivi de l’usage du site web côté client ;
* Mode d’interaction : API HTTPS.

### Monitoring technique : instance Sentry de la DINUM

* Description : logiciel open-source de télémétrie d’application web, hébergé par la DINUM sur https://sentry.incubateur.net/ ;
* Utilisation par Aides Agri : centralisation des erreurs côté serveur et côté client ;
* Mode d’interaction : API HTTPS.

## Diagramme de flux

```mermaid
flowchart TB
    webclient@{label: "Client web (navigateur, client API...)"}
    subgraph Scalingo
        subgraph web
            scalingo-public-router@{shape: stadium, label: "Scalingo public router"}-- HTTP -->gunicorn
            gunicorn@{shape: processes, label: "Gunicorn"}-- WSGI -->django-web@{shape: subproc, label: "Django"}
        end
        subgraph worker
            django-worker
        end
        db@{ shape: cyl, label: "PostgreSQL" }
        django-web-- TCP -->db
        django-worker@{shape: processes, label: "Django Worker"}-- TCP -->db
    end
    subgraph DINUM
        sentry-web@{shape: stadium}
        sentry-worker@{shape: stadium}
        sentry-ui@{shape: stadium}
        matomo@{shape: stadium}
    end
    subgraph Brevo
        brevo-api@{shape: stadium, label: "API Brevo"}
    end
    webclient-- HTTPS -->web
    webclient-- HTTPS -->sentry-ui
    webclient-- HTTPS -->matomo
    django-web-- HTTPS -->sentry-web
    django-worker-- HTTPS -->sentry-worker
    django-worker-- HTTPS -->brevo-api
```

Dans ce diagramme :
* La brique "Scalingo Public Router" s’occupe à la fois de la terminaison TLS et du load-balancing vers les différents containers sur lesquels s’exécute Gunicorn (voir [sa documentation (en anglais)](https://doc.scalingo.com/platform/networking/public/overview)) ;
  * Cela signifie que les informations transmises à la brique web circulent, une fois passé ce routeur public, en clair ;
* La brique "worker" consiste en un processus qui tourne en tâche de fond, sans interface utilisateur, et qui collecte des tâches à traiter stockées dans la base de données.

## Réglages possibles impactant les performances de l’application web

Plusieurs paramètres peuvent influer sur les performances (temps de latence, temps de réponse) de l’application web. Ils sont tous réglables sans modification du code de l’application, soit via des variables d’environnement soit via des opérations Scalingo ;

| Brique concernée         | Variable                                                                                                                                                              | Comment l’activer                                                   | Valeur par défaut                                                                                              | Valeur nominale pour Aides Agri                                                                                   |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| Scalingo ; containers    | Quelle taille (vCPU/mémoire) ? ([voir la documentation (en anglais)](https://doc.scalingo.com/platform/internals/container-sizes)                                     | Via l’interface ou l’API Scalingo                                   | M                                                                                                              | M                                                                                                                 |                                                                                         |
| Scalingo ; load-balancer | Combien de containers ?                                                                                                                                               | Scaling manuel ou auto-scaling via l’interface ou l’API de Scalingo | 1                                                                                                              | <ul><li>Minimum ; 2</li><li>Métrique ; nombre de requêtes par minute par container</li><li>Valeur ; 200</li></ul> |
| Gunicorn                 | Combien de workers ? ([Voir la documentation Gunicorn (en anglais)](https://gunicorn.org/design/#scaling))                                                            | Variable d’environnement `WEB_CONCURRENCY`                          | [Voir la documentation Scalingo (en anglais)](https://doc.scalingo.com/languages/python/start#web_concurrency) | 3                                                                                                                 |
| Gunicorn                 | Combien de requêtes traitées par chaque worker avant restart ? ([Voir la documentation Gunicorn (en anglais)](https://gunicorn.org/reference/settings/#max_requests)) | Variable d’environnement `GUNICORN_MAX_REQUESTS`                                                                                                               | 0 (les workers ne redémarrent jamais, ce qui peut induire une inflation de la mémoire)                         | 300 ± 10%                                                                                                         |
| Django                   | Combien de temps maintenir les connexions PostgreSQL ouvertes ? ([Voir la documentation Django](https://docs.djangoproject.com/en/5.2/ref/databases/#persistent-database-connections))                                                                    | Variable d’environnement `DB_CONN_MAX_AGE`                                                                                                               | 0 (chaque requête ouvre et ferme sa connexion, ce qui peut induire des latences)                               | 86400s (1 jour)                                                                                                   |

Au vu du nombre de paramètres, l’équilibre peut être délicat à trouver, et il faut surveiller attentivement les différentes métriques affichées dans la console Scalingo ; CPU des containers, mémoire des containers, nombre de connexions ouvertes sur PostgreSQL.

## Procédure de déploiement

Une procédure automatique de déploiement [est configurée via un workflow GitHub](../../.github/workflows/cd.yml) pour déployer la branche `main` à la publication d’une [_release_](https://github.com/betagouv/aides-agri/releases/).

La procédure de déploiement ne fait l’objet d’aucune spécificité, elle utilise le buildpack Scalingo standard pour les applications Python et exécute simplement les processus définis dans [le fichier `Procfile`](../../Procfile).

Scalingo étant un PaaS, le déploiement est fiabilisé via une procédure _blue/green_, c’est-à-dire que les containers de l’ancienne version du code continuent de tourner tant que la procédure de déploiement de la nouvelle version n’est pas terminée et validée.
