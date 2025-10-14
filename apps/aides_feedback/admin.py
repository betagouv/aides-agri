from django.contrib import admin

from .models import FeedbackOnThemesAndSujets, FeedbackOnAides


class FeedbackAdmin(admin.ModelAdmin):
    actions = ["mark_as_spam"]
    list_filter = ("is_spam",)
    ordering = ("-sent_at",)

    def has_add_permission(self, *args):
        return False

    def has_delete_permission(self, *args):
        return False

    def has_change_permission(self, request, obj=None):
        return obj is None

    @admin.action(description="Marquer comme spam")
    def mark_as_spam(self, request, queryset):
        queryset.update(is_spam=True)


@admin.register(FeedbackOnThemesAndSujets)
class FeedbackOnThemesAdmin(FeedbackAdmin):
    list_display = ("sent_at", "sent_from_url", "is_spam")
    list_display_links = ("sent_at", "sent_from_url")
    fieldsets = [
        (
            "",
            {
                "fields": ["sent_at", "sent_from_url", "message"],
            },
        ),
        (
            "Infos techniques",
            {
                "classes": ["collapse"],
                "fields": ["user_agent", "is_spam"],
            },
        ),
    ]


@admin.register(FeedbackOnAides)
class FeedbackOnSujetsAdmin(FeedbackAdmin):
    list_display = ("sent_at", "has_aide", "is_spam")
    list_display_links = ("sent_at", "usefulness")
    fieldsets = [
        (
            "",
            {
                "fields": [
                    "sent_at",
                    ("sent_from_url", "aide"),
                    "usefulness",
                    "information_quality",
                    "comments",
                ],
            },
        ),
        (
            "Infos techniques",
            {
                "classes": ["collapse"],
                "fields": ["user_agent", "is_spam"],
            },
        ),
    ]

    @admin.display(description="Concerne une aide", boolean=True)
    def has_aide(self, obj):
        return obj.aide is not None
