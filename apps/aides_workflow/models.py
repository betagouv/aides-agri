from django.db import models

from aides.models import Aide


class Anomaly(models.Model):
    class Status(models.TextChoices):
        NEW = "1_NEW", "1. Nouvelle"
        KNOWN = "2_KNOWN", "2. Faux positif"
        RESOLVED = "3_RESOLVED", "3. Résolue"

    class FaultyUrlField(models.TextChoices):
        URL_DESCRIPTIF = Aide.url_descriptif.field.name, "URL de descriptif"
        URL_DEMARCHE = Aide.url_demarche.field.name, "URL de la démarche"

    class Meta:
        verbose_name = "Anomalie sur une Aide"
        verbose_name_plural = "Anomalies sur les Aides"
        unique_together = ("aide", "faulty_url_field", "http_status_code")

    status = models.CharField(choices=Status, default=Status.NEW, verbose_name="État")
    date_first_detected = models.DateTimeField(
        auto_now_add=True, verbose_name="Depuis le"
    )
    date_last_detected = models.DateTimeField(
        auto_now=True, verbose_name="Vue pour la dernière fois le"
    )
    occurrences_count = models.PositiveIntegerField(
        default=1, verbose_name="Nombre d’occurences"
    )

    aide = models.ForeignKey(
        Aide, on_delete=models.CASCADE, verbose_name="Aide concernée"
    )
    faulty_url_field = models.CharField(
        choices=FaultyUrlField, verbose_name="Champ concerné dans l’aide"
    )
    faulty_url = models.URLField(
        max_length=2000, verbose_name="Lien concerné, à re-tester à la main"
    )
    http_status_code = models.IntegerField(
        verbose_name="Statut HTTP de l’URL concernée"
    )

    def __str__(self):
        return f"{self.aide} – {self.get_faulty_url_field_display()}"

    @property
    def is_open(self):
        return self.status in (Anomaly.Status.NEW, Anomaly.Status.KNOWN)
