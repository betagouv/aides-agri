import pathlib

from django.core.management.base import BaseCommand

from ...models import Organisme


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("organisme_id", type=int)
        parser.add_argument("logo_file", type=pathlib.Path)

    def handle(self, *args, **options):
        try:
            organisme = Organisme.objects.get(pk=options["organisme_id"])
            with open(options["logo_file"], "rb") as f:
                organisme.logo = f.read()
                organisme.logo_filename = str(options["logo_file"])
                organisme.save()
        except Organisme.DoesNotExist:
            print("Wrong organisme_id")
