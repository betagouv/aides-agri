from datetime import datetime, timedelta, UTC

from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.core.management.base import BaseCommand
from django.core.mail import send_mail
from django.urls import reverse

from ...models import FeedbackOnThemesAndSujets, FeedbackOnAides


class Command(BaseCommand):
    def handle(self, *args, **options):
        feedback_on_themes_and_sujets_count = FeedbackOnThemesAndSujets.objects.filter(
            sent_at__gt=datetime.now(UTC) - timedelta(days=1)
        ).count()
        feedback_on_aides_count = FeedbackOnAides.objects.filter(
            sent_at__gt=datetime.now(UTC) - timedelta(days=1)
        ).count()
        if feedback_on_themes_and_sujets_count or feedback_on_aides_count:
            base_url = settings.HTTP_SCHEME + get_current_site(None).domain
            url_admin_feedback_on_themes_sujets = base_url + reverse(
                "admin:aides_feedback_feedbackonthemesandsujets_changelist"
            )
            url_admin_feedback_on_aides = base_url + reverse(
                "admin:aides_feedback_feedbackonaides_changelist"
            )
            send_mail(
                f"[Aides Agri {settings.ENVIRONMENT}] Des retours utilisateurices ont été enregistrés dans les dernières 24 heures !",
                f"""- Nombre de nouveaux retours sur les thèmes et sujets : {feedback_on_themes_and_sujets_count} (voir : {url_admin_feedback_on_themes_sujets})
- Nombre de nouveaux retours sur les aides : {feedback_on_aides_count} (voir : {url_admin_feedback_on_aides})
""",
                settings.DEFAULT_FROM_EMAIL,
                settings.AIDES_MANAGERS,
            )
