import pytest
from django.urls import reverse


@pytest.mark.django_db
def test_aide_detail_not_published(client, aide):
    res = client.get(reverse("aides:aide", args=[aide.pk, aide.slug]))
    assert res.status_code == 404


@pytest.mark.django_db
def test_aide_detail_not_published_logged_as_admin(admin_client, aide):
    res = admin_client.get(reverse("aides:aide", args=[aide.pk, aide.slug]))
    assert res.status_code == 200


@pytest.mark.django_db
def test_aide_detail_published(client, aide):
    aide.status = aide.Status.PUBLISHED
    aide.save()
    res = client.get(reverse("aides:aide", args=[aide.pk, aide.slug]))
    assert res.status_code == 200
