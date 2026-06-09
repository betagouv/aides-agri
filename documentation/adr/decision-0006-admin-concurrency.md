# Décision 0006 : implémenter une solution maison pour la gestion de l’édition concurrente dans l’interface d’administration

Date : 2025-09-04

## Statut

Accepté

## Contexte

Plusieurs personnes de l’équipe ont besoin de travailler sur l’édition des aides, parfois en même temps, et parfois même en collaborant sur les mêmes aides.

Nous avons besoin d’informer ces personnes quand elles ne sont pas seules sur la fiche d’édition d’un contenu, et d’éviter les problèmes d’écrasement de données.

### État de l’art

De nombreux modules Django se sont déjà penchés sur ce problème ; les candidats les plus sérieux sont :
* [django-concurrency](https://pypi.org/project/django-concurrency/) est mature et maintenu mais semble nécessiter beaucoup de travail pour avoir une interface conviviale ;
* [django-admin-collaborator](https://pypi.org/project/django-admin-collaborator/) est prometteur car il intègre une interface conviviale mais nécessite d’introduire de nombreuses nouvelles technologies dont Redis (qui signifie, en PaaS Scalingo, un nouveau plugin payant) et surtout ASGI pour gérer les websockets.

## Décision

Une solution maison sera implémentée, à base de verrous gérer comme des modèles Django dans PostgreSQL, et de polling HTTP pour gérer du quasi-temps réel.

## Conséquences

### Positives

* L’interface pourra être parfaitement adaptée aux besoins de l’équipe ;
* Aucune technologie lourde ne sera introduite.

### Négatives

* Ça semble dommage de réaliser un développement maison pour une fonctionnalité aussi générique.
