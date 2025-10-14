from pathlib import Path

from django.views.generic import TemplateView


class StaticPageView(TemplateView):
    template_name = "product/static_page.html"
    title = ""
    content_filename = ""

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        with open(Path(__file__).parent / f"content/{self.content_filename}.md") as f:
            content = f.read()
        context_data.update({"title": self.title, "content": content})
        return context_data
