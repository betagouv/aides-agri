from pytest_factoryboy import register, LazyFixture

from aides.tests import factories  # noqa


register(factories.ThemeFactory)
register(factories.SujetFactory, with_themes=1)
register(factories.TypeFactory, "type_aide_conseil", nom="Conseil")
register(factories.ZoneGeographiqueFactory)

register(
    factories.ZoneGeographiqueFactory,
    "zone_geographique_departement_75",
    type=factories.models.ZoneGeographique.Type.DEPARTEMENT,
    code="75",
)

register(
    factories.ZoneGeographiqueFactory,
    "zone_geographique_commune_75001",
    type=factories.models.ZoneGeographique.Type.COMMUNE,
    code="75001",
    parent=LazyFixture("zone_geographique_departement_75"),
)
