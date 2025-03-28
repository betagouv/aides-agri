from django.db import models

from grist.models import GristModel


class Filiere(GristModel):
    class Meta:
        verbose_name = "Filière"
        verbose_name_plural = "Filières"
        ordering = ("position",)

    position = models.IntegerField(unique=True, default=0)
    code_naf = models.CharField(max_length=10, blank=True)


class SousFiliere(GristModel):
    class Meta:
        verbose_name = "Sous-filière"
        verbose_name_plural = "Sous-filières"

    filiere = models.ForeignKey(Filiere, on_delete=models.CASCADE, null=True)


class Production(GristModel):
    class Meta:
        verbose_name = "Détail de production"
        verbose_name_plural = "Détails de production"

    sous_filiere = models.ForeignKey(SousFiliere, on_delete=models.CASCADE, null=True)


class GroupementProducteurs(GristModel):
    class Meta:
        verbose_name = "Groupement de producteurs"
        verbose_name_plural = "Groupement de producteurs"
        ordering = ("-nom",)

    libelle = models.CharField(max_length=200, blank=True)
