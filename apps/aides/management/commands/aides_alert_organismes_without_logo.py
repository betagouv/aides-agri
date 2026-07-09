from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import send_mail
from django.core.management.base import BaseCommand
from django.urls import reverse

from ...models import Organisme


class Command(BaseCommand):
    def handle(self, *args, **options):
        base_url = settings.HTTP_SCHEME + get_current_site(None).domain
        messages = "\n".join(
            f"- {o.nom} : {base_url}{reverse('admin:aides_organisme_change', args=[o.pk])}"
            for o in Organisme.objects.filter(
                aides__is_published=True, has_illustration=False
            ).distinct()
        )
        if messages:
            send_mail(
                f"[Aides Agri {settings.ENVIRONMENT}] Logos manquants",
                "Les organismes suivants ont au moins une aide publiée mais pas de logo :\n\n"
                + messages,
                settings.DEFAULT_FROM_EMAIL,
                settings.AIDES_MANAGERS,
            )
