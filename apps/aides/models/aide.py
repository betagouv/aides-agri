import uuid
from datetime import date, timedelta

from django.conf import settings
from django.contrib.postgres import fields as postgres_fields
from django.db import models
from django.urls import reverse
from django.utils.functional import cached_property
from django.utils.text import slugify
from django.utils.timezone import now

from .references import (
    Beneficiaires,
    Filiere,
    Organisme,
    Programme,
    Sujet,
    Theme,
    Type,
    ZoneGeographique,
)


class AideQuerySet(models.QuerySet):
    def validated(self):
        return self.filter(status=Aide.Status.VALIDATED)

    def published(self):
        return self.filter(is_published=True)

    def closed(self):
        return self.filter(date_fin__lt=date.today())

    def without_parents(self):
        return self.filter(children=None)

    def official_published(self):
        return self.published().without_parents()

    def official_published_validated(self):
        return self.published().without_parents().validated()

    def official_published_count(self):
        return self.official_published().count()

    def official_published_validated_count(self):
        return self.official_published_validated().count()

    def official_published_organismes_count(self):
        return (
            self.official_published()
            .order_by("organisme_id")
            .distinct("organisme_id")
            .count()
        )

    def published_validated(self):
        return self.published().validated()

    def having_children(self):
        return self.exclude(children=None).distinct()

    def having_published_children(self):
        return self.filter(children__is_published=True).distinct()

    def by_besoins(self, themes: list[Theme], sujets: list[Sujet]):
        return self.filter(
            models.Q(sujets__themes__in=themes) | models.Q(sujets__in=sujets)
        )

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

    def by_filieres(self, filieres: list[Filiere]):
        return self.filter(models.Q(filieres=None) | models.Q(filieres__in=filieres))

    def by_departements(self, departements: list[ZoneGeographique]):
        q = models.Q(couverture_geographique=Aide.CouvertureGeographique.NATIONAL)
        if any((dept.is_metropole for dept in departements)):
            q = q | models.Q(
                couverture_geographique=Aide.CouvertureGeographique.METROPOLE
            )
        for departement in departements:
            q = q | models.Q(
                zones_geographiques__in=[departement.pk, departement.parent_id]
            )
        return self.filter(q)

    def only_open(self):
        return self.filter(
            models.Q(date_fin=None) | models.Q(date_fin__gte=date.today())
        )

    def only_closed(self):
        return self.filter(date_fin__isnull=False, date_fin__lt=date.today())


