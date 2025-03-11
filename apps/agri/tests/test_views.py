from urllib.parse import urlencode

import pytest
from django.urls import reverse

from .common import fake_siret, fake_api_response_one_hit


@pytest.mark.django_db
def test_step_1(client):
    # WHEN requesting step 1
    url = reverse("agri:step-1")
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200


@pytest.mark.django_db
def test_step_2(client):
    # WHEN requesting step 2
    url = reverse("agri:step-2") + "?" + urlencode({"theme": "Thème 1"})
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200


@pytest.mark.django_db
def test_step_3(client):
    # WHEN requesting step 3
    url = (
        reverse("agri:step-3")
        + "?"
        + urlencode({"theme": "Thème 1", "subject": "Sujet 1"})
    )
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200


@pytest.mark.django_db
def test_search_company(requests_mock, client):
    # GIVEN the official companies API returns a result for a given Siret
    requests_mock.get(
        "https://recherche-entreprises.api.gouv.fr/search?q=entreprise",
        text=fake_api_response_one_hit,
    )

    # WHEN requesting search company with that Siret
    url = reverse("agri:find-company") + "?" + urlencode({"q": "entreprise"})
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200


@pytest.mark.django_db
def test_step_4(requests_mock, client):
    # GIVEN the official companies API returns a result for a given Siret
    requests_mock.get(
        f"https://recherche-entreprises.api.gouv.fr/search?q={fake_siret}",
        text=fake_api_response_one_hit,
    )

    # WHEN requesting step 4 with that Siret
    url = (
        reverse("agri:step-4")
        + "?"
        + urlencode({"theme": "Thème 1", "subject": "Sujet 1", "siret": fake_siret})
    )
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200


@pytest.mark.django_db
def test_step_5(requests_mock, client):
    # GIVEN the official companies API returns a result for a given Siret
    requests_mock.get(
        f"https://recherche-entreprises.api.gouv.fr/search?q={fake_siret}",
        text=fake_api_response_one_hit,
    )

    # WHEN requesting step 5
    url = (
        reverse("agri:step-5")
        + "?"
        + urlencode({"theme": "Thème 1", "subject": "Sujet 1", "siret": fake_siret})
    )
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200


@pytest.mark.django_db
def test_results(client):
    # WHEN requesting results
    url = (
        reverse("agri:results")
        + "?"
        + urlencode({"theme": "Thème 1", "subject": "Sujet 1", "siret": fake_siret})
    )
    response = client.get(url)
    assert response.status_code == 200
