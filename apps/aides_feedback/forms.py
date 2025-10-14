from django import forms
from dsfr.forms import DsfrBaseForm
from dsfr.widgets import InlineRadioSelect

from . import models


class FeedbackOnThemesAndSujetsForm(forms.ModelForm, DsfrBaseForm):
    class Meta:
        model = models.FeedbackOnThemesAndSujets
        fields = ("message",)

    message = forms.CharField(
        widget=forms.Textarea(attrs={"rows": 5}),
        label="Pour nous aider à l’améliorer, pouvez-vous nous dire quel est votre projet ou difficulté que nous n’avez pas trouvé ?",
        error_messages={
            "required": "Si vous voulez nous aider, saisissez du texte ici. Sinon vous pouvez fermer."
        },
    )


class CreateFeedbackOnAidesForm(forms.ModelForm, DsfrBaseForm):
    class Meta:
        model = models.FeedbackOnAides
        fields = ("usefulness",)

    usefulness = forms.ChoiceField(
        label=models.FeedbackOnAides.usefulness.field.verbose_name,
        choices=models.FeedbackOnAides.usefulness.field.choices,
        widget=InlineRadioSelect(),
    )


class UpdateFeedbackOnAideForm(forms.ModelForm, DsfrBaseForm):
    class Meta:
        model = models.FeedbackOnAides
        fields = ("information_quality", "comments")

    information_quality = forms.ChoiceField(
        label=models.FeedbackOnAides.information_quality.field.verbose_name,
        choices=models.FeedbackOnAides.information_quality.field.choices,
        widget=InlineRadioSelect(),
    )
    comments = forms.CharField(
        label=models.FeedbackOnAides.comments.field.verbose_name,
        widget=forms.Textarea(attrs={"cols": 30, "rows": 5}),
    )
