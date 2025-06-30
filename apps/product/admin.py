from django.contrib import admin
from django.http import HttpResponse
from django.shortcuts import render
from django.urls import path

from .models import UserFeedback, UserNote, AdminConcurrency


class ReadOnlyModelAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


class ConcurrentModelAdmin(admin.ModelAdmin):
    class Media:
        js = ["admin/product/concurrency.js"]

    def _changeform_view(self, request, object_id, *args, **kwargs):
        self.mark_as_reader(request, object_id)
        return super()._changeform_view(request, object_id, *args, **kwargs)

    def list_concurrencies(self, request, object_id):
        editors = AdminConcurrency.objects.filter(
            obj=f"{self.opts.app_label}-{self.opts.model_name}-{object_id}",
            mode=AdminConcurrency.Mode.WRITE,
        ).exclude(user=request.user)
        return render(
            request, "admin/product/_blocks/editors.html", context={"editors": editors}
        )

    def mark_as_reader(self, request, object_id):
        marker, is_new = AdminConcurrency.objects.get_or_create(
            obj=f"{self.opts.app_label}-{self.opts.model_name}-{object_id}",
            user=request.user,
            mode=AdminConcurrency.Mode.READ,
        )
        if not is_new:
            marker.save()
        return HttpResponse()

    def mark_as_editor(self, request, object_id):
        marker, is_new = AdminConcurrency.objects.get_or_create(
            obj=f"{self.opts.app_label}-{self.opts.model_name}-{object_id}",
            user=request.user,
            mode=AdminConcurrency.Mode.WRITE,
        )
        if not is_new:
            marker.save()
        return HttpResponse()

    def release_edition(self, request, object_id):
        lock = AdminConcurrency.objects.filter(
            obj=f"{self.opts.app_label}-{self.opts.model_name}-{object_id}",
            user=request.user,
            mode=AdminConcurrency.Mode.WRITE,
        )
        if lock.exists():
            lock.all().delete()
        return HttpResponse()

    def get_urls(self):
        urls = super().get_urls()
        urls.extend(
            [
                path(
                    "<path:object_id>/concurrency/list",
                    self.admin_site.admin_view(self.list_concurrencies),
                ),
                path(
                    "<path:object_id>/concurrency/read",
                    self.admin_site.admin_view(self.mark_as_reader),
                ),
                path(
                    "<path:object_id>/concurrency/write",
                    self.admin_site.admin_view(self.mark_as_editor),
                ),
            ]
        )
        return urls

    def save_model(self, request, obj, *args):
        super().save_model(request, obj, *args)
        self.release_edition(request, obj.pk)


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
