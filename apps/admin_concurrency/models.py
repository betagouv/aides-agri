import pgtrigger
from django.contrib.auth import get_user_model
from django.db import models


class Use(models.Model):
    class Meta:
        abstract = True

    obj = models.CharField()
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    last_seen = models.DateTimeField(auto_now=True)


class Read(Use):
    class Meta:
        triggers = [
            pgtrigger.Trigger(
                name="delete_expired",
                level=pgtrigger.Statement,
                when=pgtrigger.After,
                operation=pgtrigger.Operations(pgtrigger.Insert, pgtrigger.Update),
                func="DELETE FROM admin_concurrency_read WHERE last_seen < NOW() - INTERVAL '1 minute'; RETURN NEW;",
            )
        ]


class Write(Use):
    class Meta:
        unique_together = ("obj", "user")
