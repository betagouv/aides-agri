# agri

## Objectif

Ce module porte le parcours utilisateur proposé aux exploitantes et exploitants agricoles pour trouver des dispositifs d’aides correspondant à leur situation et à leurs besoins.

## Dépendances internes

* [aides](../aides/README.md) : de la même manière que les exploitations agricoles dépendent des dispositifs d’aides, ce module dépend du module `aides`, qui fournit les dispositifs d’aides bien sûr, mais également toutes les informations de catégorisation permettant de mettre en relation la situation et les besoins d’une exploitation agricole avec les dispositifs à proposer.

## Dépendances externes

* L’annuaire des entreprises : ce service public numérique (https://annuaire-entreprises.data.gouv.fr/) expose une API JSON/HTTP qui permet de trouver des informations sur les entreprises à partir d’une recherche textuelle (nom de l’entreprise et nom de commune, numéro Siret, etc.). Ce module interroge cette API au moment de récolter des informations afin de qualifier la situation de l’exploitation agricole.

## Modèle de données

Aucun
