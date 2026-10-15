import reversion
from django.db import models

from .base import RawAide, RawDataFromExternalSource


@reversion.register()
class RawAideFranceAgriMer(RawDataFromExternalSource, RawAide):
    class Meta:
        verbose_name = "Donnée brute venant de FranceAgriMer"
        verbose_name_plural = "Données brutes venant de FranceAgriMer"
        unique_together = ("source", "id_externe")

    # schema cœur
    id_externe = models.CharField(
        verbose_name="Identifiant dans le système d‘information source"
    )
    titre = models.CharField(verbose_name="Titre")
    description = models.TextField(blank=True, verbose_name="Description")

    def __str__(self):
        return f"{self.source}-{self.id_externe}"
