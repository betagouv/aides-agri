# aides_integration

Cette application prend en charge les différents modes d’intégration de données depuis des sources externes vers l’application `aides`.

## Dépendances logicielles

* [djangorestframework](https://pypi.org/project/djangorestframework/) : framework-dans-le-framework pour gérer des API JSON/HTTP ;
  * Ainsi que son système d’authentification jeton ;
* [django-reversion](https://pypi.org/project/django-reversion) : extension Django qui assure l’historisation des changements sur un objet en base ;
* [markdownify](https://pypi.org/project/markdownify) : bibliothèque qui permet de récupérer de la mise en forme depuis du HTML pour la transformer en mise en forme Markdown.

## Glossaire

* **Intégration** : l’ensemble du processus permettant l’ajout ou la modification automatique ou semi-automatique d’une aide à la base de données Aides Agri ;
* **Import** : la première phase de l’*intégration*, consistant à insérer ou modifier dans une table intermédiaire une aide provenant d’un système d’information externe ; peut-être réalisée de deux manières :
  * En allant chercher l’information (par exemple en lisant périodiquement un flux mis à disposition par le SI externe) ;
  * En recevant l’information de la part du SI externe (appel à une API exposée par cette application par exemple) ;
* **Aide à intégrer** : le résultat de la phase d’*import*, à savoir une aide issue d’un SI externe, pas encore structurée selon le schéma de données Aides Agri, et pas encore estimée pertinente ou non ;
* **Ajout** ou **mise à jour** : la seconde phase de l’*intégration*, qui consiste à ajouter ou mettre à jour une aide dans Aides Agri depuis une *aide à intégrer*.

## Workflow d’intégration

```mermaid

```