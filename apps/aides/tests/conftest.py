from pytest_factoryboy import register

from aides.models import Aide
from aides.tests import factories  # noqa


register(factories.OrganismeFactory)
register(factories.ThemeFactory)
register(factories.ThemeFactory, "theme_2")
register(factories.SujetFactory)
register(factories.SujetFactory, "sujet_2")
register(factories.TypeFactory, "type_aide")
register(factories.ZoneGeographiqueFactory)
register(factories.AideFactory)
register(
    factories.AideFactory,
    "aide_published",
    status=Aide.Status.VALIDATED,
    is_published=True,
)
register(
    factories.AideFactory,
    "aide_published_with_parent",
    status=Aide.Status.VALIDATED,
    is_published=True,
    with_parent=True,
)
