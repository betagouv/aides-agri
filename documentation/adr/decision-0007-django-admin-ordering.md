# Décision 0007 : utiliser django-admin-ordering pour trier des éléments depuis django-admin

Date : 2026-07-01

## Statut

Accepté

## Contexte

Lors de l’implémentation d’une page "À propos" pour le service Aides Agri, est venue l’idée d’y intégrer des citations de l’écosystème agricole (usagers, acteurs, presse, etc.).
Afin de ne pas solliciter l’équipe technique pour ajouter une simple citation sur cette page, la décision est prise de permettre à l’équipe de saisir ces citations dans l’interface d’administration (Django admin).

Très vite le besoin se fait ressentir de pouvoir ordonner ces citations. Mais implémenter cette fonctionnalité à la main n’est pas trivial :
- Un simple champ de tri naïf sans interface sophistiquée fait reposer beaucoup de travail sur les utilisateurs (dédoublonnage, repositionnement) ;
- Une interface sophistiquée demande un temps de développement considérable.

## Décision

Aides Agri utilisera `django-admin-ordering` pour ordonner des objets manuellement.

## Conséquences

### Positives

* L’interface utilisateur est très intuitive.

### Négatives

* La bibliothèque étant pour l’instant en 0.x avec une dernière version en novembre 2024, sa gestion technique est à surveiller.
