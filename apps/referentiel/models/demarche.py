from enum import IntFlag, auto

from django.db import models
from django.contrib.postgres import fields as postgres_fields
from django_enum import EnumField

from .others import Organisme, Programme, Territoire, Contact


class RepresentableFlag(IntFlag):
    def api_repr(self):
        return self.name.lower().replace("_", " ")

    def human_repr(self):
        return self.name.capitalize().replace("_", " ")


class DemarcheQuerySet(models.QuerySet):
    def to_do(self):
        return self.filter(status__in=(Demarche.Status.NEW, Demarche.Status.UPDATED))

    def done(self):
        return self.filter(status=Demarche.Status.DONE)


class Demarche(models.Model):
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

    class CategorieEntreprise(RepresentableFlag):
        MIC = auto()
        PME = auto()
        ETI = auto()
        GE = auto()

    class Status(models.TextChoices):
        NEW = "1. Nouvelle"
        UPDATED = "1.1 Mise à jour"
        DONE = "3. Traitée"

    objects = DemarcheQuerySet.as_manager()

    code = models.CharField(unique=True)
    status = models.CharField(choices=Status, default=Status.NEW)
    date_updated = models.DateField(auto_now=True)

    # Champs simples
    titre = models.CharField()
    promesse = models.CharField(blank=True)
    description = models.TextField(blank=True)
    eligibilite = models.TextField(blank=True)
    url_source = models.URLField(blank=True)
    date_ouverture = models.DateField(null=True, blank=True)
    date_cloture = models.DateField(null=True, blank=True)
    ciblage_nafs = postgres_fields.ArrayField(models.CharField(), null=True, blank=True)
    ciblage_nafs_exclusions = postgres_fields.ArrayField(
        models.CharField(), null=True, blank=True
    )
    bases_juridiques = postgres_fields.ArrayField(
        models.JSONField(), null=True, blank=True
    )
    secteurs_concernes = postgres_fields.ArrayField(
        models.CharField(), null=True, blank=True
    )
    eligibilite_effectifs_minimaux = models.PositiveSmallIntegerField(
        null=True, blank=True
    )
    eligibilite_effectifs_maximaux = models.PositiveSmallIntegerField(
        null=True, blank=True
    )
    eligibilite_age_minimal = models.PositiveSmallIntegerField(null=True, blank=True)
    eligibilite_formes_juridiques = postgres_fields.ArrayField(
        models.CharField(), null=True, blank=True
    )
    eligibilite_formes_juridiques_exclusions = postgres_fields.ArrayField(
        models.CharField(), null=True, blank=True
    )

    # Flags
    types_aides = EnumField(Type, null=True, blank=True)
    cibles = EnumField(Cible, null=True, blank=True)
    eligibilite_categorie_entreprise = EnumField(
        CategorieEntreprise, null=True, blank=True
    )

    # Relations
    porteurs_aides = models.ManyToManyField(
        Organisme, through="Porteur", blank=True, related_name="demarches"
    )
    referents_internes = models.ManyToManyField(Contact, related_name="demarches")
    programmes_parents = models.ManyToManyField(Programme, blank=True)
    eligibilite_geographique = models.ManyToManyField(
        Territoire, blank=True, related_name="demarches_eligibilite"
    )
    eligibilite_geographique_exclusions = models.ManyToManyField(
        Territoire, blank=True, related_name="demarches_eligibilite_exclusion"
    )
    demande_de_paiement_de = models.OneToOneField(
        "Demarche",
        on_delete=models.CASCADE,
        related_name="demande_de_paiement",
        null=True,
        blank=True,
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

    demarche = models.ForeignKey(Demarche, on_delete=models.CASCADE)
    organisme = models.ForeignKey(Organisme, on_delete=models.CASCADE)
    roles = EnumField(Role, null=True, blank=True)
