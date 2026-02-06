import pytest
from django.urls import reverse

from referentiel_integration.models import DispositifSchemaAide


@pytest.mark.django_db
class TestDispositifSchemaAide:
    def test_anonymous_client_rejected(self, client):
        url = reverse("api-referentiel-integration:dispositifschemaaide-list")
        data = {"titre": "Coucou"}
        response = client.post(url, data, format="json")
        assert response.status_code == 401

    def test_create_dispositif(self, client_api):
        client = client_api
        # GIVEN no DispositifSchemaAide and an authenticated API client
        assert not DispositifSchemaAide.objects.exists()
        assert client.handler._force_user is not None

        # WHEN posting one through the API
        url = reverse("api-referentiel-integration:dispositifschemaaide-list")
        data = {
            "id": "some-id-from-external-system",
            "titre": "Coucou",
            "porteurs": [
                {
                    "nom": "FranceAgriMer",
                    "siren": "123456",
                    "roles": ["financeur", "instructeur"],
                }
            ],
        }
        response = client.post(url, data, format="json")
        assert response.status_code == 201

        # THEN a DispositifSchemaAide has been created with request users username as source
        assert DispositifSchemaAide.objects.count() == 1
        dispositif = DispositifSchemaAide.objects.first()
        assert dispositif.source == client.handler._force_user.username.upper()
        assert dispositif.id_externe == data["id"]
        assert dispositif.titre == data["titre"]
        assert dispositif.porteurs == data["porteurs"]

    def test_invalid_porteurs(self, client_api):
        client = client_api
        # GIVEN no DispositifSchemaAide and an authenticated API client
        assert not DispositifSchemaAide.objects.exists()
        assert client.handler._force_user is not None

        # WHEN posting one through the API, with invalid JSON for porteurs field
        url = reverse("api-referentiel-integration:dispositifschemaaide-list")
        data = {
            "id": "some-id-from-external-system",
            "titre": "Coucou",
            "porteurs": {"nom": "FranceAgriMer"},
        }
        response = client.post(url, data, format="json")

        # THEN HTTP error
        assert response.status_code == 400

    def test_invalid_porteurs_roles(self, client_api):
        client = client_api
        # GIVEN no DispositifSchemaAide and an authenticated API client
        assert not DispositifSchemaAide.objects.exists()
        assert client.handler._force_user is not None

        # WHEN posting one through the API, with invalid JSON for porteurs field
        url = reverse("api-referentiel-integration:dispositifschemaaide-list")
        data = {
            "id": "some-id-from-external-system",
            "titre": "Coucou",
            "porteurs": [
                {"nom": "FranceAgriMer", "siren": "123456", "roles": ["whatever"]}
            ],
        }
        response = client.post(url, data, format="json")

        # THEN HTTP error
        assert response.status_code == 400
