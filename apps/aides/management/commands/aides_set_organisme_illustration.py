import pathlib

from django.core.management.base import BaseCommand

from ...models import Organisme


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("organisme_id", type=int)
        parser.add_argument("illustration_file", type=pathlib.Path)

    def handle(
        self, *args, organisme_id: int, illustration_file: pathlib.Path, **options
    ):
        try:
            organisme = Organisme.objects.get(pk=organisme_id)
            with open(illustration_file, "rb") as f:
                organisme.logo = f.read()
                organisme.save()
        except Organisme.DoesNotExist:
            print("Wrong organisme_id")
