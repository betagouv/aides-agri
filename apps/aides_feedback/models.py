import uuid

from django.db import models

from aides.models import Aide


class Feedback(models.Model):
    class Meta:
        abstract = True

    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_agent = models.CharField(blank=True, verbose_name="Navigateur web")
    is_spam = models.BooleanField(default=False, verbose_name="Spam")
    sent_at = models.DateTimeField(auto_now_add=True, verbose_name="Date")
    sent_from_url = models.URLField(
        blank=True, max_length=2000, verbose_name="URL concernée"
    )


class FeedbackOnThemesAndSujets(Feedback):
    class Meta:
        verbose_name = "Retour utilisateurice sur les thèmes et sujets"
        verbose_name_plural = "Retours utilisateurices sur les thèmes et sujets"

    message = models.TextField()


class FeedbackOnAides(Feedback):
    class Meta:
        verbose_name = "Retour utilisateurice sur les aides"
        verbose_name_plural = "Retours utilisateurices sur les aides"

    class Notes(models.IntegerChoices):
        PAS_DU_TOUT = 0, "Pas du tout"
        UN_PEU = 25, "Un peu"
        MOYEN = 50, "Moyen"
        BEAUCOUP = 75, "Beaucoup"
        PARFAIT = 100, "Parfait !"

    usefulness = models.PositiveSmallIntegerField(
        choices=Notes,
        verbose_name="Cette page vous a-t-elle été utile ?",
    )
    information_quality = models.PositiveSmallIntegerField(
        choices=Notes,
        null=True,
        verbose_name="Selon vous, l’information qui vous a été donnée est-elle qualitative ?",
    )
    comments = models.TextField(
        blank=True,
        verbose_name="Quelles sont les améliorations à effectuer selon vous ?",
    )
    aide = models.ForeignKey(
        Aide, null=True, on_delete=models.CASCADE, verbose_name="Aide concernée"
    )
