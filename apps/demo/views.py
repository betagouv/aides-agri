from functools import cached_property

from django.shortcuts import reverse
from django.views.generic import CreateView, RedirectView

from .forms import ReponseForm
from .models import Question, Reponse, Parcours


class ParcoursView(RedirectView):
    def get_redirect_url(self, *args, **kwargs):
        self.request.session["demo"] = True
        return reverse("demo:question", kwargs={"pk": Question.objects.first().pk})


class QuestionView(CreateView):
    model = Reponse
    form_class = ReponseForm

    @cached_property
    def questions(self) -> list[Question]:
        return list(Question.objects.all())

    @cached_property
    def question(self):
        return Question.objects.get(pk=self.kwargs.get("pk"))

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data.update(
            {
                "question": self.question,
            }
        )
        return context_data

    def get_form_kwargs(self):
        form_kwargs = super().get_form_kwargs()

        parcours, _ = Parcours.objects.get_or_create(
            session_id=self.request.session.session_key
        )
        form_kwargs.update(
            {
                "question": self.question,
                "parcours": parcours,
            }
        )

        return form_kwargs

    def get_success_url(self):
        try:
            next_question = self.questions[self.questions.index(self.question) + 1]
            while (
                next_question.parent_choix
                and next_question.parent_choix != self.object.choix
            ):
                next_question = self.questions[self.questions.index(next_question) + 1]
            return reverse("demo:question", kwargs={"pk": next_question.pk})
        except IndexError:
            return reverse("demo:fin")
