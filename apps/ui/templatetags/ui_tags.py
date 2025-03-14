from uuid import uuid4

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


@register.inclusion_tag("ui/components/select_multi_suggest.html")
def ui_select_multi_suggest(*args, **kwargs) -> dict:
    allowed_keys = [
        "name",
        "options",
        "initials",
        "label",
        "show_label",
        "placeholder",
    ]
    tag_data = parse_tag_args(args, kwargs, allowed_keys)
    tag_data["id"] = uuid4()

    if "show_label" not in tag_data or not isinstance(tag_data["show_label"], bool):
        tag_data["show_label"] = False

    return {"self": tag_data}


@register.inclusion_tag("ui/components/select_searchable.html")
def ui_select_searchable(*args, **kwargs) -> dict:
    allowed_keys = [
        "label",
        "name",
        "initials",
        "search_url",
        "search_field_name",
    ]
    tag_data = parse_tag_args(args, kwargs, allowed_keys)
    tag_data["id"] = uuid4()

    return {"self": tag_data}
