from django.shortcuts import render
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