class Aide(models.Model):
    class Meta:
        verbose_name = "Aide"
        verbose_name_plural = "Aides"

    objects = AideQuerySet.as_manager()

    class Status(models.TextChoices):
        TODO = "00", "0. Backlog - À prioriser"
        CANDIDATE = "10", "1. Priorisée - Scope à vérif"
        BLOCKED = "11", "1.1 Bloquée"
        CHOSEN = "20", "2. Ok scope - À éditer"
        REVIEW = "30", "3. Ok édito - À valider"
        REVIEW_EXPERT = "31", "3.1 En attente validation métier"
        VALIDATED = "40", "4. Validée"
        TO_BE_DERIVED = "41", "4.1 Validée puis à décliner"
        ARCHIVED = "99", "99. Archivée"

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
        NATIONAL = "01 National", "National"
        REGIONAL = "04 Régional", "Régional"
        METROPOLE = "02 France métropolitaine", "France métropolitaine"
        OUTRE_MER = "03 Outre-mer", "Outre-mer"
        DEPARTEMENTAL = "05 Départemental", "Départemental"
        LOCAL = "06 Local", "Local"

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

    @classmethod
    def get_derivable_fields(cls) -> list[models.Field]:
        return [
            f
            for f in cls._meta.get_fields()
            if f.editable
            and f
            not in {
                field_descriptor.field
                for field_descriptor in {
                    Aide.id,
                    Aide.is_derivable,
                    Aide.parent,
                    Aide.is_published,
                    Aide.status,
                    Aide.sneak_peek_token,
                    Aide.assigned_to,
                    Aide.cc_to,
                    Aide.date_created,
                    Aide.date_modified,
                    Aide.internal_comments,
                    Aide.first_published_at,
                    Aide.last_published_at,
                    Aide.slug,
                    Aide.nom,
                    Aide.description_de_base,
                    Aide.raw_data,
                }
            }
        ]

    @property
    def derivable_fields(self) -> list[models.Field]:
        return [
            f
            for f in self.__class__.get_derivable_fields()
            if not f.many_to_many and getattr(self, f.name)
        ]

    @property
    def derivable_m2m_relationships(self) -> list[models.Field]:
        return [
            f
            for f in self.__class__.get_derivable_fields()
            if f.many_to_many and getattr(self, f.name).exists()
        ]

    is_derivable = models.BooleanField(default=False, verbose_name="Est déclinable")
    is_published = models.BooleanField(default=False, verbose_name="Publiée")
    parent = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        verbose_name="Déclinée depuis",
        related_name="children",
    )
    status = models.CharField(choices=Status, default=Status.TODO, verbose_name="État")
    sneak_peek_token = models.UUIDField(unique=True, editable=False, default=uuid.uuid4)
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
    is_territoire_en_deploiement = models.BooleanField(
        default=False, verbose_name="Territoire en déploiement"
    )
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
    bureau_valideur = models.CharField(
        blank=True, default="", verbose_name="Bureau valideur"
    )
    internal_comments = models.TextField(
        blank=True, default="", verbose_name="Commentaires internes"
    )
    first_published_at = models.DateTimeField(
        null=True, editable=False, verbose_name="Date de première publication"
    )
    last_published_at = models.DateTimeField(
        null=True, editable=False, verbose_name="Date de dernière mise à jour publiée"
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
        blank=True,
        related_name="aides",
        on_delete=models.CASCADE,
        verbose_name="Organisme porteur",
    )
    organisme_instructeur = models.ForeignKey(
        Organisme,
        null=True,
        blank=True,
        related_name="aides_instruites",
        on_delete=models.CASCADE,
        verbose_name="Organisme instructeur",
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
    conditions = models.TextField(blank=True, verbose_name="Conditions d’éligibilité")
    montant = models.TextField(blank=True, verbose_name="Montant ou taux de l’aide")
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
    eligibilite_cumulable = models.TextField(
        blank=True,
        verbose_name="Cette aide est-elle cumulable avec d’autres dispositifs ?",
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
    etapes = models.TextField(blank=True, verbose_name="Étapes")
    eligibilite_beneficiaires = models.ManyToManyField(
        Beneficiaires,
        blank=True,
        related_name="aides",
        verbose_name="Bénéficiaires",
    )
    filieres = models.ManyToManyField(
        Filiere, blank=True, related_name="aides", verbose_name="Filières"
    )
    base_juridique = models.ManyToManyField(
        "BaseJuridique", blank=True, verbose_name="Bases juridiques"
    )
    raw_data = postgres_fields.HStoreField(
        null=True, blank=True, verbose_name="Données brutes issues de l’intégration"
    )

    def __str__(self):
        return (f"{self.parent} > " if self.parent else "") + self.nom

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
    def is_declinaison_territoriale(self) -> bool:
        return (
            (self.is_departemental or self.is_regional)
            and self.parent is not None
            and (self.parent.is_departemental or self.parent.is_regional)
            and not self.parent.zones_geographiques.exists()
        )

    @property
    def is_local(self):
        return self.couverture_geographique == Aide.CouvertureGeographique.LOCAL

    @property
    def is_to_be_derived(self):
        return self.status == Aide.Status.TO_BE_DERIVED

    @property
    def is_to_be_reviewed_by_expert(self):
        return self.status == Aide.Status.REVIEW_EXPERT

    @property
    def is_complete(self):
        return self.status in (Aide.Status.VALIDATED, Aide.Status.TO_BE_DERIVED)

    def _closes_in_less_than(self, weeks: int) -> bool:
        return self.date_fin and date.today() + timedelta(weeks=weeks) > self.date_fin

    @property
    def closes_in_less_than_a_month(self):
        return self._closes_in_less_than(4)

    @property
    def closes_in_less_than_two_weeks(self):
        return self._closes_in_less_than(2)

    @property
    def is_closed(self):
        return self.date_fin and self.date_fin < date.today()

    @property
    def is_ongoing(self) -> bool:
        return self.date_fin is None or self.date_fin > date.today()

    @cached_property
    def bases_juridiques(self):
        return self.base_juridique

    @cached_property
    def has_bases_juridiques(self):
        return self.bases_juridiques.exists()

    @property
    def is_for_groupements_only(self) -> bool:
        return (
            all(
                beneficiaires.is_groupement
                for beneficiaires in self.eligibilite_beneficiaires.all()
            )
            if self.eligibilite_beneficiaires.exists()
            else False
        )

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
        if self.is_territoire_en_deploiement:
            priority += 30
        if self.is_meconnue:
            priority += 10
        if self.is_filiere_sous_representee:
            priority += 10

        self.priority = priority

    def can_be_published(self):
        """
        An Aide cannot be published if:
        - Its status is before CHOSEN
        - Or it's been ARCHIVED
        - Or it's supposed to be a parent but it doesn't have any is_published/VALIDATED child
        """
        return self.status not in (
            Aide.Status.ARCHIVED,
            Aide.Status.TODO,
            Aide.Status.CANDIDATE,
            Aide.Status.BLOCKED,
        ) and (
            not self.is_derivable
            or (self.pk and self.children.published_validated().exists())
        )

    def _compute_slug(self):
        if self.organisme_instructeur:
            organisme = slugify(self.organisme_instructeur.nom)
        elif self.organisme:
            organisme = slugify(self.organisme.nom)
        else:
            organisme = "organisme-inconnu"
        self.slug = f"{organisme}-{slugify(self.nom)}"

    def save(self, *args, **kwargs):
        self._compute_slug()
        if self.is_published:
            if not self.can_be_published():
                raise ValueError("This Aide cannot be published")
            if not Aide.objects.filter(pk=self.pk, is_published=True).exists():
                self.first_published_at = now()
            self.last_published_at = now()
        self.compute_priority()
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        if self.is_derivable:
            return reverse(
                "aides:parent-aide", kwargs={"pk": self.pk, "slug": self.slug}
            )
        else:
            return reverse("aides:aide", kwargs={"pk": self.pk, "slug": self.slug})

    def get_public_url(self):
        return (
            self.get_absolute_url()
            if self.is_complete
            else self.url_descriptif or self.url_demarche
        )

    @cached_property
    def organisme_principal(self):
        return self.organisme_instructeur or self.organisme

    def get_organisme_for_departement(
        self, departement: ZoneGeographique | None
    ) -> Organisme:
        organisme = self.organisme_principal
        if departement:
            return organisme.get_child_for_departement(departement) or organisme
        else:
            return organisme

    def get_organisme_illustration_for_departement(
        self, departement: ZoneGeographique | None
    ):
        organisme = self.get_organisme_for_departement(departement)
        return (
            organisme.get_illustration_url()
            if organisme
            else Organisme.get_illustration_placeholder_url()
        )


class SpecificiteLocale(models.Model):
    class Meta:
        verbose_name = "Spécificité locale"
        verbose_name_plural = "Spécificités locales"

    aide = models.ForeignKey(
        Aide, on_delete=models.CASCADE, related_name="specificites_locales"
    )
    organisme = models.ForeignKey(
        Organisme,
        on_delete=models.CASCADE,
        related_name="specificites_locales_des_aides",
    )
    specificites = models.TextField(verbose_name="Spécificités", blank=True)

    @property
    def is_departemental(self):
        try:
            return self.organisme.zones_geographiques.first().is_departement
        except AttributeError:
            return False

    @property
    def is_regional(self):
        try:
            return self.organisme.zones_geographiques.first().is_region
        except AttributeError:
            return False
