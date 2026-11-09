# aides_integration

Ce module prend en charge les différents modes d’intégration de données depuis des sources externes vers l’application `aides`.

## Dépendances logicielles

* [djangorestframework](https://pypi.org/project/djangorestframework/) : framework-dans-le-framework pour gérer des API JSON/HTTP ;
  * Ainsi que son système d’authentification jeton ;
* [django-reversion](https://pypi.org/project/django-reversion) : extension Django qui assure l’historisation des changements sur un objet en base ;
* [requests](https://pypi.org/project/requests) : pour la collecte qui consiste à tirer des données via des requêtes HTTP.

## Glossaire

### Objets

* **Aide** : une aide représentée dans la base de données Aides Agri ;
* **Aide à intégrer** : le résultat du processus de *collecte*, à savoir une aide issue d’un SI externe, pas encore structurée selon le schéma de données Aides Agri, et pas encore estimée pertinente ou non.

### Acteurs

* **Partenaire** : organisme pourvoyeur d’aides publiques à l’agriculture, dont le système d’information va servir, d’une manière ou d’une autre, de source à la collecte des aides pour Aides Agri ;
* **Opérateurice** : personne chargée de réaliser les opérations humaines de la phase d’*incorporation*.

### Processus

* **Intégration** : l’ensemble du processus permettant l’ajout ou la modification automatique ou semi-automatique d’une aide à la base de données Aides Agri ;
* **Collecte** : la première phase de l’*intégration*, consistant à insérer ou modifier dans une table intermédiaire une aide provenant d’un système d’information externe ; peut-être réalisée de deux manières :
    * En allant chercher l’information (par exemple en lisant périodiquement un flux mis à disposition par le SI externe) ;
    * En recevant l’information de la part du SI externe (appel à une API exposée par cette application par exemple) ;
* **Incorporation** : la seconde phase de l’*intégration*, qui consiste à ajouter ou mettre à jour une aide dans Aides Agri à partir d’une *aide à intégrer*.

## Workflow d’intégration

### Collecte

Cette phase est entièrement automatique, gérée par deux types de processus informatiques :
- **En flux** : une API attend des messages des partenaires pour signaler les aides à ajouter/modifier/supprimer :
    - À l’idéal, les partenaires peuvent pousser les aides unitairement au format JSON en respectant [le schéma interministériel des aides aux entreprises](https://schema.data.gouv.fr/etalab/dispositif-aide-professionnels/) ;
    - À défaut, un schéma spécifique est à implémenter.
- **En stock** : un processus quotidien se charge, pour chaque stock partenaire, de récupérer l’ensemble des aides à intégrer, puis de comparer avec le stock existant pour le partenaire concerné pour marquer les aides comme nouvelles, à mettre à jour, ou à supprimer ; là encore :
    - À l’idéal, le partenaire expose ses aides selon [le schéma interministériel des aides aux entreprises](https://schema.data.gouv.fr/etalab/dispositif-aide-professionnels/) ;
    - À défaut, un schéma spécifique est à implémenter.

### Incorporation

Cette phase est effectuée par des humains, assistés par des traitements informatiques :
1. Toute *aide à intégrer* nouvellement créée ou mise à jour se voit attribuer un état : `1. Nouvelle` ou `1.1 Mise à jour` ;
2. Sur le tableau de bord d’intégration, les *aides à intégrer* présentant l’un de ces deux états sont présentées dans une colonne `À traiter` ;
3. Au clic sur l’une d’elles, l’opérateurice peut consulter les détails de l’*aide à intégrer* :
    * Les métadonnées (source, date de collecte, état) ;
    * Les données collectées (la liste des champs du schéma utilisé par le partenaire).
4. De là, l’opérateurice peut décider :
    * De marquer l’*aide à intégrer* comme non pertinente pour Aides Agri, ce qui la place dans l’état `98. Non pertinente` ;
    * De démarrer l’*incorporation* de l’*aide à intégrer* dans Aides Agri.
5. Dans le cas où l’*incorporation* a été déclenchée, la suite dépend de l’état de l’*aide à intégrer* :
    * `1. Nouvelle` :
        1. Une nouvelle *aide* est créée dans la base Aides Agri, **non publiée**, et à l’état `2. Ok scope - À éditer` ;
            * Cette opération technique utilise un adaptateur entre le schéma utilisé par le partenaire et le schéma Aides Agri.
        2. L’*aide à intégrer* est passée à l’état `3. Traitée` :
            * L’*aide* créée est attachée à l’*aide à intégrer* ;
            * La version de l’*aide à intégrer* est mémorisée comme étant la plus récente à avoir fait l’objet d’une *incorporation*.
        3. L’écran d’édition de l’Aide s’affiche, afin que l’opérateurice effectue les opérations de qualification nécessaire à la publication sur Aides Agri.
    * `1.1 Mise à jour` :
        1. Un écran présente la différence entre la version la plus récente de l’*aide à intégrer* à avoir fait l’objet d’une *incorporation* et la version actuelle ;
        2. L’opérateurice peut alors décider de la suite des opérations :
            * Appliquer les changements :
                * L’*aide* voit alors ses champs écrasés par les valeurs de la nouvelle version de l’*aide à intégrer* ;
                * L’*aide à intégrer* est passée à l’état `3. Traitée` :
                    * La version de l’*aide à intégrer* est mémorisée comme étant la plus récente à avoir fait l’objet d’une *incorporation* .
            * Se rendre sur la fiche de l’aide pour effectuer des changements manuellement :
                * L’*aide à intégrer* est passée à l’état `2. En cours` ;
                * Lorsque l’opérateurice a sauvegardé ses modifications sur l’aide, l’*aide à intégrer* est passée à l’état `3. Traitée`.
            * Ignorer les changements :
                * L’*aide à intégrer* est passée à l’état `3. Traitée`.
