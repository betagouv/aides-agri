from django.apps import AppConfig


class AgriConfig(AppConfig):
    name = "agri"
    verbose_name = "Parcours agri"

    def ready(self):
        # ensure siret NAF codes mapping is run at application startup
        from . import siret  # noqa
