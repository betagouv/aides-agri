from django import template
from dsfr.utils import parse_tag_args
from markdown import markdown
from markdown.extensions.tables import TableExtension, TableProcessor
import xml.etree.ElementTree as etree


register = template.Library()


class DsfrTableProcessor(TableProcessor):
    def run(self, parent, *args):
        super().run(parent, *args)
        div = etree.SubElement(parent, "div")
        div.attrib["class"] = "fr-table"
        added_table = parent.find("table[last()]")
        parent.remove(added_table)
        div.append(added_table)


class DsfrTableExtension(TableExtension):
    def extendMarkdown(self, md):
        super().extendMarkdown(md)
        processor = DsfrTableProcessor(md.parser, self.getConfigs())
        md.parser.blockprocessors.register(processor, "table", 100)


@register.filter
def ui_markdown(content: str) -> str:
    return markdown(content, extensions=[DsfrTableExtension()])


@register.inclusion_tag("ui/components/checkbox_group_field.html")
def ui_checkbox_group_field(*args, **kwargs) -> dict:
    allowed_keys = [
        "label",
        "name",
        "options",
        "required",
        "required_error_message",
    ]
    tag_data = parse_tag_args(args, kwargs, allowed_keys)

    return {"self": tag_data}


@register.inclusion_tag("ui/components/select_rich.html")
def ui_select_rich_single(*args, **kwargs) -> dict:
    allowed_keys = [
        "label",
        "name",
        "button_text",
        "options",
        "initial",
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
        "options",
        "initials",
        "helper",
        "required",
        "required_error_message",
        "searchable",
        "search_url",
        "search_field_name",
        "search_placeholder",
        "with_tags",
        "add_button_label",
        "extra_classes",
    ]
    tag_data = parse_tag_args(args, kwargs, allowed_keys)
    tag_data["multi"] = True

    if tag_data["with_tags"]:
        tag_data["tags"] = [
            (option[0], option[2])
            for option in tag_data["options"]
            if option[0] in tag_data["initials"]
        ]

    return {"self": tag_data}
