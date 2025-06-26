from django.contrib.admin.apps import SimpleAdminConfig


class AidesAgriAdminConfig(SimpleAdminConfig):
    def ready(self):
        self.default_site = "conf.admin.AidesAgriAdminSite"
        self.module.autodiscover()
