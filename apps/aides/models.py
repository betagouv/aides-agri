from datetime import date

from django.contrib.postgres import fields as postgres_fields
from django.db import models
from django.templatetags.static import static
from django.urls import reverse
from django.utils.text import slugify
from django.utils.timezone import now
from product.fields import VendoredTrixRichTextField as RichTextField


class WithAidesCounterQuerySet(models.QuerySet):
    def with_aides_count(self):
        return self.annotate(aides_count=models.Count("aides", distinct=True))


class OrganismeQuerySet(WithAidesCounterQuerySet):
    def with_logo(self):
        return self.exclude(logo_filename="").filter(logo_filename__isnull=False)


class Organisme(models.Model):
    class Meta:
        verbose_name = "Organisme"
        verbose_name_plural = "Organismes"

    class Famille(models.TextChoices):
        OPERATEUR = "Opérateur", "Opérateur"
        COLLECTIVITE = "Collectivité", "Collectivité"
        ETAT = "État", "État"
        UE = "UE", "UE"
        GAL = "GAL", "GAL"
        CHAMBRE_CONSULAIRE = "Chambre consulaire", "Chambre consulaire"
        INTERPROFESSIONS = "Interprofessions", "Interprofessions"
        MIXTE = "Mixte", "Mixte"

    class Secteur(models.TextChoices):
        ECONOMIE = "Finance, économie", "Finance, économie"
        AGRICULTURE = "Agriculture", "Agriculture"
        ENVIRONNEMENT = "Environnement", "Environnement"
        EMPLOI = "Emploi", "Emploi"
        ENSEIGNEMENT = "Enseignement, formation", "Enseignement, formation"
        TOUS = "Tous", "Tous"

    objects = OrganismeQuerySet.as_manager()

    nom = models.CharField(blank=True)
    acronyme = models.CharField(blank=True)
    famille = models.CharField(blank=True, choices=Famille)
    secteurs = postgres_fields.ArrayField(
        models.CharField(blank=True, choices=Secteur), null=True, blank=True
    )
    zones_geographiques = models.ManyToManyField("ZoneGeographique", blank=True)
    logo = models.BinaryField(blank=True)
    logo_filename = models.CharField(blank=True)
    url = models.URLField(blank=True)
    courriel = models.EmailField(blank=True)

    def __str__(self):
        return self.acronyme or self.nom

    def get_logo_url(self):
        if self.logo_filename:
            return f"/aides/organismes-logos/{self.logo_filename}"
        else:
            return static("agri/images/placeholder.1x1.svg")


class ThemeQuerySet(models.QuerySet):
    def published(self):
        return self.with_aides_count().filter(published=True, aides_count__gt=0)

    def with_sujets_count(self):
        return self.annotate(sujets_count=models.Count("sujets", distinct=True))

    def with_aides_count(self):
        return self.annotate(aides_count=models.Count("sujets__aides", distinct=True))


class Theme(models.Model):
    class Meta:
        verbose_name = "Thème"
        verbose_name_plural = "Thèmes"

    objects = ThemeQuerySet.as_manager()

    nom = models.CharField(blank=True)
    nom_court = models.CharField(blank=True)
    description = models.TextField(blank=True)
    urgence = models.BooleanField(default=False)
    published = models.BooleanField(default=True)

    def __str__(self):
        return self.nom_court


class SujetQuerySet(WithAidesCounterQuerySet):
    def published(self):
        return self.with_aides_count().filter(published=True, aides_count__gt=0)


class Sujet(models.Model):
    class Meta:
        verbose_name = "Sujet"
        verbose_name_plural = "Sujets"

    objects = SujetQuerySet.as_manager()

    nom = models.CharField(blank=True)
    nom_court = models.CharField(blank=True)
    themes = models.ManyToManyField(Theme, related_name="sujets")
    published = models.BooleanField(default=True)

    def __str__(self):
        return self.nom_court


class TypeQuerySet(WithAidesCounterQuerySet):
    pass


class Type(models.Model):
    class Meta:
        verbose_name = "Type d'aides"
        verbose_name_plural = "Types d'aides"
        ordering = (
            "-urgence",
            "nom",
        )

    objects = TypeQuerySet.as_manager()

    nom = models.CharField(blank=True)
    description = models.CharField(blank=True)
    urgence = models.BooleanField(default=False)
    icon_name = models.CharField(blank=True)

    def __str__(self):
        return self.nom


