import logging

import requests
from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.core.management.base import BaseCommand
from django.core.mail import send_mail
from django.urls import reverse

from ...models import Aide


logger = logging.getLogger(__name__)


class Command(BaseCommand):
    HTTP_HEADERS = {"User-Agent": "AidesAgri/1.0"}

    @classmethod
    def _do_request(cls, url: str, verify: bool = True) -> int:
        try:
            r = requests.get(url, timeout=10, verify=verify, headers=cls.HTTP_HEADERS)
            return r.status_code
        except requests.exceptions.SSLError as e:
            logger.warning(e)
            return cls._do_request(url, verify=False)
        except requests.exceptions.ConnectionError:
            return 0

    def handle(self, *args, **options):
        for aide in Aide.objects.published():
            status_code = self._do_request(aide.url_descriptif)

            if status_code != 200:
                aide.published = False
                aide.save()
                if status_code == 0:
                    reason = "était injoignable"
                else:
                    reason = f"returnait une erreur {status_code}"
                url = (
                    "https://"
                    + get_current_site(None).domain
                    + reverse("admin:aides_aide_change", args=[aide.pk])
                )
                message = f"L’aide suivante a été dépubliée parce que son URL de descritif {reason} : {aide.nom} ({url})"
                logger.warning(message)
                send_mail(
                    f"[Aides Agri {settings.ENVIRONMENT}] Une aide a été dépubliée",
                    message,
                    settings.DEFAULT_FROM_EMAIL,
                    settings.AIDES_MANAGERS,
                )
