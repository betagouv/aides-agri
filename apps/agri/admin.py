from django.contrib import admin

from grist_loader.admin import AbstractGristModelAdmin

from .models import Filiere, SousFiliere, Production, GroupementProducteurs


@admin.register(GroupementProducteurs)
class GroupementProducteursAdmin(AbstractGristModelAdmin):
    list_display = AbstractGristModelAdmin.list_display + (
        "nom",
        "libelle",
    )
    list_display_links = AbstractGristModelAdmin.list_display_links + ("nom",)
    fields = ("nom", "libelle")


@admin.register(Filiere)
class FiliereAdmin(AbstractGristModelAdmin):
    list_display = AbstractGristModelAdmin.list_display + (
        "nom",
        "position",
    )
    list_display_links = AbstractGristModelAdmin.list_display_links + ("nom",)
    fields = ("nom", "position")


@admin.register(SousFiliere)
class SousFiliereAdmin(AbstractGristModelAdmin):
    list_display = AbstractGristModelAdmin.list_display + (
        "nom",
        "filiere",
    )
    list_display_links = AbstractGristModelAdmin.list_display_links + ("nom",)
    list_filter = ("filiere",)
    list_select_related = ("filiere",)
    fields = ("nom", "filiere")


@admin.register(Production)
class ProductionAdmin(AbstractGristModelAdmin):
    list_display = AbstractGristModelAdmin.list_display + (
        "nom",
        "sous_filiere",
    )
    list_display_links = AbstractGristModelAdmin.list_display_links + ("nom",)
    list_filter = ("sous_filiere",)
    list_select_related = ("sous_filiere",)
    fields = ("nom", "sous_filiere")
