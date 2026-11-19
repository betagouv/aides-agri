from django.contrib.postgres import fields as postgres_fields
from django.db import models
from django.templatetags.static import static
from django.utils.functional import cached_property
from phonenumber_field.modelfields import PhoneNumberField


class WithIllustrationQuerySet(models.QuerySet):
    def without_illustration(self):
        return self.defer("illustration")


class WithIllustration(models.Model):
    class Meta:
        abstract = True

    illustration = models.BinaryField(blank=True)
    has_illustration = models.GeneratedField(
        expression=models.Case(
            models.When(illustration=b"", then=False),
            default=True,
            output_field=models.BooleanField(),
        ),
        output_field=models.BooleanField(),
        db_persist=True,
    )

    @staticmethod
    def get_illustration_placeholder_url() -> str:
        return static("aides/images/placeholder.1x1.svg")

    def get_illustration_url(self):
        if self.has_illustration:
            return f"/aides/illustrations-{self._meta.model_name}/{self.pk}.png"
        else:
            return self.__class__.get_illustration_placeholder_url()


class WithAidesCounterQuerySet(models.QuerySet):
    def with_aides_count(self):
        return self.annotate(
            aides_count=models.Count(
                "aides",
                filter=models.Q(aides__is_published=True),
                distinct=True,
            )
        )


class OrganismeQuerySet(WithAidesCounterQuerySet, WithIllustrationQuerySet):
    def with_children_count(self):
        return self.annotate(children_count=models.Count("children", distinct=True))


class Organisme(WithIllustration, models.Model):
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

    class SousFamille(models.TextChoices):
        REGION = "Région", "Région"
        DEPARTEMENT = "Département", "Département"
        OPERATEUR = "Opérateur", "Opérateur"
        MAASA = "MAASA / DRAAF / DDT", "MAASA / DRAAF / DDT"
        MTE = "MTE / DREAL", "MTE / DREAL"
        MAS = "Affaires sociales / DREETS / DEETS", "Affaires sociales / DREETS / DEETS"
        MT = "Travail / DREETS / DEETS", "Travail / DREETS / DEETS"
        MF = "Finances", "Finances"
        AGENCE_EAU = "Agences de l’eau", "Agences de l’eau"
        AUTRES = "Autres", "Autres"

    class Secteur(models.TextChoices):
        ECONOMIE = "Finance, économie", "Finance, économie"
        AGRICULTURE = "Agriculture", "Agriculture"
        ENVIRONNEMENT = "Environnement", "Environnement"
        EMPLOI = "Emploi", "Emploi"
        ENSEIGNEMENT = "Enseignement, formation", "Enseignement, formation"
        TOUS = "Tous", "Tous"

    objects = OrganismeQuerySet.as_manager()

    parent = models.ForeignKey(
        "Organisme",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="children",
        verbose_name="Organisme parent",
    )
    siren = models.CharField(blank=True, verbose_name="Numéro SIREN")
    id_annuaire_service_public = models.CharField(blank=True, editable=False)
    nom = models.CharField(verbose_name="Nom")
    acronyme = models.CharField(blank=True, verbose_name="Acronyme")
    famille = models.CharField(blank=True, choices=Famille, verbose_name="Famille")
    sous_famille = models.CharField(
        blank=True, choices=SousFamille, verbose_name="Sous-famille"
    )
    secteurs = postgres_fields.ArrayField(
        models.CharField(blank=True, choices=Secteur),
        null=True,
        blank=True,
        verbose_name="Secteurs",
    )
    zones_geographiques = models.ManyToManyField(
        "ZoneGeographique", blank=True, verbose_name="Zones géographiques"
    )
    url = models.URLField(blank=True, verbose_name="Lien")
    courriel = models.EmailField(blank=True, verbose_name="Adresse courriel")
    telephone = PhoneNumberField(
        blank=True,
        verbose_name="Numéro de téléphone",
        help_text="Au format français (01 23 45 67 89), ou sans les espaces (0123456789), ou avec des points (01.23.45.67.89), ou avec des slashs (01/23/45/67/89), ou au format international (+33 1 23 45 67 89), ou sans espaces (+33123456789)...",
    )
    adresse = models.TextField(blank=True, verbose_name="Adresse physique")
    horaires = models.TextField(blank=True, verbose_name="Horaires")
    is_masa = models.BooleanField(default=False, verbose_name="Made in MASA")

    def __str__(self):
        return self.acronyme or self.nom

    @property
    def nom_court(self):
        return self.acronyme or self.nom

    @cached_property
    def has_children(self) -> bool:
        return self.children.exists()

    def get_child_for_departement(self, departement: "ZoneGeographique"):
        return (
            self.children.filter(zones_geographiques=departement).first()
            or self.children.filter(zones_geographiques=departement.parent).first()
        )


