from django.core.management.base import BaseCommand

from ...tasks import import_region_occitanie_feed


class Command(BaseCommand):
    def handle(self, *args, **options):
        import_region_occitanie_feed.enqueue()
