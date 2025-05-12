from django import forms
from dsfr.forms import DsfrBaseForm
from dsfr.templatetags.dsfr_tags import dsfr_inline

from .models import UserFeedback, UserNote


class UserNoteForm(forms.ModelForm, DsfrBaseForm):
    class Meta:
        model = UserNote
        fields = "__all__"

    usefulness = forms.ChoiceField(
        label=UserNote.usefulness.field.verbose_name,
        choices=UserNote.usefulness.field.choices,
        widget=forms.RadioSelect(),
    )

    # TODO replace with widget=InlineRadioSelect() when django-dsfr will allow it
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        dsfr_inline(self["usefulness"])


class UserFeedbackForm(forms.ModelForm, DsfrBaseForm):
    class Meta:
        model = UserFeedback
        fields = "__all__"

    information_quality = forms.ChoiceField(
        label=UserFeedback.information_quality.field.verbose_name,
        choices=UserFeedback.information_quality.field.choices,
        widget=forms.RadioSelect(),
    )
    comments = forms.CharField(
        label=UserFeedback.comments.field.verbose_name,
        widget=forms.Textarea(attrs={"cols": 30, "rows": 5}),
    )

    # TODO replace with widget=InlineRadioSelect() when django-dsfr will allow it
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        dsfr_inline(self["information_quality"])
