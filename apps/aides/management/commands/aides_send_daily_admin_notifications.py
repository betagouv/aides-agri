from collections import defaultdict
from datetime import timedelta

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import send_mail
from django.core.management.base import BaseCommand
from django.urls import reverse
from django.utils.timezone import now

from ...models import Aide


class Command(BaseCommand):
    def handle(self, *args, **options):
        base_url = settings.HTTP_SCHEME + get_current_site(None).domain
        subject = f"[Aides Agri {settings.ENVIRONMENT}] Notifications internes du jour"
        aides_assigned_to_users = defaultdict(set)
        aides_cced_to_users = defaultdict(set)
        for aide in Aide.objects.filter(date_modified__gt=now() - timedelta(days=1)):
            aides_assigned_to_users[aide.assigned_to_id].add(aide)
            for cc in aide.cc_to.all():
                aides_cced_to_users[cc.pk].add(aide)

        for user in get_user_model().objects.all():
            if (
                user.pk not in aides_assigned_to_users
                and user.pk not in aides_cced_to_users
            ):
                continue

            aides_assigned = ""
            aides_cced = ""
            if user.pk in aides_assigned_to_users:
                aides_assigned = "Aides qui te sont assignées :\n\n" + "\n".join(
                    [
                        f"- {aide.nom}, portée par {aide.organisme.nom} : {base_url}{reverse('admin:aides_aide_change', args=[aide.pk])}"
                        for aide in aides_assigned_to_users[user.pk]
                    ]
                )

            if user.pk in aides_cced_to_users:
                aides_cced = "Aides dont tu es en CC :\n\n" + "\n".join(
                    [
                        f"- {aide.nom}, portée par {aide.organisme.nom} : {base_url}{reverse('admin:aides_aide_change', args=[aide.pk])}"
                        for aide in aides_cced_to_users[user.pk]
                    ]
                )

            send_mail(
                subject,
                f"""Il y a eu du mouvement sur les aides suivantes dans les dernières 24 heures :

{aides_assigned}

{aides_cced}
""",
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
            )
