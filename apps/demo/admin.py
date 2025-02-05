from django.contrib import admin

from .models import Question, Choix, Parcours, Reponse


class ChoixInline(admin.TabularInline):
    model = Choix
    extra = 0


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    inlines = [ChoixInline]
    fieldsets = (
        ("Position dans l'arbre", {"fields": ("parent", "parent_choix", "position")}),
        ("Caractéristiques", {"fields": ("format", "texte")}),
    )


class ReponseInline(admin.TabularInline):
    model = Reponse
    extra = 0
    fields = ("question", "choix", "choix_multiples", "reponse_libre")
    readonly_fields = ("question", "choix", "choix_multiples", "reponse_libre")


@admin.register(Parcours)
class ParcoursAdmin(admin.ModelAdmin):
    inlines = [ReponseInline]

    def get_model_perms(self, request):
        return {
            "add": False,
            "change": False,
            "delete": False,
            "view": self.has_view_permission(request),
        }
