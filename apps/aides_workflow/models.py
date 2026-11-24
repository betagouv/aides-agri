from django.conf import settings
from django.db import models

from aides.models import Aide
from aides_integration.models.base import RawAide


class Assignment(models.Model):
    class Meta:
        unique_together = ("user", "raw_aide", "aide")

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    raw_aide = models.ForeignKey(RawAide, null=True, on_delete=models.CASCADE)
    aide = models.ForeignKey(Aide, null=True, on_delete=models.CASCADE)


class CC(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    raw_aide = models.ForeignKey(RawAide, null=True, on_delete=models.CASCADE)
    aide = models.ForeignKey(Aide, null=True, on_delete=models.CASCADE)
