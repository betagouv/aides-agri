from django.db import models
from django.contrib.admin.templatetags.admin_urls import admin_urlname

from aides.models import Aide
from referentiel.models import Demarche


class RawDataFromExternalSource(models.Model):
    class Meta:
        abstract = True

    source = models.CharField()


class RawDataQuerySet(models.QuerySet):
    def new(self):
        return self.filter(status=RawData.Status.NEW)

    def updated(self):
        return self.filter(status=RawData.Status.UPDATED)

    def to_do(self):
        return self.filter(status__in=(RawData.Status.NEW, RawData.Status.UPDATED))


class RawData(models.Model):
    class Status(models.TextChoices):
        NEW = "1_NEW", "1. Nouvelle"
        UPDATED = "1_1_UPDATED", "1.1. Mise à jour"
        IN_PROGRESS = "2_IN_PROGRESS", "2. En traitement"
        DONE = "3_DONE", "3. Traitée"

    objects = RawDataQuerySet.as_manager()

    status = models.CharField(choices=Status, default=Status.NEW, verbose_name="État")
    demarche = models.ForeignKey(
        Demarche,
        null=True,
        on_delete=models.SET_NULL,
        verbose_name="Démarche dans le référentiel",
    )
    aide = models.ForeignKey(
        Aide, null=True, on_delete=models.SET_NULL, verbose_name="Aide dans Aides Agri"
    )

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

    def _get_real(self) -> "RawData":
        for subclass in self.__class__.__subclasses__():
            subclass_onetoone = subclass.__name__.lower()
            if hasattr(self, subclass_onetoone) and getattr(self, subclass_onetoone):
                return getattr(self, subclass_onetoone)
        raise ValueError("RawData must not be created on its own.")

    def get_admin_urlname(self) -> str:
        return admin_urlname(self._get_real()._meta, "change")

    def __str__(self):
        return str(self._get_real())
