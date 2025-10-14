from urllib.parse import urlparse

from django.shortcuts import render
from django.urls import resolve
from django.views.generic import CreateView, UpdateView

from aides.models import Aide

from .forms import (
    FeedbackOnThemesAndSujetsForm,
    CreateFeedbackOnAidesForm,
    UpdateFeedbackOnAideForm,
)


class FeedbackFormMixin:
    success_partial_template_name = ""

    def get_success_context_data(self):
        return {}

    def form_valid(self, form):
        form.instance.sent_from_url = self.request.META["HTTP_REFERER"]
        form.instance.user_agent = self.request.META["HTTP_USER_AGENT"]
        self.object = form.save()
        return render(
            self.request,
            self.success_partial_template_name,
            context=self.get_success_context_data(),
        )


class CreateFeedbackOnThemesAndSujetsView(FeedbackFormMixin, CreateView):
    form_class = FeedbackOnThemesAndSujetsForm
    success_partial_template_name = (
        "aides_feedback/_partials/feedback_themes_sujets_ok.html"
    )


class CreateFeedbackOnAidesView(FeedbackFormMixin, CreateView):
    form_class = CreateFeedbackOnAidesForm
    success_partial_template_name = (
        "aides_feedback/_partials/create_feedback_aides_ok.html"
    )

    def form_valid(self, form):
        url_resolver_match = resolve(urlparse(self.request.META["HTTP_REFERER"]).path)
        if url_resolver_match.view_name == "aides:aide":
            form.instance.aide = Aide.objects.filter(
                pk=url_resolver_match.kwargs.get("pk")
            ).first()
        return super().form_valid(form)

    def get_success_context_data(self):
        return {
            "form": UpdateFeedbackOnAideForm(instance=self.object),
            "object": self.object,
        }


class UpdateFeedbackOnAidesView(FeedbackFormMixin, UpdateView):
    model = UpdateFeedbackOnAideForm.Meta.model
    form_class = UpdateFeedbackOnAideForm
    template_name = "aides_feedback/_partials/update_feedback_on_aides_form.html"
    success_partial_template_name = (
        "aides_feedback/_partials/update_feedback_on_aides_ok.html"
    )
