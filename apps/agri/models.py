from django.db import models


class Feedback(models.Model):
    sent_at = models.DateTimeField(auto_now_add=True)
    sent_from_url = models.URLField(blank=True, default="")
    message = models.TextField()
