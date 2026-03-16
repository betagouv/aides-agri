from django.apps import AppConfig


class AgriConfig(AppConfig):
    name = "agri"
    verbose_name = "Parcours agri"

    def ready(self):
        # signal handlers
        from .signals import handlers  # noqa: F401
