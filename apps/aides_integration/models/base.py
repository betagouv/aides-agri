import reversion
from django.db import models
from django.contrib.admin.templatetags.admin_urls import admin_urlname
from reversion.models import Version

from aides.models import Aide


class RawDataFromExternalSource(models.Model):
    class Meta:
        abstract = True

    source = models.CharField()


class RawAideQuerySet(models.QuerySet):
    def new(self):
        return self.filter(status=RawAide.Status.NEW)

    def updated(self):
        return self.filter(status=RawAide.Status.UPDATED)

    def to_do(self):
        return self.filter(status__in=(RawAide.Status.NEW, RawAide.Status.UPDATED))

    def done(self):
        return self.filter(status=RawAide.Status.DONE)

    def soft_deleted(self):
        return self.filter(status=RawAide.Status.DELETED)


@reversion.register()
class RawAide(models.Model):
    class Status(models.TextChoices):
        NEW = "1_NEW", "1. Nouvelle"
        UPDATED = "1_1_UPDATED", "1.1. Mise à jour"
        IN_PROGRESS = "2_IN_PROGRESS", "2. En traitement"
        DONE = "3_DONE", "3. Traitée"
        EXCLUDED = "98_EXCLUDED", "98. Non pertinente"
        DELETED = "99_DELETED", "99. Supprimée à la source"

    objects = RawAideQuerySet.as_manager()

    status = models.CharField(choices=Status, default=Status.NEW, verbose_name="État")
    aide = models.ForeignKey(
        Aide, null=True, on_delete=models.SET_NULL, verbose_name="Aide dans Aides Agri"
    )
    integrated_version = models.ForeignKey(
        Version,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name="Version intégrée dans Aides Agri",
    )

    @property
    def is_new(self):
        return self.status == self.__class__.Status.NEW

    @property
    def is_updated(self):
        return self.status == self.__class__.Status.UPDATED

    @property
    def is_deleted(self):
        return self.status == self.__class__.Status.DELETED

    def save(self, *args, source=None, **kwargs):
        if source:
            if self.pk and self.aide:
                self.status = self.__class__.Status.UPDATED
            with reversion.create_revision():
                super().save(*args, **kwargs)
                reversion.set_comment(source)
                return
        super().save(*args, **kwargs)

    def _get_real(self) -> "RawAide":
        for subclass in self.__class__.__subclasses__():
            subclass_onetoone = subclass.__name__.lower()
            if hasattr(self, subclass_onetoone) and getattr(self, subclass_onetoone):
                return getattr(self, subclass_onetoone)
        raise ValueError("RawData must not be created on its own.")

    def get_admin_urlname(self) -> str:
        return admin_urlname(self._get_real()._meta, "change")

    def __str__(self):
        return str(self._get_real())
