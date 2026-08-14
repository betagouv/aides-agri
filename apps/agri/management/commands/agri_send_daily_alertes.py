from datetime import timedelta

from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.core.management.base import BaseCommand

from ...models import Alerte
from ...tasks import maybe_send_daily_alerte


class Command(BaseCommand):
    def handle(self, *args, **options):
        base_url = settings.HTTP_SCHEME + get_current_site(None).domain
        for alerte in Alerte.objects.all():
            maybe_send_daily_alerte.enqueue(
                alerte.pk, timedelta(days=1).total_seconds(), base_url
            )
