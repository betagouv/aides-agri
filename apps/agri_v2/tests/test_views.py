import pytest

from django.urls import reverse


@pytest.mark.django_db
def test_home(client, theme_urgence):
    # WHEN requesting home page
    url = reverse("agri_v2:home")
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200


@pytest.mark.django_db
def test_results(client):
    # WHEN requesting home page
    url = reverse("agri_v2:results")
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200
