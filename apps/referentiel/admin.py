from django.contrib import admin

from .models import DemarcheAgricole, Organisme, Programme, Porteur, Territoire


@admin.register(Territoire)
class TerritoireAdmin(admin.ModelAdmin):
    list_display = ("code_cog", "type", "code", "nom")
    list_filter = ("type",)

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


@admin.register(Organisme)
class OrganismeAdmin(admin.ModelAdmin):
    pass


@admin.register(Programme)
class ProgrammeAdmin(admin.ModelAdmin):
    pass


class PorteurInlineAdmin(admin.TabularInline):
    model = Porteur
    extra = 0
    autocomplete_fields = ("organisme",)


@admin.register(DemarcheAgricole)
class DemarcheAdmin(admin.ModelAdmin):
    autocomplete_fields = (
        "programmes_parents",
        "eligibilite_geographique",
        "eligibilite_geographique_exclusions",
    )
    inlines = [PorteurInlineAdmin]
