from django.db import models
from django.contrib.postgres import fields as postgres_fields

from .base import RawDataFromExternalSource, RawAide


class RawAideRegionOccitanie(RawDataFromExternalSource, RawAide):
    class Meta:
        verbose_name = "Aide à intégrer venant de Région Occitanie"
        verbose_name_plural = "Aides à intégrer venant de Région Occitanie"
        unique_together = ("source", "id_externe")

    # tech fields
    id_externe = models.CharField(
        unique=True, verbose_name="Identifiant dans le système d‘information source"
    )
    hash = models.CharField()
    date_modification = models.DateTimeField(verbose_name="Date de modification")

    # raw data fields
    url_source = models.URLField(verbose_name="URL source")
    titre = models.CharField(blank=True, verbose_name="Titre")
    publics = postgres_fields.ArrayField(
        models.TextField(), null=True, verbose_name="Publics"
    )
    thematiques = postgres_fields.ArrayField(
        models.TextField(), null=True, verbose_name="Thématiques"
    )

    def __str__(self):
        return f"{self.source}-{self.id_externe}"
