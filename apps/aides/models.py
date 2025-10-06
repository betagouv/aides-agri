from datetime import date

from django.conf import settings
from django.contrib.postgres import fields as postgres_fields
from django.db import models
from django.templatetags.static import static
from django.urls import reverse
from django.utils.text import slugify
from django.utils.timezone import now


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

    nom = models.CharField(verbose_name="Nom")
    acronyme = models.CharField(blank=True, verbose_name="Acronyme")
    famille = models.CharField(blank=True, choices=Famille, verbose_name="Famille")
    secteurs = postgres_fields.ArrayField(
        models.CharField(blank=True, choices=Secteur),
        null=True,
        blank=True,
        verbose_name="Secteurs",
    )
    zones_geographiques = models.ManyToManyField(
        "ZoneGeographique", blank=True, verbose_name="Zones géographiques"
    )
    logo = models.BinaryField(blank=True, verbose_name="Logo")
    logo_filename = models.CharField(blank=True)
    url = models.URLField(blank=True, verbose_name="Lien")
    courriel = models.EmailField(blank=True, verbose_name="Adresse courriel")
    is_masa = models.BooleanField(default=False, verbose_name="Made in MASA")

    def __str__(self):
        return self.acronyme or self.nom

    def get_logo_url(self):
        if self.logo_filename:
            return f"/aides/organismes-logos/{self.logo_filename}"
        else:
            return static("agri/images/placeholder.1x1.svg")

    @property
    def nom_court(self):
        return self.acronyme or self.nom


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

    nom = models.CharField(verbose_name="Nom")
    nom_court = models.CharField(verbose_name="Nom court")
    description = models.TextField(blank=True, verbose_name="Description")
    urgence = models.BooleanField(default=False, verbose_name="Urgence")
    published = models.BooleanField(default=False, verbose_name="Publié")
    is_prioritaire = models.BooleanField(
        default=False, verbose_name="Thématique prioritaire"
    )

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

    nom = models.CharField(verbose_name="Nom")
    nom_court = models.CharField(verbose_name="Nom court")
    themes = models.ManyToManyField(Theme, related_name="sujets", verbose_name="Thèmes")
    published = models.BooleanField(default=False, verbose_name="Publié")

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

    nom = models.CharField(verbose_name="Nom")
    description = models.CharField(blank=True, verbose_name="Description")
    urgence = models.BooleanField(default=False, verbose_name="Urgence")
    icon_name = models.CharField(blank=True, verbose_name="(technique) Nom de l’icône")
    score_priorite_aides = models.PositiveSmallIntegerField(default=1)

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

    nom = models.CharField(verbose_name="Nom")
    code = models.CharField(blank=True, verbose_name="Code")
    type = models.CharField(choices=Type, verbose_name="Type")
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
    code_naf = models.CharField(
        max_length=10, blank=True, verbose_name="Code NAF associé"
    )

    def __str__(self):
        return self.nom


class SousFiliere(models.Model):
    class Meta:
        verbose_name = "Sous-filière"
        verbose_name_plural = "Filières > Sous-filières"

    nom = models.CharField(max_length=100, verbose_name="Nom")
    filiere = models.ForeignKey(
        Filiere, on_delete=models.CASCADE, verbose_name="Filière"
    )

    def __str__(self):
        return self.nom


class Production(models.Model):
    class Meta:
        verbose_name = "Détail de production"
        verbose_name_plural = "Filières > Sous-filières > Détails de production"

    nom = models.CharField(max_length=100, verbose_name="Nom")
    sous_filiere = models.ForeignKey(SousFiliere, on_delete=models.CASCADE)

    def __str__(self):
        return self.nom


class GroupementProducteurs(models.Model):
    class Meta:
        verbose_name = "Groupement de producteurs"
        verbose_name_plural = "Groupement de producteurs"
        ordering = ("nom",)

    nom = models.CharField(max_length=100, verbose_name="Nom court")
    libelle = models.CharField(
        max_length=200, blank=True, verbose_name="Nom complet ou explication"
    )

    def __str__(self):
        return self.nom


