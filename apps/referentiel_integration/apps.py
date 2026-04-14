from django.apps import AppConfig


class ReferentielIntegrationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "referentiel_integration"
    verbose_name = "Référentiel des démarches agricoles : intégration"

    def ready(self):
        from .signals import handlers  # noqa: F401
