from datetime import timedelta

from django.core.management.base import BaseCommand

from ...models import Alerte
from ...tasks import maybe_send_daily_alerte


class Command(BaseCommand):
    def handle(self, *args, **options):
        for alerte in Alerte.objects.all():
            maybe_send_daily_alerte.enqueue(
                alerte.pk, timedelta(days=1).total_seconds(), "http://localhost:8000"
            )
