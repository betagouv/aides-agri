from enum import IntFlag, auto

from django.db import models
from django.contrib.postgres import fields as postgres_fields
from django_enum import EnumField

from .references import BaseJuridique, Organisme, Programme, Territoire


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
    class Meta:
        verbose_name = "Démarche"
        verbose_name_plural = "Démarches"

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
        NEW = "1_NEW", "1. Nouvelle"
        UPDATED = "1_1_UPDATED", "1.1. Mise à jour"
        IN_PROGRESS = "2_IN_PROGRESS", "2. En traitement"
        DONE = "3_DONE", "3. Traitée"

    objects = DemarcheQuerySet.as_manager()

    code = models.CharField(unique=True, verbose_name="Identifiant")
    status = models.CharField(choices=Status, default=Status.NEW, verbose_name="État")
    date_updated = models.DateTimeField(
        auto_now=True, verbose_name="Date de mise à jour"
    )

    # Champs simples
    titre = models.CharField(verbose_name="Titre")
    promesse = models.CharField(blank=True, max_length=180, verbose_name="Promesse")
    description = models.TextField(
        blank=True, max_length=5000, verbose_name="Description"
    )
    eligibilite = models.TextField(blank=True, verbose_name="Critères d’éligibilité")
    url_source = models.URLField(blank=True, verbose_name="URL source")
    document_source = models.FileField(
        null=True, blank=True, verbose_name="Document source"
    )
    date_ouverture = models.DateTimeField(
        null=True, blank=True, verbose_name="Date d’ouverture"
    )
    date_cloture = models.DateTimeField(
        null=True, blank=True, verbose_name="Date de clôture"
    )
    ciblage_naf = postgres_fields.ArrayField(
        models.CharField(), null=True, blank=True, verbose_name="Ciblage – Codes NAF"
    )
    ciblage_naf_exclusions = postgres_fields.ArrayField(
        models.CharField(),
        null=True,
        blank=True,
        verbose_name="Ciblage – Codes NAF – exclusions",
    )
    ciblage_secteur_activite = postgres_fields.ArrayField(
        models.CharField(),
        null=True,
        blank=True,
        verbose_name="Ciblage – Secteurs d’activité concernés",
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
    eligibilite_forme_juridique = postgres_fields.ArrayField(
        models.CharField(),
        null=True,
        blank=True,
        verbose_name="Éligibilité – Forme juridique",
    )
    eligibilite_forme_juridique_exclusions = postgres_fields.ArrayField(
        models.CharField(),
        null=True,
        blank=True,
        verbose_name="Éligibilité – Forme juridique – Exclusions",
    )

    # Flags
    types_aides = EnumField(Type, null=True, blank=True, verbose_name="Types d’aides")
    cibles = EnumField(Cible, null=True, blank=True, verbose_name="Bénéficiaires")
    eligibilite_categorie_taille_entreprise = EnumField(
        CategorieEntreprise,
        null=True,
        blank=True,
        verbose_name="Éligibilité – Catégories de tailles d’entreprises",
        help_text="N’utiliser que si l’éligibilité repose sur une combinaison de critères et ne se limite pas au nombre de salariés.",
    )

    # Relations
    porteurs = models.ManyToManyField(
        Organisme,
        through="Porteur",
        blank=True,
        related_name="demarches",
        verbose_name="Porteurs",
    )
    programmes_parents = models.ManyToManyField(
        Programme, blank=True, verbose_name="Programmes parents"
    )
    eligibilite_geographique = models.ManyToManyField(
        Territoire,
        blank=True,
        related_name="demarches_eligibilite",
        verbose_name="Couverture géographique de l’aide",
    )
    eligibilite_geographique_exclusions = models.ManyToManyField(
        Territoire,
        blank=True,
        related_name="demarches_eligibilite_exclusion",
        verbose_name="Couverture géographique de l’aide - exclusions",
    )
    bases_juridiques = models.ManyToManyField(
        BaseJuridique, blank=True, verbose_name="Bases juridiques"
    )
    demande_de_paiement_de = models.OneToOneField(
        "Demarche",
        on_delete=models.CASCADE,
        related_name="demande_de_paiement",
        null=True,
        blank=True,
        verbose_name="Identifiant de la démarche dont cette démarche-ci est la demande de paiement",
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
    roles = EnumField(Role, null=True, blank=True, verbose_name="Rôles")


class ReferentInterne(models.Model):
    class Meta:
        verbose_name = "Référent interne"
        verbose_name_plural = "Référents internes"

    demarche = models.ForeignKey(
        Demarche, on_delete=models.CASCADE, related_name="referents_internes"
    )
    nom = models.CharField(blank=True, verbose_name="Nom complet")
    email = models.CharField(blank=True, verbose_name="Adresse courriel")
    telephone = models.CharField(blank=True, verbose_name="Numéro de téléphone")
