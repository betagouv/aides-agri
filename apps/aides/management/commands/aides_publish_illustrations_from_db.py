from django.conf import settings
from django.core.management.base import BaseCommand

from ...models import WithIllustration


class Command(BaseCommand):
    def handle(self, *args, **options):
        for model in WithIllustration.__subclasses__():
            for obj in model.objects.all().only("has_illustration", "illustration"):
                if not obj.illustration:
                    continue
                with open(
                    f"{settings.WEBROOT_PATH}/{obj.get_illustration_url()}", "wb"
                ) as f:
                    f.write(obj.illustration)