class ThemeQuerySet(WithIllustrationQuerySet, models.QuerySet):
    def published(self):
        return self.with_aides_count().filter(published=True, aides_count__gt=0)

    def published_non_urgence(self):
        return self.published().exclude(urgence=True)

    def with_sujets_count(self):
        return self.annotate(sujets_count=models.Count("sujets", distinct=True))

    def with_aides_count(self):
        return self.annotate(
            aides_count=models.Count(
                "sujets__aides",
                filter=models.Q(sujets__aides__is_published=True),
                distinct=True,
            )
        )


class Theme(WithIllustration, models.Model):
    class Meta:
        verbose_name = "Thème"
        verbose_name_plural = "Thèmes"

    objects = ThemeQuerySet.as_manager()

    nom = models.CharField(verbose_name="Nom")
    nom_court = models.CharField(verbose_name="Nom court")
    description = models.TextField(blank=True, verbose_name="Description")
    urgence = models.BooleanField(default=False, verbose_name="Urgence")
    published = models.BooleanField(default=False, verbose_name="Publié")
    is_prioritaire = models.BooleanField(
        default=False, verbose_name="Thématique prioritaire"
    )
    icon_name = models.CharField(blank=True, verbose_name="(technique) Nom de l’icône")

    def __str__(self):
        return self.nom_court


class SujetQuerySet(WithIllustrationQuerySet, WithAidesCounterQuerySet):
    def published(self):
        return (
            self.with_aides_count()
            .without_illustration()
            .filter(published=True, aides_count__gt=0)
        )

    def published_with_urgent_themes(self):
        return self.published().exclude(themes__urgence=False)


class Sujet(WithIllustration, models.Model):
    class Meta:
        verbose_name = "Sujet"
        verbose_name_plural = "Sujets"

    objects = SujetQuerySet.as_manager()

    nom = models.CharField(verbose_name="Nom")
    nom_court = models.CharField(verbose_name="Nom court")
    themes = models.ManyToManyField(Theme, related_name="sujets", verbose_name="Thèmes")
    published = models.BooleanField(default=False, verbose_name="Publié")
    icon_name = models.CharField(blank=True, verbose_name="(technique) Nom de l’icône")

    def __str__(self):
        return self.nom_court


class TypeQuerySet(WithAidesCounterQuerySet):
    pass


class Type(models.Model):
    class Meta:
        verbose_name = "Type d'aides"
        verbose_name_plural = "Types d'aides"
        ordering = ("position",)

    objects = TypeQuerySet.as_manager()

    nom = models.CharField(verbose_name="Nom")
    description = models.CharField(blank=True, verbose_name="Description")
    urgence = models.BooleanField(default=False, verbose_name="Urgence")
    icon_name = models.CharField(blank=True, verbose_name="(technique) Nom de l’icône")
    score_priorite_aides = models.PositiveSmallIntegerField(default=1)
    position = models.PositiveSmallIntegerField(null=True, blank=True, unique=True)

    def __str__(self):
        return f"{self.nom} ({self.description})"


class ProgrammeQuerySet(WithAidesCounterQuerySet):
    pass


class Programme(models.Model):
    class Meta:
        verbose_name = "Programme d'aides"
        verbose_name_plural = "Programmes d'aides"
        ordering = ("nom",)

    objects = ProgrammeQuerySet.as_manager()

    nom = models.CharField(blank=True, verbose_name="Nom")

    def __str__(self):
        return self.nom


class ZoneGeographiqueQuerySet(WithAidesCounterQuerySet):
    def regions(self):
        return self.filter(type=ZoneGeographique.Type.REGION)

    def coms(self):
        return self.filter(type=ZoneGeographique.Type.COM)

    def departements(self):
        return self.filter(type=ZoneGeographique.Type.DEPARTEMENT)

    def communes(self):
        return self.filter(type=ZoneGeographique.Type.COMMUNE)


