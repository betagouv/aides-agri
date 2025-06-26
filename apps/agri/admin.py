from django.contrib import admin

from product.admin import ReadOnlyModelAdmin

from .models import Feedback


@admin.register(Feedback)
class FeedbackAdmin(ReadOnlyModelAdmin):
    list_display = ("sent_at", "sent_from_url")
    fields = ("sent_at", "sent_from_url", "message")
