# Décision 0003 : utiliser django-tasks-db comme gestionnaire de tâches d’arrière-plan

Date : 2025-04-15

## Statut

Accepté

## Contexte

* L’application web de Aides Agri fonctionne en mode synchrone (WSGI, Python synchrone).
* Certaines actions déclenchées par les utilisatrices et utilisateurs depuis l'interface web demandent l'exécution d'une tâche dont la durée d'exécution est inconnue à l'avance, peut-être parce qu'elle dépend d'un appel réseau externe (par exemple, API pour envoyer des e-mails) ;
* Le besoin se fait donc ressentir d'un gestionnaire de tâche d'arrière-plan.

### État de l'art

Les solutions en Python avec intégration à Django ne manquent pas :
* [Celery](https://pypi.org/project/celery/) :
  * Avantages :
    * Largement utilisé, c'est la référence depuis de nombreuses années en la matière ;
    * Propose une brique d'observabilité branchée sur la base de données relationnelle gérée par Django, avec intégration à l'admin ;
  * Inconvénients :
    * Nécessite RabbitMQ ou Redis comme broker de messages, là où nous savons que nous n'aurons pas avant plusieurs années le volume de messages pour profiter des avantages de ces technologies ;
* [dramatiq-pg](https://pypi.org/project/dramatiq-pg/) :
  * Avantages :
    * Utilise nativement PostgreSQL comme broker de messages ;
      * S'appuie sur le protocole `LISTEN/NOTIFY` pour assurer de bonnes performances à la montée en charge ;
  * Inconvénients :
    * Pas d'intégration fluide à Django ;
    * Encore en version 0.x ;
* [procrastinate](https://pypi.org/project/procrastinate/) :
  * Avantages :
    * Utilise nativement PostgreSQL comme broker de messages ;
      * S'appuie sur le protocole `LISTEN/NOTIFY` pour assurer de bonnes performances à la montée en charge ;
    * S'intègre assez facilement avec Django ;
  * Inconvénients :
    * Après une tentative, problèmes pour la remontée de logs chez Scalingo ;
* [django-tasks](https://pypi.org/project/django-tasks/) :
  * Avantages :
    * Utilise nativement PostgreSQL comme broker de messages ;
    * S'intègre très facilement avec Django, est conçu pour ce framework et aucun autre ;
    * Fait l'objet d'un projet d'intégration native au sein de Django dans les versions futures ;
  * Inconvénients :
    * Est en version 0.x, avec une API très instable ;
    * Ne s'appuie pas (encore) sur le protocole `LISTEN/NOTIFY`.

## Décision

Aides Agri utilisera `django-tasks` et son broker de messages PostgreSQL pour ses tâches d'arrière-plan.

## Conséquences

### Positives

* Pas besoin d'une nouvelle brique d'infrastructure (PostgreSQL comme broker de messages) ;
* Facilité de branchement sur Django et avec Scalingo ;
* Solution tournée vers l'avenir.

### Négatives

* Demandera une certaine vigilance lors des mises à jour, avec très certainement des montées de versions douloureuses les premiers temps ;
* Technologie encore peu connue des éventuels futurs développeurs Aides Agri.
