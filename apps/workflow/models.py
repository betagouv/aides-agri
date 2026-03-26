from django.conf import settings
from django.db import models

from aides.models import Aide
from referentiel.models import DemarcheAgricole
from referentiel_integration.models import RawDemarche


class Assignment(models.Model):
    class Meta:
        unique_together = ("user", "raw_demarche", "demarche_agricole", "aide")

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    raw_demarche = models.ForeignKey(RawDemarche, null=True, on_delete=models.CASCADE)
    demarche_agricole = models.ForeignKey(
        DemarcheAgricole, null=True, on_delete=models.CASCADE
    )
    aide = models.ForeignKey(Aide, null=True, on_delete=models.CASCADE)


class CC(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    raw_demarche = models.ForeignKey(RawDemarche, null=True, on_delete=models.CASCADE)
    demarche_agricole = models.ForeignKey(
        DemarcheAgricole, null=True, on_delete=models.CASCADE
    )
    aide = models.ForeignKey(Aide, null=True, on_delete=models.CASCADE)