class AideQuerySet(models.QuerySet):
    def validated(self):
        return self.filter(status=Aide.Status.VALIDATED)

    def pending(self):
        return self.validated().filter(date_target_publication=date.today())

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
        TODO = "00", "0. Backlog - À prioriser"
        CANDIDATE = "10", "1. Priorisée - Scope à vérif"
        CHOSEN = "20", "2. Ok scope - À éditer"
        REVIEW = "30", "3. Ok édito - À valider"
        REVIEW_EXPERT = "31", "3.1 En attente validation métier"
        VALIDATED = "40", "4. Publiée sous embargo"
        TO_BE_DERIVED = "41", "4.1 À décliner"
        PUBLISHED = "50", "5. Publiée"
        ARCHIVED = "99", "6. Archivée"

    class RaisonDesactivation(models.TextChoices):
        OFF_TOPIC = "Hors-sujet", "Hors-sujet"
        CLOSED = "Clôturé", "Clôturé"
        PENDING = "En attente d'ouverture", "En attente d'ouverture"
        ERROR = "Erreur", "Erreur"
        IRRELEVANT = "Pas la bonne cible", "Pas la bonne cible"

    class IntegrationMethod(models.TextChoices):
        MANUAL = "Manuel", "Manuel"
        SCRAPING = "Scraping", "Scraping"
        PARTNERSHIP = "Partenariat", "Partenariat"
        API = "API", "API"
        FORM = "Formulaire", "Formulaire"
        BULK_IMPORT = "Import BDD", "Import BDD"

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

    class Importance(models.IntegerChoices):
        BRULANT = 10, "1. Brulante - national"
        NATIONALE = 8, "2. Nationale"
        REGIONALE = 6, "3. Régionale"
        LOCALE = 4, "4. Locale"
        BASE = 0, "5. RAS, c'est calme"

    class Urgence(models.IntegerChoices):
        HIGH = 10, "1. Très urgent ou dure longtemps"
        MEDIUM = 5, "2. Moyen urgent, ou dure quelques mois"
        LOW = 2, "3. Pas urgent ou dure que quelques semaines"

    is_derivable = models.BooleanField(default=False, verbose_name="Est déclinable")
    parent = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        verbose_name="Déclinée depuis",
        related_name="children",
    )
    status = models.CharField(choices=Status, default=Status.TODO, verbose_name="État")
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        verbose_name="Assigné à",
    )
    cc_to = models.ManyToManyField(
        settings.AUTH_USER_MODEL, blank=True, verbose_name="CC", related_name="aides_cc"
    )
    priority = models.PositiveSmallIntegerField(default=1, verbose_name="Priorité")
    date_target_publication = models.DateField(
        null=True, blank=True, verbose_name="Date cible de publication"
    )
    source = models.CharField(blank=True, verbose_name="Origine source de la donnée")
    integration_method = models.CharField(
        blank=True,
        choices=IntegrationMethod,
        verbose_name="Mode de récolte de la donnée",
    )
    date_created = models.DateTimeField(
        auto_now_add=True, editable=False, verbose_name="Date d’intégration"
    )
    date_modified = models.DateTimeField(
        auto_now=True, editable=False, verbose_name="Date de modification"
    )
    raison_desactivation = models.CharField(
        choices=RaisonDesactivation,
        blank=True,
        default="",
        verbose_name="Raison de la désactivation",
    )
    internal_comments = models.TextField(
        blank=True, default="", verbose_name="Commentaires internes"
    )
    last_published_at = models.DateTimeField(
        null=True, editable=False, verbose_name="Date de publication"
    )
    slug = models.SlugField(max_length=2000, verbose_name="Slug")
    nom = models.CharField(verbose_name="Nom")
    promesse = models.CharField(blank=True, verbose_name="Promesse")
    description = models.TextField(blank=True, verbose_name="Description")
    description_de_base = models.TextField(
        blank=True, verbose_name="Description de l’aide racine"
    )
    exemple_projet = models.TextField(
        blank=True, verbose_name="Exemple de projet ou d’application"
    )
    url_descriptif = models.URLField(
        blank=True, max_length=2000, verbose_name="Lien vers le descriptif"
    )
    url_demarche = models.URLField(
        blank=True, max_length=2000, verbose_name="Lien vers la démarche"
    )
    importance = models.PositiveSmallIntegerField(
        choices=Importance,
        default=Importance.BASE,
        verbose_name="Répond à une actualité brûlante",
    )
    urgence = models.PositiveSmallIntegerField(
        choices=Urgence,
        default=Urgence.LOW,
        verbose_name="Degré d’urgence ou durée du dispositif",
    )
    enveloppe_globale = models.PositiveBigIntegerField(
        null=True, blank=True, verbose_name="Enveloppe globale allouée"
    )
    demande_du_pourvoyeur = models.BooleanField(
        default=False,
        verbose_name="Demande de publication directement par le pourvoyeur d’aide",
    )
    taille_cible_potentielle = models.PositiveIntegerField(
        null=True,
        blank=True,
        verbose_name="Nombre d'agriculteurs potentiellement touchés",
    )
    is_meconnue = models.BooleanField(default=False, verbose_name="Aide méconnue")
    is_filiere_sous_representee = models.BooleanField(
        default=False, verbose_name="Filière sous-représentée"
    )
    contact = models.TextField(blank=True, verbose_name="Contacts")
    sujets = models.ManyToManyField(
        Sujet, related_name="aides", blank=True, verbose_name="Sujets"
    )
    types = models.ManyToManyField(
        Type, related_name="aides", blank=True, verbose_name="Types d’aides"
    )
    organisme = models.ForeignKey(
        Organisme,
        null=True,
        related_name="aides",
        on_delete=models.CASCADE,
        verbose_name="Organisme porteur",
    )
    organismes_secondaires = models.ManyToManyField(
        Organisme,
        related_name="aides_secondaires",
        blank=True,
        verbose_name="Organismes porteurs secondaires",
    )
    programmes = models.ManyToManyField(
        Programme, related_name="aides", blank=True, verbose_name="Programmes"
    )
    aap_ami = models.BooleanField(
        default=False, verbose_name="Appel à projet ou manifestation d'intérêt"
    )
    conditions = models.TextField(blank=True, verbose_name="Conditions d’éligibilité")
    montant = models.TextField(blank=True, verbose_name="Montaux ou taux de l’aide")
    participation_agriculteur = models.TextField(
        blank=True, verbose_name="Participation ou coût pour les bénéficiaires"
    )
    recurrence_aide = models.CharField(
        choices=Recurrence, blank=True, verbose_name="Récurrence"
    )
    date_debut = models.DateField(
        null=True, blank=True, verbose_name="Date d’ouverture"
    )
    date_fin = models.DateField(null=True, blank=True, verbose_name="Date de clôture")
    eligibilite_effectif_min = models.PositiveIntegerField(
        null=True, blank=True, verbose_name="Éligibilité : effectif salarié minimum"
    )
    eligibilite_effectif_max = models.PositiveIntegerField(
        null=True, blank=True, verbose_name="Éligibilité : effectif salarié maximum"
    )
    eligibilite_etape_avancement_projet = postgres_fields.ArrayField(
        models.CharField(choices=EtatAvancementProjet),
        null=True,
        blank=True,
        verbose_name="Éligibilité : étape d’avancement du projet",
    )
    eligibilite_age = models.TextField(
        blank=True, verbose_name="Éligibilité : âge de l’exploitation"
    )
    eligibilite_cumulable = models.TextField(
        blank=True, verbose_name="Éligibilité : dispositif cumulable ?"
    )
    type_depense = models.TextField(
        blank=True, verbose_name="Types de dépenses éligibles"
    )
    couverture_geographique = models.CharField(
        choices=CouvertureGeographique,
        default=CouvertureGeographique.NATIONAL,
        verbose_name="Couverture géographique",
    )
    zones_geographiques = models.ManyToManyField(
        ZoneGeographique,
        related_name="aides",
        blank=True,
        verbose_name="Zones géographiques",
    )
    duree_accompagnement = models.CharField(
        blank=True, verbose_name="Durée de l’accompagnement"
    )
    etapes = models.TextField(blank=True, verbose_name="Étapes")
    beneficiaires = postgres_fields.ArrayField(
        models.CharField(choices=Beneficiaire),
        null=True,
        blank=True,
        verbose_name="Bénéficiaires",
    )
    filieres = models.ManyToManyField(
        Filiere, blank=True, related_name="aides", verbose_name="Filières"
    )
    raw_data = postgres_fields.HStoreField(
        null=True, blank=True, verbose_name="Données brutes issues de l’intégration"
    )

    def __str__(self):
        return (f"{self.parent} > " if self.parent else "") + self.nom

    @property
    def is_published(self):
        return self.status == Aide.Status.PUBLISHED

    @property
    def is_national(self):
        return self.couverture_geographique == Aide.CouvertureGeographique.NATIONAL

    @property
    def is_metropole(self):
        return self.couverture_geographique == Aide.CouvertureGeographique.METROPOLE

    @property
    def is_outre_mer(self):
        return self.couverture_geographique == Aide.CouvertureGeographique.OUTRE_MER

    @property
    def is_regional(self):
        return self.couverture_geographique == Aide.CouvertureGeographique.REGIONAL

    @property
    def is_departemental(self):
        return self.couverture_geographique == Aide.CouvertureGeographique.DEPARTEMENTAL

    @property
    def is_local(self):
        return self.couverture_geographique == Aide.CouvertureGeographique.LOCAL

    @property
    def is_to_be_derived(self):
        return self.status == Aide.Status.TO_BE_DERIVED

    def compute_priority(self):
        priority = 0
        priority += self.importance * 20
        priority += self.urgence * 3
        if self.enveloppe_globale:
            priority += self.enveloppe_globale / 1_000_000 * 8
        if self.organisme and self.organisme.is_masa:
            priority += 10 * 6
        if self.demande_du_pourvoyeur:
            priority += 10 * 5
        if self.taille_cible_potentielle:
            priority += (self.taille_cible_potentielle * 0.0005 + 10) * 3
        if self.pk:  # required for M2M relationships
            if self.types.exists():
                priority += (
                    max(self.types.values_list("score_priorite_aides", flat=True)) * 4
                )
            for sujet in self.sujets.all():
                for theme in sujet.themes.all():
                    if theme.is_prioritaire:
                        priority += 10 * 4
        if self.is_meconnue:
            priority += 10
        if self.is_filiere_sous_representee:
            priority += 10

        self.priority = priority

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = f"{slugify(self.organisme.nom) if self.organisme_id else 'organisme-inconnu'}-{slugify(self.nom)}"
        if self.is_published:
            self.last_published_at = now()
        self.compute_priority()
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse("aides:aide", kwargs={"pk": self.pk, "slug": self.slug})

    @property
    def is_ongoing(self) -> bool:
        return self.date_fin is None or self.date_fin > date.today()
