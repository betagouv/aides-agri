from django.contrib import admin

from aides.admin import ExternalModelAdmin

from .models import Filiere, SousFiliere, Production, GroupementProducteurs


@admin.register(GroupementProducteurs)
class GroupementProducteursAdmin(ExternalModelAdmin):
    list_display = ExternalModelAdmin.list_display + ("libelle",)
    fields = ("nom", "libelle")


@admin.register(Filiere)
class FiliereAdmin(ExternalModelAdmin):
    list_display = ExternalModelAdmin.list_display + ("position",)
    fields = ("nom", "position")


@admin.register(SousFiliere)
class SousFiliereAdmin(ExternalModelAdmin):
    list_display = ExternalModelAdmin.list_display + ("filiere",)
    fields = ("nom", "filiere")


@admin.register(Production)
class ProductionAdmin(ExternalModelAdmin):
    list_display = ExternalModelAdmin.list_display + ("sous_filiere",)
    fields = ("nom", "sous_filiere")
