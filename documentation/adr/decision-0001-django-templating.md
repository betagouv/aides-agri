# Décision 0001 : utiliser le templating Django pour la construction des pages web

Date : 2025-01-20

## Statut

Accepté

## Contexte

### État de l’art des interfaces web

* De nombreux produits numériques, y compris au sein du programme _beta.gouv.fr_, réalisent leur interface web sous la forme d’une _single-page app_ à l’aide d’un framework Javascript comme React ou Vue ;
* Pour pallier les faiblesses de cette architecture, notamment concernant le SEO, des _metaframeworks_ (Next JS, Svelte) sont parfois utilisés pour pré-générer les pages côté serveur puis permettre à la _single-page app_, une fois initialisée, de la mettre à jour avec les données les plus récentes ;
* Mais réaliser une interface web efficace, accessible et agréable est également faisable en générant les pages web sur le serveur de manière classique via du templating, et l’ajout de pointes de dynamisme, jusqu’à un certain niveau de sophistication, peut être fait via des bibliothèques Javascript légères comme Stimulus et htmx.

### État de l’art concernant le DSFR

* Des intégrations du DSFR avec les frameworks les plus utilisés existent (React, Vue, mais aussi templates Django).

### Marché des développeuses et développeurs

* Dans un sens il est plus facile de recruter des développeuses ou développeurs ayant des compétences et l’appétence pour les frameworks Javascript et l’architecture _single-page app_ ;
* Dans l’autre sens, il est plus facile de ne pas avoir besoin de recruter une personne supplémentaire si on choisit une technologie plus simple et plus intégrée avec le framework choisi pour le serveur web.

### Interface utilisateur envisagée

* Parcours simple, avec juste quelques écrans consécutifs consistant en des formulaires légers, suivis d’un écran de visualisation d’une liste d’éléments dépendants des réponses données sur les écrans précédents ;
* _Look’n’feel_ cadré par le Système de Design de l’État (DSFR).

## Décision

Cette application générera ses pages web sur le serveur via des templates Django, et :
* assurera les interactions côté client par le mini-framework Stimulus JS ;
* réalisera les changements de contenus partiels dans les pages via la mini-bibliothèque htmx.

## Conséquences

### Positives

* L’architecture technique du produit sera simple ;
* Les performances web seront directement dépendantes des temps de réponse de l’application sur le serveur : plus facilement mesurables, plus simplement améliorables, etc. ;
* Les utilisateurs bénéficieront des fonctionnalités natives de leur navigateur : navigation, formulaires, accessibilité ;
* Le nombre de dépendances Javascript sera très réduit, ce qui a trois sous-conséquences positives :
  * Le risque de dépendre d’une bibliothèque non maintenu sera faible ;
  * La surface d’exposition à une cyber-attaque de supply-chain sera faible ;
  * Le fardeau de la mise à jour des dépendances sera léger ;

### Négatives

Si l’équipe a besoin de renforts humains pour développer l’interface web de ce produit, il sera plus difficile de trouver des profils compétents et intéressés.
