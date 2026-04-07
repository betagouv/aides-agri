from django import template
from dsfr.utils import parse_tag_args


register = template.Library()


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
        "searchable",
        "search_url",
        "search_field_name",
        "search_placeholder",
        "with_tags",
        "add_button_label",
        "extra_classes",
        "keep_default_button_label",
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
