import logging

import requests
import sentry_sdk
from django.core.management.base import BaseCommand

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
                message = f"L’aide {aide.pk} a été dépubliée parce que son URL de descritif {reason}."
                logger.warning(message)
                sentry_sdk.capture_message(message)
