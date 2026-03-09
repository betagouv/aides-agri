from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.core.management.base import BaseCommand
from django.core.mail import send_mail
from django.urls import reverse

from ...models import Aide


class Command(BaseCommand):
    def handle(self, *args, **options):
        unpublished = []
        base_url = settings.HTTP_SCHEME + get_current_site(None).domain
        for aide in Aide.objects.published().closed():
            unpublished.append(
                f"- {base_url}{reverse('admin:aides_aide_change', args=[aide.pk])} : {aide.nom}"
            )
            aide.is_published = False
            aide.save()
        if unpublished:
            send_mail(
                "Dépublication automatique d’aides clôturées",
                "Les aides suivantes sont fermées et ont donc été dépubliées :\n"
                + "\n".join(unpublished),
                settings.DEFAULT_FROM_EMAIL,
                settings.AIDES_MANAGERS,
            )
