import pytest
from pytest_factoryboy import register, LazyFixture
from rest_framework.test import APIClient

from aides.models import ZoneGeographique
from aides.tests.factories import OrganismeFactory, ZoneGeographiqueFactory, AideFactory
from .factories import RawAideFranceAgriMerFactory, RawAideRegionOccitanieFactory


@pytest.fixture
def client_api(admin_user):
    client = APIClient()
    client.force_authenticate(user=admin_user)
    yield client


register(AideFactory)
register(RawAideFranceAgriMerFactory, "raw_aide_franceagrimer")
register(RawAideRegionOccitanieFactory, "raw_aide_region_occitanie")
register(
    RawAideRegionOccitanieFactory,
    "raw_aide_region_occitanie_integrated",
    aide=LazyFixture("aide"),
)
register(
    ZoneGeographiqueFactory,
    "zone_geographique_region_occitanie",
    type=ZoneGeographique.Type.REGION,
    code="01",
    nom="Occitanie",
)
register(OrganismeFactory, "organisme_region_occitanie", nom="Région Occitanie")
