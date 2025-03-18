from pytest_factoryboy import register

from aides.tests import factories  # noqa


register(factories.OperateurFactory)
register(factories.ThemeFactory)
register(factories.ThemeFactory, "theme_2")
register(factories.SujetFactory)
register(factories.SujetFactory, "sujet_2")
register(factories.ZoneGeographiqueFactory)
register(factories.AideFactory)
