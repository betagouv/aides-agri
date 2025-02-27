from django.db import models


class RefTable(models.Model):
    class Meta:
        abstract = True

    external_id = models.PositiveBigIntegerField()
    nom = models.CharField()

    def __str__(self):
        return f'{self.__class__._meta.verbose_name} "{self.nom}"'


class Operateur(RefTable, models.Model):
    class Meta:
        verbose_name = "Opérateur"
        verbose_name_plural = "Opérateurs"


class Theme(RefTable, models.Model):
    class Meta:
        verbose_name = "Thème"
        verbose_name_plural = "Thèmes"
        ordering = ("nom",)


class Sujet(RefTable, models.Model):
    class Meta:
        verbose_name = "Sujet"
        verbose_name_plural = "Sujets"

    themes = models.ManyToManyField(Theme)


class Nature(RefTable, models.Model):
    class Meta:
        verbose_name = "Nature d'aide"
        verbose_name_plural = "Natures d'aide"


class CouvertureGeographique(RefTable, models.Model):
    class Meta:
        verbose_name = "Couverture géographique"
        verbose_name_plural = "Couvertures géographiques"


class ZoneGeographiqueManager(models.Manager):
    def departements(self):
        return self.filter(type=ZoneGeographique.TYPE_DEPARTEMENT)

class ZoneGeographique(RefTable, models.Model):
    class Meta:
        verbose_name = "Zone géographique"
        verbose_name_plural = "Zones géographiques"

    objects = ZoneGeographiqueManager()

    TYPE_REGION = "Région"
    TYPE_DEPARTEMENT = "Département"
    TYPE_COM = "Collectivité d'outre-mer"
    TYPE_CCOM = "Communauté de communes"
    TYPE_CSG = "Collectivité sui generis"
    TYPES_ZONE = {
        TYPE_REGION: TYPE_REGION,
        TYPE_DEPARTEMENT: TYPE_DEPARTEMENT,
        TYPE_COM: TYPE_COM,
        TYPE_CCOM: TYPE_CCOM,
        TYPE_CSG: TYPE_CSG,
    }

    numero = models.CharField(max_length=3, blank=True)
    type = models.CharField(choices=TYPES_ZONE)
    parent = models.ForeignKey("ZoneGeographique", null=True, on_delete=models.CASCADE)


class Aide(RefTable, models.Model):
    class Meta:
        verbose_name = "Aide"
        verbose_name_plural = "Aides"

    slug = models.SlugField(max_length=200)
    operateur = models.ForeignKey(Operateur, null=True, on_delete=models.CASCADE)
    operateurs_secondaires = models.ManyToManyField(
        Operateur, related_name="aides_secondaires"
    )
    nature = models.ForeignKey(Nature, null=True, on_delete=models.CASCADE)
    promesse = models.CharField(blank=True)
    description_courte = models.TextField(blank=True)
    description_longue = models.TextField(blank=True)
    montant = models.CharField(blank=True)
    lien = models.URLField(blank=True, max_length=2000)
    date_debut = models.DateField(null=True)
    date_fin = models.DateField(null=True)
    couverture_geographique = models.ForeignKey(
        CouvertureGeographique, null=True, on_delete=models.CASCADE
    )
    zones_geographiques = models.ManyToManyField(ZoneGeographique)
