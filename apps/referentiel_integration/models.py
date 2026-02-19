import reversion
from django.contrib.admin.templatetags.admin_urls import admin_urlname
from django.db import models

from referentiel.models import DemarcheAgricole


class RawDemarcheFromExternalSource(models.Model):
    class Meta:
        abstract = True

    source = models.CharField()


class RawDemarcheQuerySet(models.QuerySet):
    def new(self):
        return self.filter(status=RawDemarche.Status.NEW)

    def updated(self):
        return self.filter(status=RawDemarche.Status.UPDATED)

    def to_do(self):
        return self.filter(
            status__in=(RawDemarche.Status.NEW, RawDemarche.Status.UPDATED)
        )


class RawDemarche(models.Model):
    class Status(models.TextChoices):
        NEW = "1. Nouvelle"
        UPDATED = "1.1 Mise à jour"
        IN_PROGRESS = "2. En traitement"
        DONE = "3. Traitée"

    objects = RawDemarcheQuerySet.as_manager()

    status = models.CharField(choices=Status, default=Status.NEW)
    demarche = models.ForeignKey(DemarcheAgricole, null=True, on_delete=models.SET_NULL)

    @property
    def is_new(self):
        return self.status == self.__class__.Status.NEW

    @property
    def is_updated(self):
        return self.status == self.__class__.Status.UPDATED

    def save(self, *args, update_status=True, **kwargs):
        if update_status and self.pk and self.demarche:
            self.status = self.__class__.Status.UPDATED
        super().save(*args, **kwargs)

    def _get_real(self) -> "RawDemarche":
        for subclass in self.__class__.__subclasses__():
            subclass_onetoone = subclass.__name__.lower()
            if hasattr(self, subclass_onetoone) and getattr(self, subclass_onetoone):
                return getattr(self, subclass_onetoone)
        raise ValueError("RawDemarche must not be created on its own.")

    def get_admin_urlname(self) -> str:
        return admin_urlname(self._get_real()._meta, "change")

    def __str__(self):
        return str(self._get_real())


@reversion.register()
class RawDemarcheSchemaAide(RawDemarcheFromExternalSource, RawDemarche):
    class Meta:
        verbose_name = "Démarche brute au schéma interministériel des aides"
        verbose_name_plural = "Démarches brutes au schéma interministériel des aides"
        unique_together = ("source", "id_externe")

    id_externe = models.CharField()
    titre = models.CharField()
    promesse = models.CharField(blank=True)
    description = models.TextField(blank=True)
    eligibilite = models.TextField(blank=True)
    types_aides = models.CharField(blank=True)
    porteurs = models.JSONField(null=True, blank=True)
    programmes_parents = models.CharField(blank=True)
    url_source = models.URLField(blank=True)
    cibles = models.CharField(blank=True)
    eligibilite_geographique = models.CharField(blank=True)
    eligibilite_geographique_exclusions = models.CharField(blank=True)
    date_ouverture = models.DateField(null=True, blank=True)
    date_cloture = models.DateField(null=True, blank=True)
    date_mise_a_jour = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"[{self.source}] {self.titre}"
