from django.contrib.admin.apps import SimpleAdminConfig


class AidesAgriAdminConfig(SimpleAdminConfig):
    def ready(self):
        from .admin import admin_site

        self.default_site = admin_site
