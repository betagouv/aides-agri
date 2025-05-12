from django.db import models


class UserNote(models.Model):
    class Meta:
        verbose_name = "Appréciation"
        verbose_name_plural = "Appréciations"

    class Notes(models.IntegerChoices):
        PAS_DU_TOUT = 0, "Pas du tout"
        UN_PEU = 25, "Un peu"
        MOYEN = 50, "Moyen"
        BEAUCOUP = 75, "Beaucoup"
        PARFAIT = 100, "Parfait !"

    sent_at = models.DateTimeField(auto_now_add=True, verbose_name="Date et heure")
    usefulness = models.PositiveSmallIntegerField(
        choices=Notes, verbose_name="Cette page vous a-t-elle été utile ?"
    )


class UserFeedback(models.Model):
    class Meta:
        verbose_name = "Retour utilisateur"
        verbose_name_plural = "Retours utilisateurs"

    class Notes(models.IntegerChoices):
        PAS_DU_TOUT = 0, "Pas du tout"
        UN_PEU = 25, "Un peu"
        MOYEN = 50, "Moyen"
        BEAUCOUP = 75, "Beaucoup"
        PARFAIT = 100, "Parfait !"

    sent_at = models.DateTimeField(auto_now_add=True, verbose_name="Date et heure")
    information_quality = models.PositiveSmallIntegerField(
        choices=Notes,
        verbose_name="L’information qui vous a été donnée est-elle qualitative selon vous ?",
    )
    comments = models.TextField(
        verbose_name="Quelles sont les améliorations à effectuer selon vous ?"
    )
