import logging

from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.core.management.base import BaseCommand
from django.core.mail import send_mail
from django.urls import reverse

from ...models import Aide


logger = logging.getLogger(__name__)


class Command(BaseCommand):
    def handle(self, *args, **options):
        for aide in Aide.objects.pending():
            aide.status = Aide.Status.PUBLISHED

            url = (
                "https://"
                + get_current_site(None).domain
                + reverse("admin:aides_aide_change", args=[aide.pk])
            )
            message = (
                f"L’aide suivante a été publiée automatiquement : {aide.nom} ({url})"
            )
            logger.warning(message)
            send_mail(
                f"[Aides Agri {settings.ENVIRONMENT}] Une aide a été publiée",
                message,
                settings.DEFAULT_FROM_EMAIL,
                settings.AIDES_MANAGERS,
            )
