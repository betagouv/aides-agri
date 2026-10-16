from reversion.admin import VersionAdmin


class RawAideAdmin(VersionAdmin):
    fieldsets = [
        ("Métadonnées", {"fields": ["source", "status", "aide"]}),
        ("Données", {"fields": ["__remaining__"]}),
    ]

    def get_model_perms(self, request):
        return {
            "add": False,
            "change": False,
            "delete": self.has_view_permission(request),
            "view": self.has_view_permission(request),
        }

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser
