from django.db.models import TextField
from prose.fields import RichTextField

from .widgets import VendoredTrixRichTextEditor


class VendoredTrixRichTextField(RichTextField):
    def formfield(self, **kwargs):
        kwargs["widget"] = VendoredTrixRichTextEditor
        return super(TextField, self).formfield(**kwargs)
