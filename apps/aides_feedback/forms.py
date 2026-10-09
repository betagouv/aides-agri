from django import forms
from dsfr.forms import DsfrBaseForm, DsfrBoundField
from dsfr.widgets import InlineRadioSelect

from . import models


class FeedbackOnThemesAndSujetsForm(forms.ModelForm, DsfrBaseForm):
    class Meta:
        model = models.FeedbackOnThemesAndSujets
        fields = ("message",)

    message = forms.CharField(
        widget=forms.Textarea(attrs={"rows": 5}),
        label="Pour nous aider à l’améliorer, quel est votre projet ou difficulté ?",
    )


class FeedbackDsfrBoundField(DsfrBoundField):
    @property
    def template_name(self):
        template_name = super().template_name
        if self.widget_type in ("radioselect", "inlineradioselect"):
            template_name = (
                "dsfr/form_field_snippets/radioselect_with_side_labels_snippet.html"
            )
        return template_name


class ChoiceWithSideLabelsField(forms.ChoiceField):
    def __init__(self, *args, before_label="", after_label="", **kwargs):
        self.before_label = before_label
        self.after_label = after_label
        super().__init__(*args, **kwargs)


class CreateFeedbackOnAidesForm(forms.ModelForm, DsfrBaseForm):
    class Meta:
        model = models.FeedbackOnAides
        fields = ("usefulness",)

    bound_field_class = FeedbackDsfrBoundField

    usefulness = ChoiceWithSideLabelsField(
        label=models.FeedbackOnAides.usefulness.field.verbose_name,
        choices=models.FeedbackOnAides.usefulness.field.choices,
        widget=InlineRadioSelect(attrs={"class": "fr-sr-only"}),
        help_text="Sur une échelle de 1 à 5, 1 n’est pas clair du tout et 5 est très clair.",
        before_label="Pas clair du tout",
        after_label="Très clair",
    )


class UpdateFeedbackOnAideForm(forms.ModelForm, DsfrBaseForm):
    class Meta:
        model = models.FeedbackOnAides
        fields = ("comments",)

    comments = forms.CharField(
        label=models.FeedbackOnAides.comments.field.verbose_name,
        widget=forms.Textarea(attrs={"cols": 30, "rows": 5}),
    )
