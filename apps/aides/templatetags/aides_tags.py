from django import template
from django.utils.safestring import mark_safe


register = template.Library()


@register.simple_tag()
def aides_by_sujet_and_type_and_departement(
    aides: dict[str, dict[str, dict[str, list[str]]]],
    sujet: str,
    type_aide: str,
    departement: str,
) -> str:
    found = aides[sujet][type_aide][departement]
    return (
        mark_safe("<ul><li>" + "</li><li>".join(found) + "</li></ul>") if found else ""
    )
