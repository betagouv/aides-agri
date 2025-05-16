from django import forms
from dsfr.forms import DsfrBaseForm

from .models import Feedback


class FeedbackForm(forms.ModelForm, DsfrBaseForm):
    class Meta:
        model = Feedback
        fields = ("message",)

    message = forms.CharField(
        widget=forms.Textarea(attrs={"rows": 5}),
        label="Pour nous aider à l’améliorer, pouvez-vous nous dire quel est votre projet ou difficulté que nous n’avez pas trouvé ?",
        error_messages={
            "required": "Si vous voulez nous aider, saisissez du texte ici. Sinon vous pouvez fermer."
        },
    )