class ProgrammeQuerySet(WithAidesCounterQuerySet):
    pass


class Programme(models.Model):
    class Meta:
        verbose_name = "Programme d'aides"
        verbose_name_plural = "Programmes d'aides"
        ordering = ("nom",)

    objects = ProgrammeQuerySet.as_manager()

    nom = models.CharField(blank=True)

    def __str__(self):
        return self.nom


class ZoneGeographiqueQuerySet(WithAidesCounterQuerySet):
    def regions(self):
        return self.filter(type=ZoneGeographique.Type.REGION).order_by("code")

    def coms(self):
        return self.filter(type=ZoneGeographique.Type.COM).order_by("code")

    def departements(self):
        return self.filter(type=ZoneGeographique.Type.DEPARTEMENT).order_by("code")

    def communes(self):
        return self.filter(type=ZoneGeographique.Type.COMMUNE)


class ZoneGeographique(models.Model):
    class Meta:
        verbose_name = "Zone géographique"
        verbose_name_plural = "Zones géographiques"
        unique_together = ("type", "code")
        ordering = ("type", "code")

    objects = ZoneGeographiqueQuerySet.as_manager()

    class Type(models.TextChoices):
        REGION = "01 Région", "Région"
        DEPARTEMENT = "03 Département", "Département"
        COM = "02 Collectivité d’outre-mer", "Collectivité d'outre-mer"
        EPCI = "04 EPCI", "EPCI"
        COMMUNE = "05 Commune", "Commune"

    nom = models.CharField(blank=True)
    code = models.CharField(blank=True)
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


class FiliereQuerySet(WithAidesCounterQuerySet):
    def published(self):
        return self.filter(published=True)


class Filiere(models.Model):
    class Meta:
        verbose_name = "Filière"
        verbose_name_plural = "Filières"
        ordering = ("position",)

    objects = FiliereQuerySet.as_manager()

    nom = models.CharField(max_length=100, blank=True)
    published = models.BooleanField(default=True)
    position = models.IntegerField(default=99)
    code_naf = models.CharField(max_length=10, blank=True)

    def __str__(self):
        return self.nom


