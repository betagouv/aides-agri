from django.db import models
from django.db.models import functions
from django_enum import EnumField


class Organisme(models.Model):
    nom = models.CharField(verbose_name="Nom")
    siren = models.CharField(blank=True, verbose_name="Numéro Siren")

    def __str__(self):
        return self.nom


class Programme(models.Model):
    nom = models.CharField(verbose_name="Nom")

    def __str__(self):
        return self.nom


class Territoire(models.Model):
    class Type(models.enums.TextChoices):
        REGION = "REG", "Région"
        DEPARTEMENT = "DEP", "Département"
        COM = "COM_COMER", "Collectivité d'outre-mer"
        EPCI = "EPCI", "Intercommunalité"
        COMMUNE = "COM", "Commune"

    type = EnumField(Type, verbose_name="Type")
    code = models.CharField(verbose_name="Code")
    code_cog = models.GeneratedField(
        expression=functions.Concat("type", models.Value("-"), "code"),
        output_field=models.CharField(),
        db_persist=True,
    )
    nom = models.CharField(verbose_name="Nom")
    parent = models.ForeignKey(
        "Territoire",
        null=True,
        on_delete=models.CASCADE,
        related_name="enfants",
        verbose_name="Territoire parent",
    )
    intercommunalite = models.ForeignKey(
        "Territoire",
        null=True,
        on_delete=models.CASCADE,
        related_name="membres",
        verbose_name="Intercommunalité",
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
