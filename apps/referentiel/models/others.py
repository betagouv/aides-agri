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
