from django.contrib import admin

from ..models import BaseJuridique, Organisme, Programme, Territoire


@admin.register(Territoire)
class TerritoireAdmin(admin.ModelAdmin):
    list_display = ("code_cog", "type", "code", "nom")
    list_filter = ("type",)
    search_fields = ("code", "nom")

    def get_model_perms(self, request):
        return {
            "add": False,
            "change": False,
            "delete": False,
            "view": self.has_view_permission(request),
        }

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(BaseJuridique)
class BaseJuridiqueAdmin(admin.ModelAdmin):
    search_fields = ("libelle", "url")


@admin.register(Organisme)
class OrganismeAdmin(admin.ModelAdmin):
    search_fields = ("nom", "siren")


@admin.register(Programme)
class ProgrammeAdmin(admin.ModelAdmin):
    search_fields = ("nom",)
