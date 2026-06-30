from django.contrib import admin
from django.db import models

from aides.admin.other_models import CsvExportMixin

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
class FeedbackOnAidesAdmin(CsvExportMixin, FeedbackAdmin):
    list_display = ("sent_at", "is_spam", "aide", "usefulness")
    list_display_links = ("sent_at",)
    list_filter = FeedbackAdmin.list_filter + ("has_aide",)
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
    list_select_related = ("aide",)

    def _get_csv_fields(self) -> list[models.Field]:
        return [
            FeedbackOnAides.sent_at,
            FeedbackOnAides.has_aide,
            FeedbackOnAides.aide,
            FeedbackOnAides.usefulness,
            FeedbackOnAides.information_quality,
            FeedbackOnAides.comments,
        ]

    def _get_csv_content(self) -> list:
        content = []
        for obj in FeedbackOnAides.objects.filter(is_spam=False):
            content.append(
                [
                    obj.sent_at,
                    obj.has_aide,
                    str(obj.aide) if obj.has_aide else "n/a",
                    obj.get_usefulness_display(),
                    obj.get_information_quality_display(),
                    obj.comments,
                ]
            )
        return content
