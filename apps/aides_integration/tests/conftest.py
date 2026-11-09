import pytest
from pytest_factoryboy import register
from rest_framework.test import APIClient

from .factories import RawAideFranceAgriMerFactory


@pytest.fixture
def client_api(admin_user):
    client = APIClient()
    client.force_authenticate(user=admin_user)
    yield client


register(RawAideFranceAgriMerFactory, "raw_aide_franceagrimer")
