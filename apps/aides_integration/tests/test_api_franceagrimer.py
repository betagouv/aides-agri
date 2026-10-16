import pytest
from django.urls import reverse
from reversion.models import Version

from aides_integration.models import RawAideFranceAgriMer


@pytest.mark.django_db
class TestRawAideFranceAgriMer:
    def test_anonymous_client_rejected(self, client):
        url = reverse("aides_integration:rawaidefranceagrimer-list")
        data = {"titre": "Coucou"}
        response = client.post(url, data, format="json")
        assert response.status_code == 401

    def test_create(self, client_api):
        client = client_api
        # GIVEN no RawAideFranceAgriMer and an authenticated API client
        assert not RawAideFranceAgriMer.objects.exists()
        assert client.handler._force_user is not None

        # WHEN posting one through the API
        url = reverse("aides_integration:rawaidefranceagrimer-list")
        data = {
            "id": "some-id-from-external-system",
            "titre": "Coucou",
            "description": "<p>Ça va ?</p>",
        }
        response = client.post(url, data, format="json")
        assert response.status_code == 201

        # THEN a RawAideFranceAgriMer has been created with request users username as source
        assert RawAideFranceAgriMer.objects.count() == 1
        dispositif = RawAideFranceAgriMer.objects.first()
        assert dispositif.source == client.handler._force_user.username.upper()
        assert dispositif.id_externe == data["id"]
        assert dispositif.titre == data["titre"]
        assert dispositif.description == data["description"]

    @pytest.mark.parametrize("raw_aide_franceagrimer__source", ["ADMIN"])
    def test_update(self, client_api, raw_aide_franceagrimer):
        client = client_api
        # GIVEN 1 RawAideFranceAgriMer with no Version and an authenticated API client
        assert RawAideFranceAgriMer.objects.count() == 1
        assert client.handler._force_user is not None
        existing = raw_aide_franceagrimer
        assert not Version.objects.get_for_object(existing).exists()

        # WHEN posting one through the API
        url = reverse("aides_integration:rawaidefranceagrimer-list")
        data = {
            "id": existing.id_externe,
            "titre": "Coucou",
            "description": "<p>Ça va ?</p>",
        }
        response = client.post(url, data, format="json")
        assert response.status_code == 201

        # THEN there is still 1 RawAideFranceAgriMer, but with a new Version
        assert RawAideFranceAgriMer.objects.count() == 1
        assert Version.objects.get_for_object(existing).count() == 1

    @pytest.mark.parametrize("raw_aide_franceagrimer__source", ["ADMIN"])
    def test_delete(self, client_api, raw_aide_franceagrimer):
        client = client_api
        # GIVEN 1 RawAideFranceAgriMer with no Version and an authenticated API client
        assert RawAideFranceAgriMer.objects.count() == 1
        assert client.handler._force_user is not None
        existing = raw_aide_franceagrimer
        assert not Version.objects.get_for_object(existing).exists()

        # WHEN posting one through the API
        url = reverse(
            "aides_integration:rawaidefranceagrimer-detail",
            args=[raw_aide_franceagrimer.id_externe],
        )
        response = client.delete(url, format="json")
        assert response.status_code == 204

        # THEN there is still 1 RawAideFranceAgriMer, but with a new Version
        assert RawAideFranceAgriMer.objects.count() == 1
        assert Version.objects.get_for_object(existing).count() == 1
        existing.refresh_from_db()
        assert existing.is_deleted
