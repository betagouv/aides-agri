# Décision 0003 : stocker les illustrations des organismes en base de données

Date : 2025-05-15

## Statut

Accepté

## Contexte

Notre produit a besoin d’afficher sur ses pages web des illustrations de certains contenus (en l’occurrence le modèle `Organisme` de l’app `aides`). Quelques détails :
* Volumétrie : très faible, à peine quelques centaines d’images de quelques dizaines de ko chacune ;
* Processus de mise à jour : la base de données des organismes sera rarement mise à jour : il y aura un gros batch d’insertion au début, puis des mises à jour sporadiques. De plus, la personne qui réalisera l’ajout d’un organisme dans la base parce qu’elle en a besoin pour la rédaction d’une aide ne sera pas forcément en mesure de se procurer l’illustration dans le bon format.

Le framework Django préconise d’habitude d’utiliser le type de champ `ImageField` prévu spécifiquement pour cet usage, qui permet :
* De téléverser une image depuis l’interface d’administration ;
* De la stocker dans un endroit configurable (qui peut être un système de stockage externe, de manière très utile pour les applications hébergées en cloud sur des containers volatiles) ;
* De l’afficher via les templates Django grâce à une URL déterministe.

Mais il se trouve que l’hébergeur choisi, Scalingo, ne propose pas d’offre de stockage, nous obligeant donc à contractualiser avec un autre fournisseur juste pour ça. Ce n’est pas un problème technique, Django permettant de prendre en charge de manière très facile plusieurs fournisseurs de service de stockage. Mais acheter un tel service aurait deux inconvénients :
* Le coût (même s’il est réduit) ;
* La dépendance à un système externe.

## Décision

Au vu des faibles volumétries et des faibles contraintes sur le processus de mise à jour, les illustrations seront stockées dans un champ binaire de la base de données (BinaryField de Django, malgré la recommandation de la documentation de ne pas procéder de cette manière, cf. [la documentation (en anglais)](https://docs.djangoproject.com/en/5.2/ref/models/fields/#binaryfield)), puis seront exportées de la base de données vers le système de fichiers local au démarrage de l’application web, en vue d’être exposées en HTTP.

## Conséquences

### Positives

* Pas d’ajout d’une nouvelle brique d’infrastructure ;
* Pas de coût supplémentaire pour cette toute petite fonctionnalité.

### Négatives

* Ajouter ou la modification de l’illustration d’un organisme ne peut pas être fait via l’interface d’administration, c’est une opération technique ;
* L’ajout ou la modification de l’illustration d’un organisme nécessite un redémarrage des containers pour déclencher un nouvel export des illustrations de la base de données vers le système de fichiers local ;
* Les images sont servies en HTTP en sollicitant le container de l’application.