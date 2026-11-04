from datetime import datetime, timedelta

from django.conf import settings
from django.core.mail import send_mail
from django.core.management.base import BaseCommand

from ...models import Alerte


class Command(BaseCommand):
    def handle(self, *args, **options):
        since = datetime.now() - timedelta(days=1)
        alertes_created_since = Alerte.objects.filter(date_creation__gte=since).count()
        if alertes_created_since > settings.AGRI_HIGH_DAILY_ALERTES_COUNT:
            send_mail(
                f"Aides Agri {settings.ENVIRONMENT} : beaucoup d’alertes créées en 24 heures",
                f"{alertes_created_since} alertes ont été créées en 24 heures, à surveiller.",
                settings.DEFAULT_FROM_EMAIL,
                settings.AIDES_ADMINS,
            )
