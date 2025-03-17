from django.db import models


class RefTable(models.Model):
    class Meta:
        abstract = True

    external_id = models.PositiveBigIntegerField()
    nom = models.CharField()

    def __str__(self):
        return self.nom


class Operateur(RefTable, models.Model):
    class Meta:
        verbose_name = "Opérateur"
        verbose_name_plural = "Opérateurs"

    zones_geographiques = models.ManyToManyField("ZoneGeographique")


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
        ordering = ("nom",)


class ZoneGeographiqueManager(models.Manager):
    def departements(self):
        return self.filter(type=ZoneGeographique.TYPE_DEPARTEMENT).order_by("numero")

    def communes(self):
        return self.filter(type=ZoneGeographique.TYPE_COMMUNE)

class ZoneGeographique(RefTable, models.Model):
    class Meta:
        verbose_name = "Zone géographique"
        verbose_name_plural = "Zones géographiques"

    objects = ZoneGeographiqueManager()

    TYPE_REGION = "Région"
    TYPE_DEPARTEMENT = "Département"
    TYPE_COM = "Collectivité d'outre-mer"
    TYPE_CSG = "Collectivité sui generis"
    TYPE_METRO = "Métropole"
    TYPE_CU = "Communauté Urbaine"
    TYPE_CA = "Communauté d'Agglo"
    TYPE_CC = "Communauté de communes"
    TYPE_COMMUNE = "Commune"
    TYPES_ZONE = {
        TYPE_REGION: TYPE_REGION,
        TYPE_DEPARTEMENT: TYPE_DEPARTEMENT,
        TYPE_COM: TYPE_COM,
        TYPE_CSG: TYPE_CSG,
        TYPE_METRO: TYPE_METRO,
        TYPE_CU: TYPE_CU,
        TYPE_CA: TYPE_CA,
        TYPE_CC: TYPE_CC,
        TYPE_COMMUNE: TYPE_COMMUNE,
    }

    numero = models.CharField(max_length=5, blank=True, unique=True)
    type = models.CharField(choices=TYPES_ZONE)
    parent = models.ForeignKey("ZoneGeographique", null=True, on_delete=models.CASCADE, related_name="enfants")
    epci = models.ForeignKey("ZoneGeographique", null=True, on_delete=models.CASCADE, related_name="membres")
    code_postal = models.CharField(max_length=5, blank=True)

    @property
    def is_commune(self):
        return self.type == self.__class__.TYPE_COMMUNE

    def __str__(self):
        prefix = self.code_postal if self.is_commune else self.type
        return f"{prefix} {self.nom}"


class AideQuerySet(models.QuerySet):
    def by_nature(self, nature_id: int) -> models.QuerySet:
        return self.filter(nature_id=nature_id)

    def by_sujets(self, sujets: list[Sujet]) -> models.QuerySet:
        return self.filter(sujets__in=sujets)

    def by_effectif(self, effectif_low: int, effectif_high: int) -> models.QuerySet:
        return self.filter(
            (models.Q(effectif_min__lte=effectif_low) | models.Q(effectif_min=None))
            &
            (models.Q(effectif_max__gte=effectif_high) | models.Q(effectif_max=None))
        )

    def by_natures(self, natures: set[Nature]):
        return self.filter(natures__in=natures)

    def by_zone_geographique(self, code_commune: str) -> models.QuerySet:
        departement = ZoneGeographique.objects.get(type=ZoneGeographique.TYPE_COMMUNE, numero=code_commune).parent
        return self.filter(
            # Nationales
            models.Q(couverture_geographique=Aide.COUVERTURE_GEOGRAPHIQUE_NATIONAL)
            |
            # Same region
            models.Q(zones_geographiques__enfants=departement)
            |
            # Same departement
            models.Q(zones_geographiques=departement)
            |
            # Operateur : same EPCI
            models.Q(operateur__zones_geographiques__enfants__numero=code_commune)
            |
            # Operateur : same commune
            models.Q(operateur__zones_geographiques__numero=code_commune)
        )


class Aide(RefTable, models.Model):
    class Meta:
        verbose_name = "Aide"
        verbose_name_plural = "Aides"

    objects = AideQuerySet.as_manager()

    COUVERTURE_GEOGRAPHIQUE_NATIONAL = "National"
    COUVERTURE_GEOGRAPHIQUE_REGIONAL = "Régional"
    COUVERTURE_GEOGRAPHIQUE_METROPOLE = "France métropolitaine"
    COUVERTURE_GEOGRAPHIQUE_OUTRE_MER = "Outre-mer"
    COUVERTURE_GEOGRAPHIQUE_DEPARTEMENTAL = "Départemental"
    COUVERTURE_GEOGRAPHIQUE_LOCAL = "Local"
    COUVERTURES_GEOGRAPHIQUES = {
        COUVERTURE_GEOGRAPHIQUE_NATIONAL: COUVERTURE_GEOGRAPHIQUE_NATIONAL,
        COUVERTURE_GEOGRAPHIQUE_REGIONAL: COUVERTURE_GEOGRAPHIQUE_REGIONAL,
        COUVERTURE_GEOGRAPHIQUE_METROPOLE: COUVERTURE_GEOGRAPHIQUE_METROPOLE,
        COUVERTURE_GEOGRAPHIQUE_OUTRE_MER: COUVERTURE_GEOGRAPHIQUE_OUTRE_MER,
        COUVERTURE_GEOGRAPHIQUE_DEPARTEMENTAL: COUVERTURE_GEOGRAPHIQUE_DEPARTEMENTAL,
        COUVERTURE_GEOGRAPHIQUE_LOCAL: COUVERTURE_GEOGRAPHIQUE_LOCAL,
    }

    slug = models.SlugField(max_length=200)
    operateur = models.ForeignKey(Operateur, null=True, on_delete=models.CASCADE)
    operateurs_secondaires = models.ManyToManyField(
        Operateur, related_name="aides_secondaires"
    )
    natures = models.ManyToManyField(Nature)
    themes = models.ManyToManyField(Theme)
    sujets = models.ManyToManyField(Sujet)
    promesse = models.CharField(blank=True)
    description_courte = models.TextField(blank=True)
    description_longue = models.TextField(blank=True)
    montant = models.CharField(blank=True)
    lien = models.URLField(blank=True, max_length=2000)
    date_debut = models.DateField(null=True)
    date_fin = models.DateField(null=True)
    effectif_min = models.PositiveIntegerField(null=True)
    effectif_max = models.PositiveIntegerField(null=True)
    couverture_geographique = models.CharField(choices=COUVERTURES_GEOGRAPHIQUES)
    zones_geographiques = models.ManyToManyField(ZoneGeographique)
