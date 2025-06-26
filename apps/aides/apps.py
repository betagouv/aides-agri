from django.apps import AppConfig


class AidesConfig(AppConfig):
    name = "aides"

    def ready(self):
        from .signals import handlers  # noqa: F401
