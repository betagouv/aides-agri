from datetime import date

from django.contrib.postgres import fields as postgres_fields
from django.db import models
from django.templatetags.static import static
from django.urls import reverse
from django.utils.timezone import now

from grist_loader.models import GristModel


class OrganismeQuerySet(models.QuerySet):
    def with_logo(self):
        return self.exclude(logo_filename="").filter(logo_filename__isnull=False)


class Organisme(GristModel):
    class Meta:
        verbose_name = "Organisme"
        verbose_name_plural = "Organismes"

    objects = OrganismeQuerySet.as_manager()

    nom = models.CharField(blank=True)
    acronyme = models.CharField(blank=True)
    zones_geographiques = models.ManyToManyField("ZoneGeographique")
    logo = models.BinaryField(blank=True)
    logo_filename = models.CharField(blank=True, null=True)

    def __str__(self):
        return self.nom

    def get_logo_url(self):
        if self.logo_filename:
            return f"/aides/organismes-logos/{self.logo_filename}"
        else:
            return static("agri/images/placeholder.1x1.svg")


class ThemeQuerySet(models.QuerySet):
    def published(self):
        return self.filter(published=True)

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
    published = models.BooleanField(default=True)

    def __str__(self):
        return self.nom


class SujetQuerySet(models.QuerySet):
    def published(self):
        return self.filter(published=True)

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
    published = models.BooleanField(default=True)

    def __str__(self):
        return self.nom


class Type(GristModel):
    class Meta:
        verbose_name = "Type d'aides"
        verbose_name_plural = "Types d'aides"
        ordering = (
            "-urgence",
            "nom",
        )

    nom = models.CharField(blank=True)
    description = models.CharField(blank=True)
    urgence = models.BooleanField(default=False)
    icon_name = models.CharField(blank=True)

    def __str__(self):
        return self.nom


class Programme(GristModel):
    class Meta:
        verbose_name = "Programme d'aides"
        verbose_name_plural = "Programmes d'aides"
        ordering = ("nom",)

    nom = models.CharField(blank=True)

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


class Filiere(GristModel):
    class Meta:
        verbose_name = "Filière"
        verbose_name_plural = "Filières"
        ordering = ("position",)

    nom = models.CharField(max_length=100, blank=True)
    position = models.IntegerField(unique=True, default=0)
    code_naf = models.CharField(max_length=10, blank=True)

    def __str__(self):
        return self.nom


class SousFiliere(GristModel):
    class Meta:
        verbose_name = "Sous-filière"
        verbose_name_plural = "Sous-filières"

    nom = models.CharField(max_length=100, blank=True)
    filiere = models.ForeignKey(Filiere, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.nom


class Production(GristModel):
    class Meta:
        verbose_name = "Détail de production"
        verbose_name_plural = "Détails de production"

    nom = models.CharField(max_length=100, blank=True)
    sous_filiere = models.ForeignKey(SousFiliere, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.nom


class GroupementProducteurs(GristModel):
    class Meta:
        verbose_name = "Groupement de producteurs"
        verbose_name_plural = "Groupement de producteurs"
        ordering = ("-is_real", "nom")

    nom = models.CharField(max_length=100, blank=True)
    libelle = models.CharField(max_length=200, blank=True)
    is_real = models.GeneratedField(
        expression=models.Case(
            models.When(libelle="", then=False),
            default=True,
            output_field=models.BooleanField(),
        ),
        output_field=models.BooleanField(),
        db_persist=True,
    )

    def __str__(self):
        return self.nom


class AideQuerySet(models.QuerySet):
    def published(self):
        return self.filter(published=True)

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

    def by_type(self, type_aide: Type):
        return self.filter(types__contains=[type_aide])

    def by_types(self, types: Type):
        return self.filter(types__contains=types)

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

    published = models.BooleanField(default=True)
    last_published_at = models.DateTimeField(null=True, blank=True, editable=False)
    slug = models.CharField(blank=True, max_length=2000, unique=True)
    nom = models.CharField(blank=True)
    promesse = models.CharField(blank=True)
    description = models.TextField(blank=True)
    exemple_projet = models.TextField(blank=True)
    url_descriptif = models.URLField(blank=True, max_length=2000)
    url_demarche = models.URLField(blank=True, max_length=2000)
    contact = models.CharField(blank=True)
    sujets = models.ManyToManyField(Sujet, related_name="aides")
    types = models.ManyToManyField(Type, related_name="aides")
    organisme = models.ForeignKey(Organisme, null=True, on_delete=models.CASCADE)
    organismes_secondaires = models.ManyToManyField(
        Organisme, related_name="aides_secondaires"
    )
    programmes = models.ManyToManyField(Programme, related_name="aides")
    aap_ami = models.BooleanField(
        default=False, verbose_name="Appel à projet ou manifestation d'intérêt"
    )
    conditions = models.TextField(blank=True)
    montant = models.CharField(blank=True)
    participation_agriculteur = models.CharField(blank=True)
    recurrence_aide = models.CharField(choices=Recurrence, blank=True)
    date_debut = models.DateField(null=True)
    date_fin = models.DateField(null=True)
    eligibilite_effectif_min = models.PositiveIntegerField(null=True)
    eligibilite_effectif_max = models.PositiveIntegerField(null=True)
    eligibilite_etape_avancement_projet = postgres_fields.ArrayField(
        models.CharField(choices=EtatAvancementProjet), null=True
    )
    eligibilite_age = models.CharField(blank=True)
    eligibilite_cumulable = models.CharField(blank=True)
    type_depense = models.CharField(blank=True)
    couverture_geographique = models.CharField(
        choices=CouvertureGeographique, default=CouvertureGeographique.NATIONAL
    )
    zones_geographiques = models.ManyToManyField(ZoneGeographique, related_name="aides")
    duree_accompagnement = models.CharField(blank=True)
    etapes = models.TextField(blank=True)
    beneficiaires = postgres_fields.ArrayField(
        models.CharField(choices=Beneficiaire), null=True
    )
    filieres = models.ManyToManyField(Filiere)

    def __str__(self):
        return self.nom

    def save(self, *args, **kwargs):
        if self.published:
            self.last_published_at = now()
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("aides:aide", kwargs={"slug": self.slug})

    @property
    def is_ongoing(self) -> bool:
        return self.date_fin is None or self.date_fin > date.today()
