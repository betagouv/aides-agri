from django.contrib.sitemaps import Sitemap
from django.urls import reverse


class AgriSitemap(Sitemap):
    changefreq = "never"
    priority = 0.5

    def items(self):
        return ["agri:home"]

    def location(self, item):
        return reverse(item)
