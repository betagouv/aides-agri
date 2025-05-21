from pathlib import Path

from django.shortcuts import render
from django.views.generic import TemplateView
from django.views.generic.edit import CreateView

from .forms import UserNoteForm, UserFeedbackForm


class UserNoteView(CreateView):
    form_class = UserNoteForm

    def form_valid(self, form):
        self.object = form.save()
        return render(
            self.request,
            "product/_partials/user_note_ok.html",
            context={
                "form": UserFeedbackForm(),
            },
        )


class UserFeedbackView(CreateView):
    form_class = UserFeedbackForm
    template_name = "product/_partials/user_feedback.html"

    def form_valid(self, form):
        self.object = form.save()
        return render(
            self.request,
            "product/_partials/user_feedback_thanks.html",
        )


class StaticPageView(TemplateView):
    template_name = "product/static_page.html"
    title = ""
    content_filename = ""

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        with open(Path(__file__).parent / f"content/{self.content_filename}.md") as f:
            content = f.read()
        context_data.update({"title": self.title, "content": content})
        return context_data
