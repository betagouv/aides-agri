Justifications des dépendances Python sur la base de ce paragraphe de l'ancienne doc


### Les apps tierces-parties

> [!NOTE]
> Elles sont choisies selon les critères suivants :
> 
> - Viabilité (numéro de version supérieur à 1.0, bonne couverture en tests, évolutions récentes, etc.)
> - Simplicité (notamment éviter les dépendances ajoutant des briques d’infrastructure)
> - Valeur ajoutée par rapport à un développement spécifique

La liste exhaustive peut être consultée [dans le fichier `pyproject.toml`](../../pyproject.toml), mais les plus structurantes sont :

* [django-anymail](https://pypi.org/project/django-anymail) : envoi de courriels via Brevo sans complexité ;
* [django-axes](https://pypi.org/project/django-anymail) : surveillance des échecs d’authentification ;
* [django-csp](https://pypi.org/project/django-csp/) : sécurisation des ressources demandées par les pages web ;
* [django-dsfr](https://pypi.org/project/django-dsfr/) : intégration du DSFR avec Django ;
* [django-htmx](https://pypi.org/project/django-htmx/) : intégration facilitée de htmx (n’a pas une valeur ajoutée énorme pour ce produit aujourd’hui mais est parfaitement viable) ;
* [dj-importmap](https://pypi.org/project/dj-importmap) : automatisation de la construction de l’élément `<importmap>` ;
* [django-two-factor-auth](https://pypi.org/project/django-two-factor-auth/) : second facteur d’authentification pour l’interface d’admin ;
* [django-pgtrigger](https://pypi.org/project/django-pgtrigger/) : gestion d’un TTL sur des valeurs écrites dans PostgreSQL, pour un système de verrou ;
* [django-reversion](https://pypi.org/project/django-reversion/) : historisation des modifications apportées aux aides via l’interface d’admin ;
* [django-tasks](https://pypi.org/project/django-tasks/) : worker (pas encore en version 1.0, mais remplace Celery de manière bien plus légère, avec PostgreSQL en backend, et compatible nativement avec l’avenir de Django, qui intégrera à partir de sa version 6.0 une interface logicielle pour les workers) ;
