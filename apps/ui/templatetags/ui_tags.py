from django import template
from dsfr.utils import parse_tag_args
from markdown import markdown
from markdown.extensions.attr_list import AttrListExtension
from markdown.extensions.tables import TableProcessor, BlockProcessor
from markdown.extensions import Extension
from markdown_grid_tables import GridTableProcessor
import xml.etree.ElementTree as etree


register = template.Library()


class DsfrTableProcessorMixin(BlockProcessor):
    dsfr_bordered = False

    def run(self, parent, *args):
        super().run(parent, *args)

        # Build the DSFR-specific layers surrounding the <table>
        # cf https://www.systeme-de-design.gouv.fr/version-courante/fr/composants/tableau
        div = etree.SubElement(parent, "div")
        div.attrib["class"] = "fr-table"
        if self.dsfr_bordered:
            div.attrib["class"] += " fr-table--bordered"
        wrapper = etree.SubElement(div, "div")
        wrapper.attrib["class"] = "fr-table__wrapper"
        container = etree.SubElement(wrapper, "div")
        container.attrib["class"] = "fr-table__container"
        content = etree.SubElement(container, "div")
        content.attrib["class"] = "fr-table__content"

        # move the table from the parent to the lowest DSFR layer
        added_table = parent.find("table[last()]")
        parent.remove(added_table)
        content.append(added_table)


class DsfrTableProcessor(DsfrTableProcessorMixin, TableProcessor):
    pass


class DsfrGridTableProcessor(DsfrTableProcessorMixin, GridTableProcessor):
    dsfr_bordered = True


class DsfrTableExtension(Extension):
    def extendMarkdown(self, md):
        md.parser.blockprocessors.register(
            DsfrTableProcessor(md.parser, self.getConfigs()), "table", 100
        )
        md.parser.blockprocessors.register(
            DsfrGridTableProcessor(md.parser), "grid_table", 100
        )


@register.filter
def ui_markdown(content: str) -> str:
    return markdown(content, extensions=[DsfrTableExtension(), AttrListExtension()])


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
