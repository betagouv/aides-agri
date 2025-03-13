from django.apps import AppConfig


class AgriConfig(AppConfig):
    name = "agri"

    def ready(self):
        # ensure siret NAF codes mapping is run at application startup
        from . import siret  # noqa
