from django.db import models


class IncomingDispositif(models.Model):
    class Meta:
        abstract = True

    source = models.CharField()


class DispositifSchemaAide(IncomingDispositif):
    class Meta:
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
        return f"{self.source}-{self.id_externe}"
