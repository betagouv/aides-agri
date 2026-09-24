from pytest_factoryboy import register, LazyFixture

from aides.models import Aide, ZoneGeographique
from aides.tests import factories  # noqa


register(factories.OrganismeFactory)
register(factories.OrganismeFactory, "organisme_2")
register(factories.ThemeFactory)
register(factories.ThemeFactory, "theme_2")
register(factories.SujetFactory)
register(factories.SujetFactory, "sujet_2")
register(factories.TypeFactory, "type_aide")
register(factories.ZoneGeographiqueFactory)
register(
    factories.ZoneGeographiqueFactory,
    "zone_geographique_departement_13",
    type=ZoneGeographique.Type.DEPARTEMENT,
    code="13",
)
register(
    factories.ZoneGeographiqueFactory,
    "zone_geographique_region_paca",
    type=ZoneGeographique.Type.REGION,
    code="93",
)
register(
    factories.OrganismeFactory,
    "organisme_with_departement",
    with_illustration=True,
    with_zone_geographique=LazyFixture("zone_geographique_departement_13"),
)
register(
    factories.OrganismeFactory,
    "organisme_with_region",
    with_illustration=True,
    with_zone_geographique=LazyFixture("zone_geographique_region_paca"),
)
register(factories.AideFactory)
register(
    factories.AideFactory,
    "aide_published",
    organisme=LazyFixture("organisme"),
    status=Aide.Status.VALIDATED,
    is_published=True,
)
register(
    factories.AideFactory,
    "aide_published_with_parent",
    organisme=LazyFixture("organisme"),
    status=Aide.Status.VALIDATED,
    is_published=True,
    with_parent=True,
)
register(
    factories.AideFactory,
    "aide_published_with_parent_and_grandparent",
    organisme=LazyFixture("organisme"),
    status=Aide.Status.VALIDATED,
    is_published=True,
    with_parent=LazyFixture("aide_published_with_parent"),
)
register(
    factories.SpecificiteLocaleFactory,
    "specificite_locale",
    organisme=LazyFixture("organisme_with_departement"),
)
