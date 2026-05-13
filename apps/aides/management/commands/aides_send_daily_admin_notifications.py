from collections import defaultdict
from datetime import timedelta

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import send_mail
from django.core.management.base import BaseCommand
from django.urls import reverse
from django.utils.timezone import now
from reversion.models import Revision

from ...models import Aide


class Command(BaseCommand):
    @staticmethod
    def _summary_of_revisions_for_an_aide(
        aide: Aide, revisions: list[Revision], base_url: str
    ):
        summary = f"\n- {aide.organisme.nom_court}, {aide.nom} : {base_url}{reverse('admin:aides_aide_change', args=[aide.pk])}\n"
        summary += "\n".join(
            [
                f"    - {rev.date_created.strftime('%Hh%M')}, {rev.user.username} : {rev.comment}"
                for rev in revisions
            ]
        )
        return summary

    def handle(self, *args, **options):
        base_url = settings.HTTP_SCHEME + get_current_site(None).domain
        subject = f"[Aides Agri {settings.ENVIRONMENT}] Notifications internes du jour"
        aides_assigned_to_users = defaultdict(set)
        aides_cced_to_users = defaultdict(set)
        revisions_by_aide = defaultdict(list)
        content_type = ContentType.objects.get_for_model(Aide)

        for revision in Revision.objects.filter(
            version__content_type=content_type,
            date_created__gt=now() - timedelta(days=1),
        ):
            aide: Aide = revision.version_set.first().object
            revisions_by_aide[aide.pk].append(revision)
            aides_assigned_to_users[aide.assigned_to_id].add(aide)
            for cc in aide.cc_to.all():
                aides_cced_to_users[cc.pk].add(aide)

        for user in get_user_model().objects.filter(is_active=True, is_staff=True):
            if (
                user.pk not in aides_assigned_to_users
                and user.pk not in aides_cced_to_users
            ):
                continue

            aides_assigned = ""
            aides_cced = ""
            if user.pk in aides_assigned_to_users:
                aides_assigned = "Aides qui te sont assignées :\n"
                for aide in aides_assigned_to_users[user.pk]:
                    aides_assigned += self._summary_of_revisions_for_an_aide(
                        aide, revisions_by_aide[aide.pk], base_url
                    )

            if user.pk in aides_cced_to_users:
                aides_cced = "Aides dont tu es en CC :\n"
                for aide in aides_cced_to_users[user.pk]:
                    aides_cced += self._summary_of_revisions_for_an_aide(
                        aide, revisions_by_aide[aide.pk], base_url
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