class ZoneGeographique(models.Model):
    class Meta:
        verbose_name = "Zone géographique"
        verbose_name_plural = "Zones géographiques"
        unique_together = ("type", "code")
        ordering = ("type", "position", "code")

    objects = ZoneGeographiqueQuerySet.as_manager()

    class Type(models.TextChoices):
        REGION = "01 Région", "Région"
        DEPARTEMENT = "03 Département", "Département"
        COM = "02 Collectivité d’outre-mer", "Collectivité d'outre-mer"
        EPCI = "04 EPCI", "EPCI"
        COMMUNE = "05 Commune", "Commune"

    nom = models.CharField(verbose_name="Nom")
    code = models.CharField(blank=True, verbose_name="Code")
    type = models.CharField(choices=Type, verbose_name="Type")
    is_metropole = models.BooleanField(default=True, verbose_name="Est en Métropole")
    parent = models.ForeignKey(
        "ZoneGeographique",
        null=True,
        on_delete=models.CASCADE,
        related_name="enfants",
        verbose_name="Zone géographique parente (département ou région)",
    )
    epci = models.ForeignKey(
        "ZoneGeographique",
        null=True,
        on_delete=models.CASCADE,
        related_name="membres",
        verbose_name="EPCI",
    )
    code_postal = models.CharField(max_length=5, blank=True, verbose_name="Code postal")
    position = models.PositiveIntegerField(default=0)
    prefixe_localisation = models.CharField(
        blank=True,
        verbose_name="Préfixe en « dans »",
        help_text="Exemples : « dans la », « en », etc.",
    )
    prefixe_determinant = models.CharField(
        blank=True,
        verbose_name="Déterminant",
        help_text="Exemples : « les », « la », etc.",
    )

    @property
    def is_region(self):
        return self.type == self.__class__.Type.REGION

    @property
    def is_com(self):
        return self.type == self.__class__.Type.COM

    @property
    def is_departement(self):
        return self.type == self.__class__.Type.DEPARTEMENT

    @property
    def is_epci(self):
        return self.type == self.__class__.Type.EPCI

    @property
    def is_commune(self):
        return self.type == self.__class__.Type.COMMUNE

    @property
    def cog(self):
        return f"{ZoneGeographique.Type(self.type).name[:3]}-{self.code}"

    @property
    def full_name_with_prefixe_localisation(self):
        if self.prefixe_localisation:
            prefix = self.prefixe_localisation
        elif self.prefixe_determinant:
            prefix = f"dans {self.prefixe_determinant}"
        else:
            prefix = ""
        return f"{prefix}{self.nom}"

    @property
    def full_name_with_determinant(self):
        return f"{self.prefixe_determinant}{self.nom}"

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

    nom = models.CharField(max_length=100, verbose_name="Nom")
    published = models.BooleanField(default=False, verbose_name="Publié")
    position = models.IntegerField(default=99, verbose_name="Position pour le tri")
    codes_naf = postgres_fields.ArrayField(
        models.CharField(max_length=10),
        null=True,
        blank=True,
        verbose_name="Codes NAF associés",
    )

    def __str__(self):
        return self.nom


class BeneficiairesQuerySet(models.QuerySet):
    def groupements(self):
        return self.filter(is_groupement=True)


class Beneficiaires(models.Model):
    class Meta:
        verbose_name = "Type de bénéficiaires"
        verbose_name_plural = "Types de bénéficiaires"
        ordering = ("nom",)

    objects = BeneficiairesQuerySet.as_manager()

    nom = models.CharField(max_length=100, verbose_name="Nom court")
    libelle = models.CharField(
        max_length=200, blank=True, verbose_name="Nom complet ou explication"
    )
    is_groupement = models.BooleanField(
        default=True, verbose_name="Est un groupement de producteurs"
    )

    def __str__(self):
        return self.nom


class BaseJuridique(models.Model):
    class Meta:
        verbose_name = "Base juridique"
        verbose_name_plural = "Bases juridiques"

    libelle = models.CharField(verbose_name="Libellé")
    url = models.URLField(
        verbose_name="Adresse",
        help_text="Une URL valide, exemple https://legifrance.gouv.fr/",
        unique=True,
    )
    commentaire = models.CharField(blank=True, verbose_name="Commentaire")

    def __str__(self):
        return self.libelle
