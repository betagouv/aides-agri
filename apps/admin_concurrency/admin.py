from django.contrib import admin
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotAllowed
from django.shortcuts import render
from django.urls import path

from .models import Read, Write


class ConcurrentModelAdmin(admin.ModelAdmin):
    class Media:
        js = ["admin/admin_concurrency/concurrency.js"]

    def _get_object_identifier(self, object_id):
        return f"{self.opts.app_label}-{self.opts.model_name}-{object_id}"

    def _changeform_view(self, request, object_id, *args, **kwargs):
        self.concurrency_read(request, object_id)
        return super()._changeform_view(request, object_id, *args, **kwargs)

    def _obj_has_no_other_write(self, request, obj):
        return (
            not obj
            or not Write.objects.filter(obj=self._get_object_identifier(obj.pk))
            .exclude(user=request.user)
            .exists()
        )

    def has_change_permission(self, request, obj=None):
        return self._obj_has_no_other_write(
            request, obj
        ) and super().has_change_permission(request, obj)

    def has_delete_permission(self, request, obj=None):
        return self._obj_has_no_other_write(
            request, obj
        ) and self.has_change_permission(request, obj)

    def concurrency_list(self, request, object_id):
        write = Write.objects.filter(
            obj=self._get_object_identifier(object_id),
        ).first()
        users_to_exclude_from_reads = [request.user]
        if write:
            users_to_exclude_from_reads.append(write.user)
        reads = (
            Read.objects.filter(obj=self._get_object_identifier(object_id))
            .exclude(user__in=users_to_exclude_from_reads)
            .select_related("user")
        )
        return render(
            request,
            "admin/admin_concurrency/_blocks/concurrency.html",
            context={"write": write, "reads": reads},
        )

    def concurrency_read(self, request, object_id):
        if request.method != "POST":
            return HttpResponseNotAllowed(["post"])
        read, is_new = Read.objects.get_or_create(
            obj=self._get_object_identifier(object_id),
            user=request.user,
        )
        if not is_new:
            read.save()
        return HttpResponse()

    def concurrency_write(self, request, object_id):
        if request.method != "POST":
            return HttpResponseNotAllowed(["post"])
        write, is_new = Write.objects.get_or_create(
            obj=self._get_object_identifier(object_id),
            user=request.user,
        )
        if not is_new:
            write.save()
        return HttpResponse()

    def concurrency_release(self, request, object_id):
        if request.method != "POST":
            return HttpResponseNotAllowed(["post"])
        Write.objects.filter(
            obj=self._get_object_identifier(object_id),
            user=request.user,
        ).delete()
        return HttpResponse()

    def concurrency_force(self, request, object_id):
        if request.method != "POST":
            return HttpResponseNotAllowed(["post"])
        Write.objects.filter(obj=self._get_object_identifier(object_id)).delete()
        return HttpResponseRedirect("../change")

    def get_urls(self):
        urls = super().get_urls()
        info = self.opts.app_label, self.opts.model_name
        urls.extend(
            [
                path(
                    "<path:object_id>/concurrency/list",
                    self.admin_site.admin_view(self.concurrency_list),
                    name="%s_%s_concurrencylist" % info,
                ),
                path(
                    "<path:object_id>/concurrency/read",
                    self.admin_site.admin_view(self.concurrency_read),
                    name="%s_%s_concurrencyread" % info,
                ),
                path(
                    "<path:object_id>/concurrency/write",
                    self.admin_site.admin_view(self.concurrency_write),
                    name="%s_%s_concurrencywrite" % info,
                ),
                path(
                    "<path:object_id>/concurrency/release",
                    self.admin_site.admin_view(self.concurrency_release),
                    name="%s_%s_concurrencyrelease" % info,
                ),
                path(
                    "<path:object_id>/concurrency/force",
                    self.admin_site.admin_view(self.concurrency_force),
                    name="%s_%s_concurrencyforce" % info,
                ),
            ]
        )
        return urls

    def save_model(self, request, obj, *args):
        super().save_model(request, obj, *args)
        self.concurrency_release(request, obj.pk)
