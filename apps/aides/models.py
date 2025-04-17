from django.db import models

from grist_loader.models import GristModel


class Organisme(GristModel):
    class Meta:
        verbose_name = "Organisme"
        verbose_name_plural = "Organismes"

    nom = models.CharField(blank=True)
    acronyme = models.CharField(blank=True)
    zones_geographiques = models.ManyToManyField("ZoneGeographique")

    def __str__(self):
        return self.nom


class ThemeQuerySet(models.QuerySet):
    def with_aides_count(self):
        return self.annotate(aides_count=models.Count("sujets__aides"))


class Theme(GristModel):
    class Meta:
        verbose_name = "Thème"
        verbose_name_plural = "Thèmes"

    objects = ThemeQuerySet.as_manager()

    nom = models.CharField(blank=True)
    nom_court = models.CharField(blank=True)
    description = models.TextField(blank=True)
    urgence = models.BooleanField(default=False)

    def __str__(self):
        return self.nom


class SujetQuerySet(models.QuerySet):
    def with_aides_count(self):
        return self.annotate(aides_count=models.Count("aides"))


class Sujet(GristModel):
    class Meta:
        verbose_name = "Sujet"
        verbose_name_plural = "Sujets"

    objects = SujetQuerySet.as_manager()

    nom = models.CharField(blank=True)
    nom_court = models.CharField(blank=True)
    themes = models.ManyToManyField(Theme, related_name="sujets")

    def __str__(self):
        return self.nom


class TypeQuerySet(models.QuerySet):
    def get_conseil(self):
        return self.get(nom="Conseil")


class Type(GristModel):
    class Meta:
        verbose_name = "Type d'aides"
        verbose_name_plural = "Types d'aides"
        ordering = ("nom",)

    objects = TypeQuerySet.as_manager()

    nom = models.CharField(blank=True)
    description = models.CharField(blank=True)

    def __str__(self):
        return self.nom


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

    nom = models.CharField(blank=True)
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

    def by_type(self, type_aide: Type):
        return self.filter(types__contains=[type_aide])

    def by_types(self, types: Type):
        return self.filter(types__contains=types)

    def by_zone_geographique(self, commune: ZoneGeographique) -> models.QuerySet:
        departement = commune.parent
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
            # Organisme : same EPCI
            models.Q(organisme__zones_geographiques__enfants=commune)
            |
            # Organisme : same commune
            models.Q(organisme__zones_geographiques=commune)
        )


class Aide(GristModel):
    class Meta:
        verbose_name = "Aide"
        verbose_name_plural = "Aides"

    objects = AideQuerySet.as_manager()

    class CouvertureGeographique(models.TextChoices):
        NATIONAL = "National", "National"
        REGIONAL = "Régional", "Régional"
        METROPOLE = "France métropolitaine", "France métropolitaine"
        OUTRE_MER = "Outre-mer", "Outre-mer"
        DEPARTEMENTAL = "Départemental", "Départemental"
        LOCAL = "Local", "Local"

    nom = models.CharField(blank=True)
    organisme = models.ForeignKey(Organisme, null=True, on_delete=models.CASCADE)
    organismes_secondaires = models.ManyToManyField(
        Organisme, related_name="aides_secondaires"
    )
    types = models.ManyToManyField(Type, related_name="aides")
    sujets = models.ManyToManyField(Sujet, related_name="aides")
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
    zones_geographiques = models.ManyToManyField(ZoneGeographique, related_name="aides")

    def __str__(self):
        return self.nom
