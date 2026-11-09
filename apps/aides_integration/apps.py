from django.apps import AppConfig


class AidesIntegrationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "aides_integration"
    verbose_name = "Aides : intégration"

    def ready(self):
        from .signals import handlers  # noqa: F401
