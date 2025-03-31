from django.contrib import admin

from grist_loader.admin import AbstractGristModelAdmin

from .models import Filiere, SousFiliere, Production, GroupementProducteurs


@admin.register(GroupementProducteurs)
class GroupementProducteursAdmin(AbstractGristModelAdmin):
    list_display = AbstractGristModelAdmin.list_display + (
        "nom",
        "libelle",
    )
    fields = ("nom", "libelle")


@admin.register(Filiere)
class FiliereAdmin(AbstractGristModelAdmin):
    list_display = AbstractGristModelAdmin.list_display + (
        "nom",
        "position",
    )
    fields = ("nom", "position")


@admin.register(SousFiliere)
class SousFiliereAdmin(AbstractGristModelAdmin):
    list_display = AbstractGristModelAdmin.list_display + (
        "nom",
        "filiere",
    )
    fields = ("nom", "filiere")


@admin.register(Production)
class ProductionAdmin(AbstractGristModelAdmin):
    list_display = AbstractGristModelAdmin.list_display + (
        "nom",
        "sous_filiere",
    )
    fields = ("nom", "sous_filiere")
