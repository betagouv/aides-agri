from django import template
from dsfr.utils import parse_tag_args

register = template.Library()


@register.inclusion_tag("ui/components/tile_checkbox.html")
def ui_tile_checkbox(*args, **kwargs) -> dict:
    """
    Returns a special tile item with an input checkbox in it.
    Takes a dict as parameter, with the same structure as the dsfr_tile, but:
    * Key `url` has no effect since there is no link
    * Key `name` (str) is added as the name of the input checkbox
    * Key `checked` (optional, boolean, default False) is added
    ```
    """
    allowed_keys = [
        "title",
        "name",
        "checked",
        "value",
        "image_path",
        "svg_path",
        "description",
        "detail",
        "top_detail",
        "id",
        "enlarge_link",
        "extra_classes",
    ]
    tag_data = parse_tag_args(args, kwargs, allowed_keys)

    if "enlarge_link" not in tag_data:
        tag_data["enlarge_link"] = True

    if "checked" not in tag_data:
        tag_data["checked"] = False

    return {"self": tag_data}


@register.inclusion_tag("ui/components/select_rich.html")
def ui_select_rich_single(*args, **kwargs) -> dict:
    allowed_keys = [
        "name",
        "button_text",
        "options",
        "initial",
        "required",
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
        "name",
        "options",
        "initials",
        "helper",
        "required",
        "searchable",
        "search_url",
        "search_field_name",
        "search_placeholder",
        "with_tags",
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
