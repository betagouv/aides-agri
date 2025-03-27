from django.db import models


class GristModel(models.Model):
    class Meta:
        abstract = True

    external_id = models.PositiveBigIntegerField(primary_key=True)
    nom = models.CharField()

    def __str__(self):
        return self.nom
