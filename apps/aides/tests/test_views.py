import pytest
from django.urls import reverse

from aides.models import Aide


@pytest.mark.django_db
def test_aide_detail_not_published(client, aide):
    # GIVEN an unpublished Aide and an anonymous client
    assert not aide.is_published
    # WHEN calling its public URL
    res = client.get(reverse("aides:aide", args=[aide.pk, aide.slug]))
    # THEN get a 404
    assert res.status_code == 404


@pytest.mark.django_db
def test_aide_detail_not_published_logged_as_admin(admin_client, aide):
    # GIVEN an unpublished Aide and an admin client
    assert not aide.is_published
    client = admin_client
    # WHEN calling its public URL
    res = client.get(reverse("aides:aide", args=[aide.pk, aide.slug]))
    # THEN get a 200
    assert res.status_code == 200


@pytest.mark.django_db
def test_aide_detail_published(client, aide_published):
    # GIVEN a published Aide and an anonymous client
    aide = aide_published
    assert aide.is_published
    # WHEN calling its public URL
    res = client.get(reverse("aides:aide", args=[aide.pk, aide.slug]))
    # THEN get a 200
    assert res.status_code == 200


@pytest.mark.django_db
def test_parent_aide_detail_published(client, aide_published_with_parent):
    # GIVEN a published Aide with a parent and an anonymous client
    aide = aide_published_with_parent
    assert aide.is_published
    assert aide.parent
    assert aide.parent.is_published
    assert aide.parent.children.exists()
    # WHEN calling its public URL
    aide_url = reverse("aides:aide", args=[aide.pk, aide.slug])
    res = client.get(aide_url)
    # THEN get a 200, and get a link to the parent page
    assert res.status_code == 200
    html = res.content.decode("utf-8")
    assert f'href="{aide.parent.get_absolute_url()}"' in html
    # WHEN calling the parent's public URL
    res = client.get(
        reverse("aides:parent-aide", args=[aide.parent.pk, aide.parent.slug]),
        headers={"referer": aide_url},
    )
    assert res.status_code == 200
    html = res.content.decode("utf-8")
    assert f'class="fr-breadcrumb__link" href="{aide_url}?"' in html


@pytest.mark.django_db
@pytest.mark.parametrize("aide__status", [Aide.Status.REVIEW_EXPERT])
def test_sneak_peek_view(client, aide):
    # GIVEN a non-published Aide which requires external validation
    assert not aide.is_published
    assert aide.status == Aide.Status.REVIEW_EXPERT

    # WHEN calling its sneak-peek view
    aide_sneak_peek_url = reverse(
        "aides:aide-sneak-peek", args=[aide.pk, aide.sneak_peek_token]
    )
    res = client.get(aide_sneak_peek_url)

    # THEN get a 200
    assert res.status_code == 200


@pytest.mark.django_db
@pytest.mark.parametrize("aide__status", [Aide.Status.REVIEW_EXPERT])
def test_sneak_peek_view_returns_404_if_wrong_token(client, aide):
    # GIVEN a non-published Aide which requires external validation
    assert not aide.is_published
    assert aide.status == Aide.Status.REVIEW_EXPERT

    # WHEN calling its sneak-peek view
    aide_sneak_peek_url = reverse(
        "aides:aide-sneak-peek", args=[aide.pk, "wrong_token"]
    )
    res = client.get(aide_sneak_peek_url)

    # THEN get a 404
    assert res.status_code == 404


@pytest.mark.django_db
@pytest.mark.parametrize("aide_published__status", [Aide.Status.REVIEW_EXPERT])
def test_sneak_peek_view_returns_404_for_published_aide(client, aide_published):
    # GIVEN a published Aide
    aide = aide_published
    assert aide.is_published

    # WHEN calling its sneak-peek view
    aide_sneak_peek_url = reverse(
        "aides:aide-sneak-peek", args=[aide.pk, aide.sneak_peek_token]
    )
    res = client.get(aide_sneak_peek_url)

    # THEN get a 404
    assert res.status_code == 404
