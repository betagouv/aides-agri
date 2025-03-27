from django.views.generic import TemplateView


class SelectRichView(TemplateView):
    template_name = "ui/select_rich.html"

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data.update(
            {
                "select_rich_single": [
                    {
                        "label": "Sélection simple, recherche interne",
                        "name": "select_rich_single_search_internal",
                        "options": [
                            (f"value{i}", f"Option {i}, libellé long", f"Option {i}")
                            for i in range(1, 10)
                        ],
                        "initial": "value2",
                        "required": True,
                    },
                    {
                        "label": "Sélection simple, recherche AJAX",
                        "name": "select_rich_single_search_ajax",
                        "search_url": "ui:components-search-options-single",
                        "search_field_name": "q",
                        "required": True,
                    },
                ],
                "select_rich_multi": [
                    {
                        "name": "select_rich_multi",
                        "label": "Sélection multiple",
                        "options": [
                            (f"value{i}", f"Option {i}, libellé long", f"Option {i}")
                            for i in range(1, 10)
                        ],
                        "initials": ("value2", "value3"),
                        "required": True,
                    },
                    {
                        "name": "select_rich_multi_tags",
                        "label": "Sélection multiple, avec tags",
                        "with_tags": True,
                        "options": [
                            (f"value{i}", f"Option {i}, libellé long", f"Option {i}")
                            for i in range(1, 10)
                        ],
                        "initials": ("value2", "value3"),
                        "required": True,
                    },
                    {
                        "name": "select_rich_multi_search_internal",
                        "label": "Sélection multiple, recherche interne",
                        "searchable": True,
                        "options": [
                            (f"value{i}", f"Option {i}, libellé long", f"Option {i}")
                            for i in range(1, 10)
                        ],
                        "initials": ("value2", "value3"),
                        "required": True,
                    },
                    {
                        "name": "select_rich_multi_search_ajax",
                        "label": "Sélection multiple, recherche AJAX",
                        "searchable": True,
                        "search_url": "ui:components-search-options-multi",
                        "search_field_name": "q",
                        "required": True,
                    },
                ],
            }
        )
        return context_data


class AbstractSelectRichSearchOptionsView(TemplateView):
    template_name = "ui/components/blocks/select_rich_options.html"
    options = [
        (f"value{i}", f"Option {i}, libellé long", f"Option {i}") for i in range(1, 100)
    ]

    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data.update(
            {
                "options": {
                    (value, label_long, label_short)
                    for value, label_long, label_short in self.options
                    if self.request.GET.get("q") in label_long
                }
            }
        )
        return context_data


class SelectRichSingleSelectRichSearchOptionsView(AbstractSelectRichSearchOptionsView):
    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data.update(
            {
                "self": {
                    "name": "select_rich_single_search",
                    "label": "Sélection simple, recherche",
                    "multi": False,
                    "searchable": True,
                    "search_url": "ui:components-search-options-single",
                    "search_field_name": "q",
                },
            }
        )
        return context_data


class SelectRichMultiSelectRichSearchOptionsView(AbstractSelectRichSearchOptionsView):
    def get_context_data(self, **kwargs):
        context_data = super().get_context_data(**kwargs)
        context_data.update(
            {
                "self": {
                    "name": "select_rich_multi_search",
                    "label": "Sélection multiple, recherche",
                    "multi": True,
                    "searchable": True,
                    "search_url": "ui:components-search-options-multi",
                    "search_field_name": "q",
                },
            }
        )
        return context_data
