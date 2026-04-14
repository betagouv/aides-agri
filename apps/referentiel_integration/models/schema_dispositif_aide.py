import reversion
from django.db import models

from .base import RawDemarche, RawDemarcheFromExternalSource

COG_PAYS = "PAYS-99100"


@reversion.register()
class RawDemarcheSchemaDispositifAide(RawDemarcheFromExternalSource, RawDemarche):
    class Meta:
        verbose_name = "Démarche brute au schéma interministériel des aides"
        verbose_name_plural = "Démarches brutes au schéma interministériel des aides"
        unique_together = ("source", "id_externe")

    # schema cœur
    id_externe = models.CharField(
        verbose_name="Identifiant dans le système d‘information source"
    )
    titre = models.CharField(verbose_name="Titre")
    promesse = models.CharField(blank=True, verbose_name="Promesse")
    description = models.TextField(blank=True, verbose_name="Description")
    eligibilite = models.TextField(blank=True, verbose_name="Conditions d’éligibilité")
    types_aides = models.CharField(blank=True, verbose_name="Types d’aides")
    porteurs = models.JSONField(null=True, blank=True, verbose_name="Porteurs")
    programmes_parents = models.CharField(blank=True, verbose_name="Programmes parents")
    referents_internes = models.JSONField(
        null=True, blank=True, verbose_name="Référents internes"
    )
    url_source = models.URLField(blank=True, verbose_name="URL source")
    cibles = models.CharField(blank=True, verbose_name="Bénéficiaires")
    eligibilite_geographique = models.CharField(
        blank=True, verbose_name="Couverture géographique de l’aide"
    )
    eligibilite_geographique_exclusions = models.CharField(
        blank=True, verbose_name="Couverture géographique de l’aide ‑ exclusions"
    )
    date_ouverture = models.DateTimeField(
        null=True, blank=True, verbose_name="Date d’ouverture"
    )
    date_cloture = models.DateTimeField(
        null=True, blank=True, verbose_name="Date de clôture"
    )
    date_mise_a_jour = models.DateTimeField(
        null=True, blank=True, verbose_name="Date de mise à jour"
    )

    # schema étendu : entreprises
    base_juridique = models.JSONField(
        null=True, blank=True, verbose_name="Bases juridiques"
    )
    ciblage_secteur_activite = models.CharField(
        blank=True, verbose_name="Secteurs d’activité concernés"
    )
    ciblage_naf = models.CharField(blank=True, verbose_name="Ciblage – codes NAF")
    ciblage_naf_exclusions = models.CharField(
        blank=True, verbose_name="Ciblage – codes NAF – exclusions"
    )
    eligibilite_effectif_minimal = models.PositiveSmallIntegerField(
        null=True, blank=True, verbose_name="Éligibilité – Effectif minimal"
    )
    eligibilite_effectif_maximal = models.PositiveSmallIntegerField(
        null=True, blank=True, verbose_name="Éligibilité – Effectif maximal"
    )
    eligibilite_annees_existence_minimal = models.PositiveSmallIntegerField(
        null=True,
        blank=True,
        verbose_name="Éligibilité – Nombre d’années d’existence minimal",
    )
    eligibilite_forme_juridique = models.CharField(
        null=True, blank=True, verbose_name="Éligibilité – Forme juridique"
    )
    eligibilite_forme_juridique_exclusions = models.CharField(
        null=True, blank=True, verbose_name="Éligibilité – Forme juridique – exclusions"
    )
    eligibilite_categorie_taille_entreprise = models.CharField(
        null=True,
        blank=True,
        verbose_name="Éligibilité – Catégories de tailles d’entreprises",
    )
    chainage_paiement = models.CharField(
        null=True,
        blank=True,
        verbose_name="Identifiant de la démarche dont cette démarche-ci est la demande de paiement",
    )

    def __str__(self):
        return f"[{self.source}] {self.titre}"
