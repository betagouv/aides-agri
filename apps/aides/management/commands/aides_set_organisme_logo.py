import pathlib

from django.core.management.base import BaseCommand

from ...models import Organisme


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("organisme_id", type=int)
        parser.add_argument("logo_file", type=pathlib.Path)

    def handle(self, *args, organisme_id: int, logo_file: pathlib.Path, **options):
        try:
            organisme = Organisme.objects.get(pk=organisme_id)
            with open(logo_file, "rb") as f:
                organisme.logo = f.read()
                organisme.logo_filename = logo_file.name
                organisme.save()
        except Organisme.DoesNotExist:
            print("Wrong organisme_id")
