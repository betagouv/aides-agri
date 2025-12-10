import pytest
from django.urls import reverse


@pytest.mark.django_db
def test_mentions_legales(client):
    res = client.get(reverse("product:mentions-legales"))
    assert res.status_code == 200


@pytest.mark.django_db
def test_donnees_personnelles(client):
    res = client.get(reverse("product:donnees-personnelles"))
    assert res.status_code == 200


@pytest.mark.django_db
def test_declaration_accessibilite(client):
    res = client.get(reverse("product:declaration-accessibilite"))
    assert res.status_code == 200


@pytest.mark.django_db
def test_cgu(client):
    res = client.get(reverse("product:cgu"))
    assert res.status_code == 200
