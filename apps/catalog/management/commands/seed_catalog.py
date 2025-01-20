from django.core.management.base import BaseCommand
from apps.catalog.models import Region

class Command(BaseCommand):
    help = 'Seeds the catalog'
    def handle(self, *args, **options):
        self.stdout.write('Seeding the catalog')
        regions = [
            {"name": "Auvergne-Rhône-Alpes"},
            {"name": "Bourgogne-Franche-Comté"},
        ]
        for region in regions:
            self.stdout.write(f'Seeding {region["name"]}')
            #Store in database questionnaire.Region
            Region.objects.get_or_create(name=region["name"])