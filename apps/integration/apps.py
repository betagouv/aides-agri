from django.apps import AppConfig


class ReferentielIntegrationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "integration"
    verbose_name = "Intégration de données brutes"

    def ready(self):
        from .signals import handlers  # noqa: F401
