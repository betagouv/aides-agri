from pytest_factoryboy import register

from aides.tests import factories  # noqa


register(factories.OrganismeFactory)
register(factories.ThemeFactory)
register(factories.ThemeFactory, "theme_2")
register(factories.SujetFactory)
register(factories.SujetFactory, "sujet_2")
register(factories.TypeFactory, "type_aide")
register(factories.ZoneGeographiqueFactory)
register(factories.AideFactory)
register(factories.AideFactory, "aide_published", is_published=True)