class SousFiliere(models.Model):
    class Meta:
        verbose_name = "Sous-filière"
        verbose_name_plural = "Filières > Sous-filières"

    nom = models.CharField(max_length=100, blank=True)
    filiere = models.ForeignKey(Filiere, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.nom


class Production(models.Model):
    class Meta:
        verbose_name = "Détail de production"
        verbose_name_plural = "Filières > Sous-filières > Détails de production"

    nom = models.CharField(max_length=100, blank=True)
    sous_filiere = models.ForeignKey(SousFiliere, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.nom


class GroupementProducteurs(models.Model):
    class Meta:
        verbose_name = "Groupement de producteurs"
        verbose_name_plural = "Groupement de producteurs"
        ordering = ("nom",)

    nom = models.CharField(max_length=100, blank=True)
    libelle = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.nom


class AideQuerySet(models.QuerySet):
    def published(self):
        return self.filter(status=Aide.Status.PUBLISHED)

    def by_sujets(self, sujets: list[Sujet]) -> models.QuerySet:
        return self.filter(sujets__in=sujets)

    def by_effectif(self, effectif_low: int, effectif_high: int) -> models.QuerySet:
        return self.filter(
            (
                models.Q(eligibilite_effectif_min__lte=effectif_low)
                | models.Q(eligibilite_effectif_min=None)
            )
            & (
                models.Q(eligibilite_effectif_max__gte=effectif_high)
                | models.Q(eligibilite_effectif_max=None)
            )
        )

    def by_filieres(self, filieres: Filiere):
        return self.filter(models.Q(filieres=None) | models.Q(filieres__in=filieres))

    def by_zone_geographique(self, commune: ZoneGeographique) -> models.QuerySet:
        if not commune:
            return self

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


class Aide(models.Model):
    class Meta:
        verbose_name = "Aide"
        verbose_name_plural = "Aides"

    objects = AideQuerySet.as_manager()

    class Status(models.TextChoices):
        DRAFT = "01 À traiter", "01 À traiter"
        CANDIDATE = "02 À relire", "02 À relire"
        PUBLISHED = "03 Publiée", "03 Publiée"
        UNPUBLISHED = "04 Dépubliée", "04 Dépubliée"

    class CouvertureGeographique(models.TextChoices):
        NATIONAL = "National", "National"
        REGIONAL = "Régional", "Régional"
        METROPOLE = "France métropolitaine", "France métropolitaine"
        OUTRE_MER = "Outre-mer", "Outre-mer"
        DEPARTEMENTAL = "Départemental", "Départemental"
        LOCAL = "Local", "Local"

    class Beneficiaire(models.TextChoices):
        AGRI = "Agriculteurs"
        CUMA = "CUMA"
        SICA = "SICA"
        SCA = "SCA"
        GIEE = "GIEE"
        OP = "Organisations de producteurs"

    class Recurrence(models.TextChoices):
        PERMANENTE = "Permanente"
        PONCTUELLE = "Ponctuelle"
        RECURRENTE = "Récurrente"
        ANNUELLE = "Annuelle"

    class EtatAvancementProjet(models.TextChoices):
        CONCEPTION = "Réflexion / Conception"
        REALISATION = "Mise en œuvre / Réalisation"
        USAGE = "Usage / Valorisation"

    status = models.CharField(choices=Status, default=Status.DRAFT)
    last_published_at = models.DateTimeField(null=True, blank=True, editable=False)
    slug = models.SlugField(max_length=2000)
    nom = models.CharField(blank=True)
    promesse = models.CharField(blank=True)
    description = RichTextField(blank=True)
    exemple_projet = RichTextField(blank=True)
    url_descriptif = models.URLField(blank=True, max_length=2000)
    url_demarche = models.URLField(blank=True, max_length=2000)
    contact = RichTextField(blank=True)
    sujets = models.ManyToManyField(Sujet, related_name="aides", blank=True)
    types = models.ManyToManyField(Type, related_name="aides", blank=True)
    organisme = models.ForeignKey(
        Organisme, null=True, related_name="aides", on_delete=models.CASCADE
    )
    organismes_secondaires = models.ManyToManyField(
        Organisme, related_name="aides_secondaires", blank=True
    )
    programmes = models.ManyToManyField(Programme, related_name="aides", blank=True)
    aap_ami = models.BooleanField(
        default=False, verbose_name="Appel à projet ou manifestation d'intérêt"
    )
    conditions = RichTextField(blank=True)
    montant = RichTextField(blank=True)
    participation_agriculteur = RichTextField(blank=True)
    recurrence_aide = models.CharField(choices=Recurrence, blank=True)
    date_debut = models.DateField(null=True, blank=True)
    date_fin = models.DateField(null=True, blank=True)
    eligibilite_effectif_min = models.PositiveIntegerField(null=True, blank=True)
    eligibilite_effectif_max = models.PositiveIntegerField(null=True, blank=True)
    eligibilite_etape_avancement_projet = postgres_fields.ArrayField(
        models.CharField(choices=EtatAvancementProjet), null=True, blank=True
    )
    eligibilite_age = RichTextField(blank=True)
    eligibilite_cumulable = RichTextField(blank=True)
    type_depense = RichTextField(blank=True)
    couverture_geographique = models.CharField(
        choices=CouvertureGeographique,
        default=CouvertureGeographique.NATIONAL,
        blank=True,
    )
    zones_geographiques = models.ManyToManyField(
        ZoneGeographique, related_name="aides", blank=True
    )
    duree_accompagnement = models.CharField(blank=True)
    etapes = RichTextField(blank=True)
    beneficiaires = postgres_fields.ArrayField(
        models.CharField(choices=Beneficiaire), null=True, blank=True
    )
    filieres = models.ManyToManyField(Filiere, blank=True, related_name="aides")
    raw_data = postgres_fields.HStoreField(null=True, blank=True)

    def __str__(self):
        return self.nom

    def is_published(self):
        return self.status == Aide.Status.PUBLISHED

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = f"{slugify(self.organisme.nom)}-{slugify(self.nom)}"
        if self.is_published():
            self.last_published_at = now()
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("aides:aide", kwargs={"pk": self.pk, "slug": self.slug})

    @property
    def is_ongoing(self) -> bool:
        return self.date_fin is None or self.date_fin > date.today()
