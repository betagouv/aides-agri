from django.db import models
from django.contrib.postgres import fields as postgres_fields

from grist.models import GristModel


class Operateur(GristModel):
    class Meta:
        verbose_name = "Opérateur"
        verbose_name_plural = "Opérateurs"

    zones_geographiques = models.ManyToManyField("ZoneGeographique")


class Theme(GristModel):
    class Meta:
        verbose_name = "Thème"
        verbose_name_plural = "Thèmes"
        ordering = ("nom",)


class Sujet(GristModel):
    class Meta:
        verbose_name = "Sujet"
        verbose_name_plural = "Sujets"
        ordering = ("nom",)

    themes = models.ManyToManyField(Theme)


class ZoneGeographiqueQuerySet(models.QuerySet):
    def departements(self):
        return self.filter(type=ZoneGeographique.Type.DEPARTEMENT).order_by("numero")

    def communes(self):
        return self.filter(type=ZoneGeographique.Type.COMMUNE)


class ZoneGeographique(GristModel):
    class Meta:
        verbose_name = "Zone géographique"
        verbose_name_plural = "Zones géographiques"

    objects = ZoneGeographiqueQuerySet.as_manager()

    class Type(models.TextChoices):
        REGION = "Région", "Région"
        DEPARTEMENT = "Département", "Département"
        COM = "Collectivité d'outre-mer", "Collectivité d'outre-mer"
        CSG = "Collectivité sui generis", "Collectivité sui generis"
        METRO = "Métropole", "Métropole"
        CU = "Communauté Urbaine", "Communauté Urbaine"
        CA = "Communauté d'Agglo", "Communauté d'Agglo"
        CC = "Communauté de communes", "Communauté de communes"
        COMMUNE = "Commune", "Commune"

    numero = models.CharField(max_length=5, blank=True)
    type = models.CharField(choices=Type)
    parent = models.ForeignKey(
        "ZoneGeographique", null=True, on_delete=models.CASCADE, related_name="enfants"
    )
    epci = models.ForeignKey(
        "ZoneGeographique", null=True, on_delete=models.CASCADE, related_name="membres"
    )
    code_postal = models.CharField(max_length=5, blank=True)

    @property
    def is_commune(self):
        return self.type == self.__class__.Type.COMMUNE

    def __str__(self):
        prefix = self.code_postal if self.is_commune else self.type
        return f"{prefix} {self.nom}"


class AideQuerySet(models.QuerySet):
    def by_sujets(self, sujets: list[Sujet]) -> models.QuerySet:
        return self.filter(sujets__in=sujets)

    def by_effectif(self, effectif_low: int, effectif_high: int) -> models.QuerySet:
        return self.filter(
            (models.Q(effectif_min__lte=effectif_low) | models.Q(effectif_min=None))
            & (models.Q(effectif_max__gte=effectif_high) | models.Q(effectif_max=None))
        )

    def by_type(self, type_aide: "Aide.Type"):
        return self.filter(types__contains=[type_aide])

    def by_types(self, types: set["Aide.Type"]):
        return self.filter(types__contains=types)

    def by_zone_geographique(self, code_commune: str) -> models.QuerySet:
        departement = ZoneGeographique.objects.get(
            type=ZoneGeographique.Type.COMMUNE, numero=code_commune
        ).parent
        return self.filter(
            # Nationales
            models.Q(couverture_geographique=Aide.CouvertureGeographique.NATIONAL)
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


class Aide(GristModel):
    class Meta:
        verbose_name = "Aide"
        verbose_name_plural = "Aides"
        required_db_vendor = "postgresql"

    objects = AideQuerySet.as_manager()

    class CouvertureGeographique(models.TextChoices):
        NATIONAL = "National", "National"
        REGIONAL = "Régional", "Régional"
        METROPOLE = "France métropolitaine", "France métropolitaine"
        OUTRE_MER = "Outre-mer", "Outre-mer"
        DEPARTEMENTAL = "Départemental", "Départemental"
        LOCAL = "Local", "Local"

    class Type(models.TextChoices):
        ETUDE = "Étude", "Étude"
        FORMATION = "Formation", "Formation"
        FINANCEMENT = "Financement", "Financement"
        AVANTAGE_FISCAL = "Avantage fiscal", "Avantage fiscal"
        PRET = "Prêt", "Prêt"
        REMPLACEMENT = "Remplacement", "Remplacement"
        CONSEIL = "Conseil", "Conseil"
        AUDIT = "Audit", "Audit"

    operateur = models.ForeignKey(Operateur, null=True, on_delete=models.CASCADE)
    operateurs_secondaires = models.ManyToManyField(
        Operateur, related_name="aides_secondaires"
    )
    types = postgres_fields.ArrayField(
        models.CharField(max_length=20, choices=Type), null=True
    )
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
    couverture_geographique = models.CharField(
        choices=CouvertureGeographique, default=CouvertureGeographique.NATIONAL
    )
    zones_geographiques = models.ManyToManyField(ZoneGeographique)
