from django.forms.widgets import Textarea


class VendoredTrixRichTextEditor(Textarea):
    template_name = "prose/forms/widgets/editor.html"

    class Media:
        css = {"all": ("vendor/trix.css", "prose/editor.css")}
        js = ("vendor/trix.umd.js", "prose/editor.js")
