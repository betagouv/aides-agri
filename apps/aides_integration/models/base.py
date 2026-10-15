from django.db import models
from django.contrib.admin.templatetags.admin_urls import admin_urlname

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


class RawAide(models.Model):
    class Status(models.TextChoices):
        NEW = "1_NEW", "1. Nouvelle"
        UPDATED = "1_1_UPDATED", "1.1. Mise à jour"
        IN_PROGRESS = "2_IN_PROGRESS", "2. En traitement"
        DONE = "3_DONE", "3. Traitée"
        DELETED = "99_DELETED", "99. Supprimée à la source"

    objects = RawAideQuerySet.as_manager()

    status = models.CharField(choices=Status, default=Status.NEW, verbose_name="État")
    aide = models.ForeignKey(
        Aide, null=True, on_delete=models.SET_NULL, verbose_name="Aide dans Aides Agri"
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

    def save(self, *args, update_status=True, **kwargs):
        if update_status and self.pk and self.aide:
            self.status = self.__class__.Status.UPDATED
        super().save(*args, **kwargs)

    def get_admin_urlname(self) -> str:
        return admin_urlname(self.__class__._meta, "change")
