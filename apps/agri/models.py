from admin_ordering.models import OrderableModel
from django.db import models


class AboutPageQuote(OrderableModel):
    class Meta(OrderableModel.Meta):
        verbose_name = "Citation pour la page À propos"
        verbose_name_plural = "Citations pour la page À propos"

    quote = models.TextField(verbose_name="Verbatim")
    author = models.CharField(verbose_name="Auteur ou autrice")
    source_label = models.CharField(blank=True, verbose_name="Source : libellé")
    source_url = models.CharField(blank=True, verbose_name="Source : lien")

    @property
    def quote_french(self):
        return f"« {self.quote} »"
