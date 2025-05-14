from django import forms
from dsfr.forms import DsfrBaseForm

from .models import Feedback


class FeedbackForm(forms.ModelForm, DsfrBaseForm):
    class Meta:
        model = Feedback
        fields = ("message",)
