from django.apps import AppConfig


class AgriConfig(AppConfig):
    name = "agri"
    verbose_name = "Parcours agri"

    def ready(self):
        # signal handlers
        from .signals import handlers  # noqa: F401

        # ensure siret NAF codes mapping is run at application startup
        from . import siret  # noqa: F401
