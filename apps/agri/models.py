from admin_ordering.models import OrderableModel
from django.db import models
from django.utils.crypto import get_random_string

from aides.models import Filiere, Sujet, Theme, ZoneGeographique


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


class AlerteQuerySet(models.QuerySet):
    def by_token(self, token: str) -> models.QuerySet["Alerte"]:
        return self.filter(token=token)


class Alerte(models.Model):
    date_creation = models.DateTimeField(auto_now_add=True)
    token = models.CharField()
    email = models.EmailField()
    departement = models.ForeignKey(
        ZoneGeographique,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        limit_choices_to={"type": ZoneGeographique.Type.DEPARTEMENT},
    )
    filieres = models.ManyToManyField(Filiere, blank=True)
    sujets = models.ManyToManyField(Sujet, blank=True)
    themes = models.ManyToManyField(Theme, blank=True)

    objects = AlerteQuerySet.as_manager()

    def save(self, *args, **kwargs):
        if not self.pk:
            alerte_for_same_email = Alerte.objects.filter(email=self.email).first()
            if alerte_for_same_email:
                self.token = alerte_for_same_email.token
            else:
                self.token = get_random_string(32)
        super().save(*args, **kwargs)

    @property
    def libelle(self):
        items = []
        if self.departement:
            items.append(self.departement.nom)
        items.extend(list(self.filieres.values_list("nom", flat=True)))
        items.extend(list(self.sujets.values_list("nom_court", flat=True)))
        items.extend(list(self.themes.values_list("nom_court", flat=True)))
        return " / ".join(items) if items else "Toutes les aides"
