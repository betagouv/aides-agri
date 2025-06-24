import pytest
from django.http.request import QueryDict
from django.urls import reverse

from .common import fake_siret, fake_api_response_one_hit


@pytest.mark.django_db
def test_home(client, theme):
    # WHEN requesting home page
    url = reverse("agri:home")
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200


@pytest.mark.django_db
def test_step_2(client, sujet):
    # WHEN requesting step 2
    querydict = QueryDict(mutable=True)
    querydict.update({"theme": sujet.themes.first().pk})
    url = reverse("agri:step-2") + "?" + querydict.urlencode()
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200


@pytest.mark.django_db
def test_step_3(client, sujet):
    # WHEN requesting step 3
    querydict = QueryDict(mutable=True)
    querydict.update({"theme": sujet.themes.first().pk})
    querydict.setlist("sujets", [sujet.pk])
    url = reverse("agri:step-3") + "?" + querydict.urlencode()
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200


@pytest.mark.django_db
def test_search_etablissement(requests_mock, client):
    # GIVEN the official companies API returns a result for a given Siret
    requests_mock.get(
        "https://recherche-entreprises.api.gouv.fr/search?q=entreprise",
        text=fake_api_response_one_hit,
    )

    # WHEN requesting search company with that Siret
    querydict = QueryDict(mutable=True)
    querydict.update({"q": "entreprise"})
    url = reverse("agri:search-etablissement") + "?" + querydict.urlencode()
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200


@pytest.mark.django_db
def test_step_4(requests_mock, client, sujet, zone_geographique_commune_75001):
    # GIVEN the official companies API returns a result for a given Siret
    requests_mock.get(
        f"https://recherche-entreprises.api.gouv.fr/search?q={fake_siret}",
        text=fake_api_response_one_hit,
    )

    # WHEN requesting step 4 with that Siret
    querydict = QueryDict(mutable=True)
    querydict.update({"theme": sujet.themes.first().pk, "siret": fake_siret})
    querydict.setlist("sujets", [sujet.pk])
    url = reverse("agri:step-4") + "?" + querydict.urlencode()
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200


@pytest.mark.django_db
def test_search_commune(requests_mock, client, zone_geographique_commune_75001):
    # GIVEN a Commune ZoneGeographique
    assert zone_geographique_commune_75001.is_commune

    # WHEN requesting search company with that Siret
    querydict = QueryDict(mutable=True)
    querydict.update({"q": zone_geographique_commune_75001.code})
    url = reverse("agri:search-commune") + "?" + querydict.urlencode()
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200


@pytest.mark.django_db
def test_step_5(requests_mock, client, sujet, zone_geographique_commune_75001):
    # GIVEN the official companies API returns a result for a given Siret
    requests_mock.get(
        f"https://recherche-entreprises.api.gouv.fr/search?q={fake_siret}",
        text=fake_api_response_one_hit,
    )

    # WHEN requesting step 5
    querydict = QueryDict(mutable=True)
    querydict.update({"theme": sujet.themes.first().pk, "siret": fake_siret})
    querydict.setlist("sujets", [sujet.pk])
    url = reverse("agri:step-5") + "?" + querydict.urlencode()
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200


@pytest.mark.django_db
def test_results(
    requests_mock,
    client,
    theme,
    sujet,
    type_aide_conseil,
    zone_geographique_commune_75001,
    zone_geographique_departement_75,
):
    # GIVEN the official companies API returns a result for a given Siret
    requests_mock.get(
        f"https://recherche-entreprises.api.gouv.fr/search?q={fake_siret}",
        text=fake_api_response_one_hit,
    )

    # WHEN requesting results
    querydict = QueryDict(mutable=True)
    querydict.update(
        {
            "theme": sujet.themes.first().pk,
            "siret": fake_siret,
            "commune": zone_geographique_commune_75001.code,
            "tranche_effectif_salarie": "01",
        }
    )
    querydict.setlist("sujets", [sujet.pk])
    url = reverse("agri:results") + "?" + querydict.urlencode()
    response = client.get(url)
    assert response.status_code == 200
