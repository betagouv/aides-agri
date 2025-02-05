from django.forms import ModelForm, MultipleChoiceField, CheckboxSelectMultiple
from dsfr.forms import DsfrBaseForm

from .models import Reponse


class ReponseForm(ModelForm, DsfrBaseForm):
    class Meta:
        model = Reponse
        fields = ("choix", "choix_multiples", "reponse_libre")

    choix_multiples = MultipleChoiceField(
        widget=CheckboxSelectMultiple(attrs={"class": "fr-checkbox"})
    )

    def __init__(self, *args, **kwargs):
        self.parcours = kwargs.pop("parcours")
        self.question = kwargs.pop("question")

        super().__init__(*args, **kwargs)

        if self.question.is_choix_unique:
            del self.fields["choix_multiples"]
            del self.fields["reponse_libre"]
            self.fields["choix"].choices = self.question.choix_set.values_list(
                "pk", "texte"
            )
        elif self.question.is_choix_multiple:
            del self.fields["choix"]
            del self.fields["reponse_libre"]
            self.fields[
                "choix_multiples"
            ].choices = self.question.choix_set.values_list("pk", "texte")
        elif self.question.is_libre:
            del self.fields["choix_multiples"]
            del self.fields["choix"]

    def save(self, **kwargs):
        self.instance.parcours = self.parcours
        self.instance.question = self.question
        return super().save(**kwargs)
