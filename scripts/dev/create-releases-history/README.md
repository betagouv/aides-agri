# Création rétropactive d’historique de releases

Ce script crée l’historique de releases Github manquant.

## Spécifications

* Nommage des releases Github : `YYYY-MM-DD-X` (`X` étant un incrément des releases du jour) ;
* Nommage des tags Git : `release/YYYY-MM-DD-X` ;
* Notes de release : auto-générées (une passe humaine doit ensuite être effectuée sur les releases marquantes).

## Fonctionnement

1. Récupération de l’historique des déploiements Scalingo, pour obtenir **une liste ordonnée de commits Git** ;
2. Structuration de ces commits par jour en utilisant les données internes de Git, pour obtenir **une liste de commit par jour** ;
3. Création, pour chaque jour/commit, d’un tag Git et d’une release Github.

## Mode d’emploi

### Pré-requis

* [scalingo-cli](https://doc.scalingo.com/tools/cli/start)
* [gh cli](https://cli.github.com/)

### Lancement de la commande

```shell
uv run main.py
```

La commande est idempotente.
