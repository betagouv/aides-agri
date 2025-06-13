from django.core.management.base import BaseCommand

from ...models import Organisme


class Command(BaseCommand):
    def handle(self, *args, **options):
        for organisme in Organisme.objects.having_logo():
            with open(
                f"webroot/aides/organismes-logos/{organisme.logo_filename}", "wb"
            ) as f:
                f.write(organisme.logo)
