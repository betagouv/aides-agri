from django.db import models


class CounterEntry(models.Model):
    class Meta:
        unique_together = ("name", "date", "key")

    name = models.CharField()
    date = models.DateField()
    key = models.CharField()
    count = models.PositiveIntegerField()
