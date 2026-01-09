import logging

import requests
from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.core.management.base import BaseCommand
from django.core.mail import send_mail
from django.urls import reverse
from django.utils.timezone import localtime

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
        except requests.exceptions.RequestException:
            return 0

    def handle(self, *args, **options):
        no_url_descriptif = set()
        unpublished = set()
        to_be_verified = set()
        for aide in Aide.objects.published():
            if not aide.url_descriptif:
                no_url_descriptif.add(aide)
            status_code = self._do_request(aide.url_descriptif)

            if status_code == 200:
                continue
            elif status_code == 404:
                aide.status = Aide.Status.ARCHIVED
                aide.is_published = False
                aide.internal_comments += f"\n\n{localtime().strftime('%d/%M/%Y %Hh%i')} : dépublication pour cause d’erreur 404"
                aide.save()
                unpublished.add(aide)
            else:
                to_be_verified.add((aide, status_code))

        base_url = settings.HTTP_SCHEME + get_current_site(None).domain
        messages = ""
        if no_url_descriptif:
            messages += "Les aides suivantes n’ont pas d’URL de descriptif :\n"
            messages += "\n".join(
                [
                    f"- {base_url}{reverse('admin:aides_aide_change', args=[aide.pk])} : {aide.nom}"
                    for aide in no_url_descriptif
                ]
            )
        if unpublished:
            messages += "\n\nLes aides suivantes ont été dépubliées car leurs URLs de descriptifs ont répondu des erreurs 404 :\n"
            messages += "\n".join(
                [
                    f"- {base_url}{reverse('admin:aides_aide_change', args=[aide.pk])} : {aide.nom} ({aide.url_descriptif})"
                    for aide in unpublished
                ]
            )
        if to_be_verified:
            messages += "\n\nLes aides suivantes ont besoin d’une vérification manuelles car leurs URLs de descriptifs ont répondu des erreurs autres que 404 :\n"
            messages += "\n".join(
                [
                    f"- {base_url}{reverse('admin:aides_aide_change', args=[aide.pk])} : {aide.nom} ({aide.url_descriptif} ; code HTTP {status_code})"
                    for aide, status_code in to_be_verified
                ]
            )
        if messages:
            send_mail(
                "Du ménage dans les aides",
                messages,
                settings.DEFAULT_FROM_EMAIL,
                settings.AIDES_MANAGERS,
            )
