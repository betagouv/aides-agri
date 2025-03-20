from pytest_factoryboy import register, LazyFixture

from aides.tests import factories  # noqa


register(factories.ThemeFactory)
register(factories.SujetFactory)
register(factories.ZoneGeographiqueFactory)

register(
    factories.ZoneGeographiqueFactory,
    "zone_geographique_departement_75",
    type=factories.models.ZoneGeographique.Type.DEPARTEMENT,
    numero="75",
)

register(
    factories.ZoneGeographiqueFactory,
    "zone_geographique_commune_75001",
    type=factories.models.ZoneGeographique.Type.COMMUNE,
    numero="75001",
    parent=LazyFixture("zone_geographique_departement_75"),
)
