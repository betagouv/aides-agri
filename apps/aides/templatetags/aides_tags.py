from django import template
from django.contrib.admin.helpers import AdminReadonlyField
from django.contrib.admin.utils import lookup_field
from django.contrib.postgres.fields import HStoreField
from django.db.models import Model
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


@register.simple_tag()
def readonly_hstore_field_or_contents(
    readonlyfield: AdminReadonlyField, original: Model
):
    if original is None:
        return ""

    f, attr, value = lookup_field(readonlyfield.field["name"], original)
    if isinstance(f, HStoreField):
        rows = []
        if not value:
            return ""
        for key, value in value.items():
            rows.append(f"<tr><td>{key}</td><td>{value}</td></tr>")
        return mark_safe(
            f"<table><thead><tr><th>Champ brut</th><th>Valeur</th></tr></thead><tbody>{''.join(rows)}</tbody></table>"
        )
    else:
        return readonlyfield.contents()
