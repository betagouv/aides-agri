from django.db import models


class Feedback(models.Model):
    class Meta:
        verbose_name = "Feedback sur les thèmes et sujets"
        verbose_name_plural = "Feedbacks sur les thèmes et sujets"

    sent_at = models.DateTimeField(auto_now_add=True)
    sent_from_url = models.URLField(blank=True, default="")
    message = models.TextField()
