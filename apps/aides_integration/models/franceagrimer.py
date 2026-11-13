from django.db import models

from .base import RawAide, RawDataFromExternalSource


class RawAideFranceAgriMer(RawDataFromExternalSource, RawAide):
    class Meta:
        verbose_name = "Aide à intégrer venant de FranceAgriMer"
        verbose_name_plural = "Aides à intégrer venant de FranceAgriMer"
        unique_together = ("source", "id_externe")

    id_externe = models.CharField(
        verbose_name="Identifiant dans le système d‘information source"
    )
    titre = models.CharField(verbose_name="Titre")
    description = models.TextField(blank=True, verbose_name="Description")

    def __str__(self):
        return f"{self.source}-{self.id_externe}"
