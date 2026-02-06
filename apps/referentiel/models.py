from enum import IntFlag, auto

from django.db import models
from django.db.models import functions
from django_enum import EnumField


class Organisme(models.Model):
    nom = models.CharField()
    siren = models.CharField(blank=True)

    def __str__(self):
        return self.nom


class Programme(models.Model):
    nom = models.CharField()

    def __str__(self):
        return self.nom


class Territoire(models.Model):
    class Type(models.enums.TextChoices):
        REGION = "REG", "Région"
        DEPARTEMENT = "DEP", "Département"
        COM = "COM_COMER", "Collectivité d'outre-mer"
        EPCI = "EPCI", "Intercommunalité"
        COMMUNE = "COM", "Commune"

    type = EnumField(Type)
    code = models.CharField()
    code_cog = models.GeneratedField(
        expression=functions.Concat("type", models.Value("-"), "code"),
        output_field=models.CharField(),
        db_persist=True,
    )
    nom = models.CharField()
    parent = models.ForeignKey(
        "Territoire", null=True, on_delete=models.CASCADE, related_name="enfants"
    )
    intercommunalite = models.ForeignKey(
        "Territoire", null=True, on_delete=models.CASCADE, related_name="membres"
    )

    @property
    def is_region(self):
        return self.type == self.__class__.Type.REGION

    @property
    def is_departement(self):
        return self.type == self.__class__.Type.DEPARTEMENT

    @property
    def is_epci(self):
        return self.type == self.__class__.Type.EPCI

    @property
    def is_commune(self):
        return self.type == self.__class__.Type.COMMUNE

    def __str__(self):
        return f"{self.code} {self.nom}" if self.is_departement else self.nom


class RepresentableFlag(IntFlag):
    def api_repr(self):
        return self.name.lower().replace("_", " ")

    def human_repr(self):
        return self.name.capitalize().replace("_", " ")


class DemarcheAgricole(models.Model):
    class Type(RepresentableFlag):
        ASSISTANCE = auto()
        AVANTAGE_FISCAL = auto()
        CONSEIL = auto()
        ETUDE = auto()
        FINANCEMENT = auto()
        FORMATION = auto()
        INFORMATION = auto()
        PRET = auto()

    class Cible(RepresentableFlag):
        PROFESSIONNELS = auto()
        PARTICULIERS = auto()
        ASSOCIATIONS = auto()
        SECTEUR_PUBLIC = auto()

    code = models.CharField(unique=True)

    # Champs simples
    titre = models.CharField()
    promesse = models.CharField(blank=True)
    description = models.TextField(blank=True)
    eligibilite = models.TextField(blank=True)
    url_source = models.URLField(blank=True)
    date_ouverture = models.DateField(null=True, blank=True)
    date_cloture = models.DateField(null=True, blank=True)
    date_mise_a_jour = models.DateField(auto_now=True)

    # Relations
    types_aides = EnumField(Type, null=True, blank=True)
    cibles = EnumField(Cible, null=True, blank=True)
    porteurs_aides = models.ManyToManyField(Organisme, through="Porteur", blank=True)
    programmes_parents = models.ManyToManyField(Programme, blank=True)
    eligibilite_geographique = models.ManyToManyField(
        Territoire, blank=True, related_name="demarches_eligibilite"
    )
    eligibilite_geographique_exclusions = models.ManyToManyField(
        Territoire, blank=True, related_name="demarches_eligibilite_exclusion"
    )

    def __str__(self):
        return f"{self.code} – {self.titre}"


class Porteur(models.Model):
    class Role(RepresentableFlag):
        DIFFUSEUR = auto()
        FINANCEUR = auto()
        INSTRUCTEUR = auto()

    class Meta:
        unique_together = ("demarche", "organisme")

    demarche = models.ForeignKey(DemarcheAgricole, on_delete=models.CASCADE)
    organisme = models.ForeignKey(Organisme, on_delete=models.CASCADE)
    roles = EnumField(Role, null=True, blank=True)
