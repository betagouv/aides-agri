from django.conf import settings
from django.contrib import admin
from django.contrib.auth import REDIRECT_FIELD_NAME
from django.contrib.auth.views import redirect_to_login
from django.http.response import HttpResponseRedirect
from django.shortcuts import resolve_url
from django.urls import reverse
from django.utils.http import url_has_allowed_host_and_scheme
from two_factor.admin import AdminSiteOTPRequiredMixin

from agri.stats import get_alertes_stats
from aides.stats import get_published_aides_stats
from aides_feedback.stats import get_feedback_on_aides_stats


class AidesAgriAdminSite(AdminSiteOTPRequiredMixin, admin.AdminSite):
    site_title = "Aides Agri"
    site_header = "Administration Aides Agri"
    index_template = "admin/index_custom.html"

    def login(self, request, extra_context=None):
        redirect_to = request.POST.get(
            REDIRECT_FIELD_NAME, request.GET.get(REDIRECT_FIELD_NAME)
        )
        if request.method == "GET" and super(
            AdminSiteOTPRequiredMixin, self
        ).has_permission(request):
            if request.user.is_verified():
                index_path = reverse("admin:index", current_app=self.name)
            else:
                index_path = reverse("two_factor:setup", current_app=self.name)
            return HttpResponseRedirect(index_path)

        if not redirect_to or not url_has_allowed_host_and_scheme(
            url=redirect_to, allowed_hosts=[request.get_host()]
        ):
            redirect_to = resolve_url(settings.LOGIN_REDIRECT_URL)

        return redirect_to_login(redirect_to)

    def index(self, request, extra_context=None):
        if extra_context is None:
            extra_context = dict()

        extra_context.update(**get_published_aides_stats())
        extra_context.update(**get_alertes_stats())
        extra_context.update(**get_feedback_on_aides_stats())

        return super().index(request, extra_context=extra_context)
