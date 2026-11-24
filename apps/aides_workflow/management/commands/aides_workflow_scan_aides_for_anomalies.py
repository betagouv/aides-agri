import logging

import requests
from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import send_mail
from django.core.management.base import BaseCommand
from django.urls import reverse

from aides.models import Aide

from ...models import Anomaly

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

    @staticmethod
    def _create_or_update_anomaly(
        aide: Aide, field: Anomaly.FaultyUrlField, http_status_code: int
    ) -> bool:
        anomaly, created = Anomaly.objects.get_or_create(
            aide=aide,
            faulty_url_field=field,
            faulty_url=getattr(aide, field),
            http_status_code=http_status_code,
        )
        if not created:
            anomaly.occurrences_count += 1
            anomaly.save()
        return created

    def handle(self, *args, **options):
        new_anomalies = 0
        for aide in Aide.objects.official_published():
            for field in Anomaly.FaultyUrlField:
                if getattr(aide, field):
                    if (status_code := self._do_request(getattr(aide, field))) != 200:
                        created = self._create_or_update_anomaly(
                            aide, field, status_code
                        )
                        if created:
                            new_anomalies += 1

        if new_anomalies:
            base_url = settings.HTTP_SCHEME + get_current_site(None).domain
            admin_anomalies_url = base_url + reverse(
                "admin:aides_workflow_anomaly_changelist",
                query={"status__exact": Anomaly.Status.NEW},
            )
            sentence = (
                f"{new_anomalies} nouvelles anomalies"
                if new_anomalies > 1
                else "une nouvelle anomalie"
            )
            send_mail(
                f"Qualité des aides : {sentence} détectées",
                f"""Bonjour,\n\nLors de la vérification quotidienne des aides publiées sur Aides Agri, {sentence} ont été repérées. Retrouvez-les ici : {admin_anomalies_url}.\n\nBonne journée,""",
                settings.DEFAULT_FROM_EMAIL,
                settings.AIDES_MANAGERS,
            )
