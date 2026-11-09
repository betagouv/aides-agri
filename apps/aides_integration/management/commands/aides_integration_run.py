from django.core.management.base import BaseCommand


class Command(BaseCommand):
    def handle(self, *args, **options):
        # here go all integration tasks enqueuing
        pass
