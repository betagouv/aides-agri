from django import template
from django.utils.safestring import mark_safe
from dsfr.extras.markdown.templatetags.dsfr_md_tags import (
    DsfrTableProcessor,
    DsfrExtension,
)
from dsfr.utils import parse_tag_args
from markdown import markdown
from markdown.extensions import Extension
from markdown.extensions.attr_list import AttrListExtension
from markdown.extensions.nl2br import Nl2BrExtension


register = template.Library()


@register.inclusion_tag("ui/components/select_rich.html")
def ui_select_rich_single(*args, **kwargs) -> dict:
    allowed_keys = [
        "label",
        "name",
        "button_text",
        "options",
        "initial",
        "helper",
        "required",
        "required_error_message",
        "search_url",
        "search_field_name",
        "search_placeholder",
        "extra_classes",
    ]
    tag_data = parse_tag_args(args, kwargs, allowed_keys)
    tag_data["multi"] = False
    tag_data["searchable"] = True

    return {"self": tag_data}


@register.inclusion_tag("ui/components/select_rich.html")
def ui_select_rich_multi(*args, **kwargs) -> dict:
    allowed_keys = [
        "label",
        "name",
        "button_text",
        "options",
        "initials",
        "helper",
        "required",
        "required_error_message",
        "with_select_all_button",
        "searchable",
        "search_url",
        "search_field_name",
        "search_placeholder",
        "with_tags",
        "add_button_label",
        "extra_classes",
        "keep_default_button_label",
        "show_values_on_button_label",
    ]
    tag_data = parse_tag_args(args, kwargs, allowed_keys)
    tag_data["multi"] = True

    if "with_tags" in tag_data and "initials" in tag_data:
        tag_data["tags"] = [
            (option[0], option[2])
            for option in tag_data["options"]
            if option[0] in tag_data["initials"]
        ]

    return {"self": tag_data}


class UiMultilineTableProcessor(DsfrTableProcessor):
    def run(self, parent, *args):
        super().run(parent, *args)
        div = parent.find("div")
        div.attrib["class"] += " fr-table--multiline"


class UiExtension(Extension):
    def extendMarkdown(self, md):
        md.parser.blockprocessors.register(
            UiMultilineTableProcessor(md.parser, self.getConfigs()), "table", 200
        )


@register.filter(is_safe=True)
def ui_md(content: str) -> str:
    return mark_safe(  # nosec B308, B703 — output sanitized by pymdownx.striphtml extension
        markdown(
            content,
            extensions=[
                AttrListExtension(),
                DsfrExtension(),
                UiExtension(),
                Nl2BrExtension(),
                "pymdownx.striphtml",
            ],
        )
    )
