from django.contrib import admin

# Register your models here.

from .models import UserFeedback, UserNote


@admin.register(UserNote)
class UserNoteAdmin(admin.ModelAdmin):
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
class UserFeedbackAdmin(admin.ModelAdmin):
    list_display = (
        "sent_at",
        "information_quality",
    )
    fields = ("sent_at", "information_quality", "comments")

    def get_readonly_fields(self, *args, **kwargs):
        return self.fields
