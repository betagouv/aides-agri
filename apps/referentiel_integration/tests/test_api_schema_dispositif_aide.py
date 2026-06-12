import pytest
from django.urls import reverse

from referentiel_integration.models import RawDemarcheSchemaDispositifAide


@pytest.mark.django_db
class TestRawDemarcheSchemaAide:
    def test_anonymous_client_rejected(self, client):
        url = reverse(
            "api-referentiel-integration:rawdemarcheschemadispositifaide-list"
        )
        data = {"titre": "Coucou"}
        response = client.post(url, data, format="json")
        assert response.status_code == 401

    def test_create_dispositif(self, client_api):
        client = client_api
        # GIVEN no RawDemarcheSchemaAide and an authenticated API client
        assert not RawDemarcheSchemaDispositifAide.objects.exists()
        assert client.handler._force_user is not None

        # WHEN posting one through the API
        url = reverse(
            "api-referentiel-integration:rawdemarcheschemadispositifaide-list"
        )
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
            "referents_internes": [],
        }
        response = client.post(url, data, format="json")
        assert response.status_code == 201

        # THEN a RawDemarcheSchemaAide has been created with request users username as source
        assert RawDemarcheSchemaDispositifAide.objects.count() == 1
        dispositif = RawDemarcheSchemaDispositifAide.objects.first()
        assert dispositif.source == client.handler._force_user.username.upper()
        assert dispositif.id_externe == data["id"]
        assert dispositif.titre == data["titre"]
        assert dispositif.porteurs == data["porteurs"]

    def test_invalid_porteurs_not_a_list(self, client_api):
        client = client_api
        # GIVEN no RawDemarcheSchemaAide and an authenticated API client
        assert not RawDemarcheSchemaDispositifAide.objects.exists()
        assert client.handler._force_user is not None

        # WHEN posting one through the API, with invalid JSON for porteurs field
        url = reverse(
            "api-referentiel-integration:rawdemarcheschemadispositifaide-list"
        )
        data = {
            "id": "some-id-from-external-system",
            "titre": "Coucou",
            "porteurs": {"nom": "FranceAgriMer"},
        }
        response = client.post(url, data, format="json")

        # THEN HTTP error
        assert response.status_code == 400
        assert list(response.data.keys()) == ["porteurs"]
        assert len(response.data["porteurs"]) == 1
        assert response.data["porteurs"][0] == "Ce champ doit être une liste JSON"

    def test_invalid_porteurs_not_a_list_of_objects(self, client_api):
        client = client_api
        # GIVEN no RawDemarcheSchemaAide and an authenticated API client
        assert not RawDemarcheSchemaDispositifAide.objects.exists()
        assert client.handler._force_user is not None

        # WHEN posting one through the API, with invalid JSON for porteurs field
        url = reverse(
            "api-referentiel-integration:rawdemarcheschemadispositifaide-list"
        )
        data = {
            "id": "some-id-from-external-system",
            "titre": "Coucou",
            "porteurs": ["FranceAgriMer"],
        }
        response = client.post(url, data, format="json")

        # THEN HTTP error
        assert response.status_code == 400
        assert list(response.data.keys()) == ["porteurs"]
        assert len(response.data["porteurs"]) == 1
        assert (
            response.data["porteurs"][0]
            == "Les éléments de la liste JSON de ce champ doivent être des objets JSON"
        )

    def test_invalid_porteurs_roles_not_a_list(self, client_api):
        client = client_api
        # GIVEN no RawDemarcheSchemaAide and an authenticated API client
        assert not RawDemarcheSchemaDispositifAide.objects.exists()
        assert client.handler._force_user is not None

        # WHEN posting one through the API, with invalid JSON for porteurs field
        url = reverse(
            "api-referentiel-integration:rawdemarcheschemadispositifaide-list"
        )
        data = {
            "id": "some-id-from-external-system",
            "titre": "Coucou",
            "porteurs": [
                {"nom": "FranceAgriMer", "siren": "123456", "roles": "diffuseur"}
            ],
        }
        response = client.post(url, data, format="json")

        # THEN HTTP error
        assert response.status_code == 400
        assert list(response.data.keys()) == ["porteurs"]
        assert len(response.data["porteurs"]) == 1
        assert (
            response.data["porteurs"][0]
            == "L’attribut roles des éléments de la liste JSON de ce champ doit être une liste"
        )

    def test_invalid_porteurs_roles_empty_nom(self, client_api):
        client = client_api
        # GIVEN no RawDemarcheSchemaAide and an authenticated API client
        assert not RawDemarcheSchemaDispositifAide.objects.exists()
        assert client.handler._force_user is not None

        # WHEN posting one through the API, with invalid JSON for porteurs field
        url = reverse(
            "api-referentiel-integration:rawdemarcheschemadispositifaide-list"
        )
        data = {
            "id": "some-id-from-external-system",
            "titre": "Coucou",
            "porteurs": [{"nom": "", "siren": "123456", "roles": ["whatever"]}],
        }
        response = client.post(url, data, format="json")

        # THEN HTTP error
        assert response.status_code == 400
        assert list(response.data.keys()) == ["porteurs"]
        assert len(response.data["porteurs"]) == 1
        assert (
            response.data["porteurs"][0]
            == "L’attribut nom des éléments de la liste JSON de ce champ ne peut être vide"
        )

    def test_invalid_porteurs_roles_invalid_role(self, client_api):
        client = client_api
        # GIVEN no RawDemarcheSchemaAide and an authenticated API client
        assert not RawDemarcheSchemaDispositifAide.objects.exists()
        assert client.handler._force_user is not None

        # WHEN posting one through the API, with invalid JSON for porteurs field
        url = reverse(
            "api-referentiel-integration:rawdemarcheschemadispositifaide-list"
        )
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
        assert list(response.data.keys()) == ["porteurs"]
        assert len(response.data["porteurs"]) == 1
        assert (
            response.data["porteurs"][0]
            == "Les valeurs possibles pour l’attribut roles des éléments de la liste JSON de ce champ sont ['diffuseur', 'financeur', 'instructeur']"
        )

    def test_invalid_referents_internes_not_a_list(self, client_api):
        client = client_api
        # GIVEN no RawDemarcheSchemaAide and an authenticated API client
        assert not RawDemarcheSchemaDispositifAide.objects.exists()
        assert client.handler._force_user is not None

        # WHEN posting one through the API, with invalid JSON for referents_internes field
        url = reverse(
            "api-referentiel-integration:rawdemarcheschemadispositifaide-list"
        )
        data = {
            "id": "some-id-from-external-system",
            "titre": "Coucou",
            "referents_internes": {"nom": "Aide Man"},
        }
        response = client.post(url, data, format="json")

        # THEN HTTP error
        assert response.status_code == 400
        assert list(response.data.keys()) == ["referents_internes"]
        assert len(response.data["referents_internes"]) == 1
        assert (
            response.data["referents_internes"][0]
            == "Ce champ doit être une liste JSON"
        )

    def test_invalid_referents_internes_invalid_subfields(self, client_api):
        client = client_api
        # GIVEN no RawDemarcheSchemaAide and an authenticated API client
        assert not RawDemarcheSchemaDispositifAide.objects.exists()
        assert client.handler._force_user is not None

        # WHEN posting one through the API, with invalid JSON for referents_internes field
        url = reverse(
            "api-referentiel-integration:rawdemarcheschemadispositifaide-list"
        )
        data = {
            "id": "some-id-from-external-system",
            "titre": "Coucou",
            "referents_internes": [{"whatever": "coucou"}],
        }
        response = client.post(url, data, format="json")

        # THEN HTTP error
        assert response.status_code == 400
        assert list(response.data.keys()) == ["referents_internes"]
        assert len(response.data["referents_internes"]) == 1
        assert (
            response.data["referents_internes"][0]
            == "Les éléments de la liste JSON de ce champ doivent avoir pour attributs ['mail', 'nom', 'telephone']"
        )

    def test_invalid_referents_internes_empty_nom(self, client_api):
        client = client_api
        # GIVEN no RawDemarcheSchemaAide and an authenticated API client
        assert not RawDemarcheSchemaDispositifAide.objects.exists()
        assert client.handler._force_user is not None

        # WHEN posting one through the API, with invalid JSON for referents_internes field
        url = reverse(
            "api-referentiel-integration:rawdemarcheschemadispositifaide-list"
        )
        data = {
            "id": "some-id-from-external-system",
            "titre": "Coucou",
            "referents_internes": [
                {"nom": "", "mail": "aides-agri@beta.gouv.fr", "telephone": ""}
            ],
        }
        response = client.post(url, data, format="json")

        # THEN HTTP error
        assert response.status_code == 400
        assert list(response.data.keys()) == ["referents_internes"]
        assert len(response.data["referents_internes"]) == 1
        assert (
            response.data["referents_internes"][0]
            == "L’attribut nom des éléments de la liste JSON de ce champ ne peut être vide"
        )

    def test_invalid_referents_internes_empty_telephone_and_mail(self, client_api):
        client = client_api
        # GIVEN no RawDemarcheSchemaAide and an authenticated API client
        assert not RawDemarcheSchemaDispositifAide.objects.exists()
        assert client.handler._force_user is not None

        # WHEN posting one through the API, with invalid JSON for referents_internes field
        url = reverse(
            "api-referentiel-integration:rawdemarcheschemadispositifaide-list"
        )
        data = {
            "id": "some-id-from-external-system",
            "titre": "Coucou",
            "referents_internes": [{"nom": "Coucou", "mail": "", "telephone": ""}],
        }
        response = client.post(url, data, format="json")

        # THEN HTTP error
        assert response.status_code == 400
        assert list(response.data.keys()) == ["referents_internes"]
        assert len(response.data["referents_internes"]) == 1
        assert (
            response.data["referents_internes"][0]
            == "L’un des attributs mail ou telephone des éléments de la liste JSON de ce champ ne peut être vide"
        )

    def test_invalid_referents_internes_invalid_mail(self, client_api):
        client = client_api
        # GIVEN no RawDemarcheSchemaAide and an authenticated API client
        assert not RawDemarcheSchemaDispositifAide.objects.exists()
        assert client.handler._force_user is not None

        # WHEN posting one through the API, with invalid JSON for referents_internes field
        url = reverse(
            "api-referentiel-integration:rawdemarcheschemadispositifaide-list"
        )
        data = {
            "id": "some-id-from-external-system",
            "titre": "Coucou",
            "referents_internes": [
                {"nom": "Coucou", "mail": "pasuneadressemail", "telephone": ""}
            ],
        }
        response = client.post(url, data, format="json")

        # THEN HTTP error
        assert response.status_code == 400
        assert list(response.data.keys()) == ["referents_internes"]
        assert len(response.data["referents_internes"]) == 1
        assert (
            response.data["referents_internes"][0]
            == "L’attribut mail des éléments de la liste JSON de ce champ doit contenir une adresse e-mail"
        )

    def test_invalid_base_juridique_not_a_list(self, client_api):
        client = client_api
        # GIVEN no RawDemarcheSchemaAide and an authenticated API client
        assert not RawDemarcheSchemaDispositifAide.objects.exists()
        assert client.handler._force_user is not None

        # WHEN posting one through the API, with invalid JSON for porteurs field
        url = reverse(
            "api-referentiel-integration:rawdemarcheschemadispositifaide-list"
        )
        data = {
            "id": "some-id-from-external-system",
            "titre": "Coucou",
            "base_juridique": {
                "libelle": "FranceAgriMer décision n°123456",
                "lien": "https://francegrimer.fr/decision123456",
            },
        }
        response = client.post(url, data, format="json")

        # THEN HTTP error
        assert response.status_code == 400
        assert list(response.data.keys()) == ["base_juridique"]
        assert len(response.data["base_juridique"]) == 1
        assert response.data["base_juridique"][0] == "Ce champ doit être une liste JSON"

    def test_invalid_base_juridique_not_a_list_of_objects(self, client_api):
        client = client_api
        # GIVEN no RawDemarcheSchemaAide and an authenticated API client
        assert not RawDemarcheSchemaDispositifAide.objects.exists()
        assert client.handler._force_user is not None

        # WHEN posting one through the API, with invalid JSON for porteurs field
        url = reverse(
            "api-referentiel-integration:rawdemarcheschemadispositifaide-list"
        )
        data = {
            "id": "some-id-from-external-system",
            "titre": "Coucou",
            "base_juridique": ["FranceAgriMer décision 123456"],
        }
        response = client.post(url, data, format="json")

        # THEN HTTP error
        assert response.status_code == 400
        assert list(response.data.keys()) == ["base_juridique"]
        assert len(response.data["base_juridique"]) == 1
        assert (
            response.data["base_juridique"][0]
            == "Les éléments de la liste JSON de ce champ doivent être des objets JSON"
        )

    def test_invalid_base_juridique_no_libelle(self, client_api):
        client = client_api
        # GIVEN no RawDemarcheSchemaAide and an authenticated API client
        assert not RawDemarcheSchemaDispositifAide.objects.exists()
        assert client.handler._force_user is not None

        # WHEN posting one through the API, with invalid JSON for porteurs field
        url = reverse(
            "api-referentiel-integration:rawdemarcheschemadispositifaide-list"
        )
        data = {
            "id": "some-id-from-external-system",
            "titre": "Coucou",
            "base_juridique": [
                {
                    "libelle": "",
                    "lien": "https://francegrimer.fr/decision123456",
                }
            ],
        }
        response = client.post(url, data, format="json")

        # THEN HTTP error
        assert response.status_code == 400
        assert list(response.data.keys()) == ["base_juridique"]
        assert len(response.data["base_juridique"]) == 1
        assert (
            response.data["base_juridique"][0]
            == "L’attribut libelle des éléments de la liste JSON de ce champ ne peut être vide"
        )

    def test_invalid_base_juridique_no_lien(self, client_api):
        client = client_api
        # GIVEN no RawDemarcheSchemaAide and an authenticated API client
        assert not RawDemarcheSchemaDispositifAide.objects.exists()
        assert client.handler._force_user is not None

        # WHEN posting one through the API, with invalid JSON for porteurs field
        url = reverse(
            "api-referentiel-integration:rawdemarcheschemadispositifaide-list"
        )
        data = {
            "id": "some-id-from-external-system",
            "titre": "Coucou",
            "base_juridique": [
                {
                    "libelle": "FranceAgriMer décision n°123456",
                    "lien": "",
                }
            ],
        }
        response = client.post(url, data, format="json")

        # THEN HTTP error
        assert response.status_code == 400
        assert list(response.data.keys()) == ["base_juridique"]
        assert len(response.data["base_juridique"]) == 1
        assert (
            response.data["base_juridique"][0]
            == "L’attribut lien des éléments de la liste JSON de ce champ ne peut être vide"
        )

    def test_invalid_base_juridique_invalid_lien(self, client_api):
        client = client_api
        # GIVEN no RawDemarcheSchemaAide and an authenticated API client
        assert not RawDemarcheSchemaDispositifAide.objects.exists()
        assert client.handler._force_user is not None

        # WHEN posting one through the API, with invalid JSON for porteurs field
        url = reverse(
            "api-referentiel-integration:rawdemarcheschemadispositifaide-list"
        )
        data = {
            "id": "some-id-from-external-system",
            "titre": "Coucou",
            "base_juridique": [
                {
                    "libelle": "FranceAgriMer décision n°123456",
                    "lien": "cecinestpasuneurl",
                }
            ],
        }
        response = client.post(url, data, format="json")

        # THEN HTTP error
        assert response.status_code == 400
        assert list(response.data.keys()) == ["base_juridique"]
        assert len(response.data["base_juridique"]) == 1
        assert (
            response.data["base_juridique"][0]
            == "L’attribut lien des éléments de la liste JSON de ce champ doit contenir une URL"
        )
