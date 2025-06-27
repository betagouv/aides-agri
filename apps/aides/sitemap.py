from django.contrib.sitemaps import Sitemap

from .models import Aide


class AidesSitemap(Sitemap):
    changefreq = "weekly"
    priority = 1.0

    def items(self):
        return Aide.objects.published()

    def lastmod(self, obj: Aide):
        return obj.last_published_at
