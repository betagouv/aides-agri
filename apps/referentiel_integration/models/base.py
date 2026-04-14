from django.db import models
from django.contrib.admin.templatetags.admin_urls import admin_urlname

from referentiel.models import Demarche


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
    demarche = models.ForeignKey(Demarche, null=True, on_delete=models.SET_NULL)

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
