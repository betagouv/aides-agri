from django.core.management.base import BaseCommand

from ...loader import registry


class Command(BaseCommand):
    def handle(self, *args, **options):
        for loader in registry:
            loader().load()
