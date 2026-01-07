import pytest

from django.urls import reverse


@pytest.mark.django_db
def test_home(client, theme):
    # WHEN requesting home page
    url = reverse("agri:home")
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200
