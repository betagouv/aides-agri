from django.core.management.base import BaseCommand

from ...loaders import geoapi


class Command(BaseCommand):
    def handle(self, *args, **options):
        geoapi.load()
