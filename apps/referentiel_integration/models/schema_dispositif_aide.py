import reversion
from django.db import models

from .base import RawDemarche, RawDemarcheFromExternalSource


@reversion.register()
class RawDemarcheSchemaDispositifAide(RawDemarcheFromExternalSource, RawDemarche):
    class Meta:
        verbose_name = "Démarche brute au schéma interministériel des aides"
        verbose_name_plural = "Démarches brutes au schéma interministériel des aides"
        unique_together = ("source", "id_externe")

    # schema cœur
    id_externe = models.CharField()
    titre = models.CharField()
    promesse = models.CharField(blank=True)
    description = models.TextField(blank=True)
    eligibilite = models.TextField(blank=True)
    types_aides = models.CharField(blank=True)
    porteurs = models.JSONField(null=True, blank=True)
    programmes_parents = models.CharField(blank=True)
    referents_internes = models.JSONField(null=True, blank=True)
    url_source = models.URLField(blank=True)
    cibles = models.CharField(blank=True)
    eligibilite_geographique = models.CharField(blank=True)
    eligibilite_geographique_exclusions = models.CharField(blank=True)
    date_ouverture = models.DateField(null=True, blank=True)
    date_cloture = models.DateField(null=True, blank=True)
    date_mise_a_jour = models.DateField(null=True, blank=True)

    # schema étendu : entreprises
    bases_juridiques = models.JSONField(null=True, blank=True)
    secteurs_concernes = models.CharField(blank=True)
    ciblage_nafs = models.CharField(blank=True)
    ciblage_nafs_exclusions = models.CharField(blank=True)
    eligibilite_effectifs_minimaux = models.PositiveSmallIntegerField(
        null=True, blank=True
    )
    eligibilite_effectifs_maximaux = models.PositiveSmallIntegerField(
        null=True, blank=True
    )
    eligibilite_age_minimal = models.PositiveSmallIntegerField(null=True, blank=True)
    eligibilite_formes_juridiques = models.CharField(null=True, blank=True)
    eligibilite_formes_juridiques_exclusions = models.CharField(null=True, blank=True)
    eligibilite_categorie_entreprise = models.CharField(null=True, blank=True)
    demande_de_paiement_de = models.CharField(null=True, blank=True)

    def __str__(self):
        return f"[{self.source}] {self.titre}"
