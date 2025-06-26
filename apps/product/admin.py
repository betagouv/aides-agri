from django.contrib import admin

from .models import UserFeedback, UserNote


class ReadOnlyModelAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(UserNote)
class UserNoteAdmin(ReadOnlyModelAdmin):
    list_display = (
        "sent_at",
        "usefulness",
    )
    fields = (
        "sent_at",
        "usefulness",
    )

    def get_readonly_fields(self, *args, **kwargs):
        return self.fields


@admin.register(UserFeedback)
class UserFeedbackAdmin(ReadOnlyModelAdmin):
    list_display = (
        "sent_at",
        "information_quality",
    )
    fields = ("sent_at", "information_quality", "comments")

    def get_readonly_fields(self, *args, **kwargs):
        return self.fields
