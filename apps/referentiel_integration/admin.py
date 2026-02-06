from django.contrib import admin

from .models import DispositifSchemaAide


@admin.register(DispositifSchemaAide)
class DispositifSchemaAideAdmin(admin.ModelAdmin):
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
