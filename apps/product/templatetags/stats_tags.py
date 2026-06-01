import json

from django import template
from django.utils.safestring import mark_safe


register = template.Library()


@register.filter(is_safe=True)
def stats_json(value):
    return mark_safe(json.dumps(value))


@register.filter
def join_list(list_a: list, list_b: list) -> list[list]:
    return [list_a, list_b]
