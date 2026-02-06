import pytest
from rest_framework.test import APIClient


@pytest.fixture
def client_api(admin_user):
    client = APIClient()
    client.force_authenticate(user=admin_user)
    yield client
