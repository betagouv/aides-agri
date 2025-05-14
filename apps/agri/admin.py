from django.contrib import admin

from .models import Feedback


@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ("sent_at", "sent_from_url")
    fields = ("sent_at", "sent_from_url", "message")

    def get_readonly_fields(self, request, obj=...):
        return self.fields
