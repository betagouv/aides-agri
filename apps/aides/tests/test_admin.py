import csv
import io

import pytest
from django.urls import reverse
from django_otp import middleware as django_otp_middleware
from pytest_factoryboy import LazyFixture

from aides.models import Aide, Theme


def test_aide_admin(admin_client, aide, monkeypatch):
    # we don't care about 2FA here, let's skip it
    monkeypatch.setattr(django_otp_middleware, "is_verified", lambda u: True)

    url = reverse("admin:aides_aide_change", args=[aide.pk])
    res = admin_client.get(url)
    assert res.status_code == 200


def test_add_aide(admin_client, monkeypatch, organisme):
    # we don't care about 2FA here, let's skip it
    monkeypatch.setattr(django_otp_middleware, "is_verified", lambda u: True)

    # GIVEN no Aide
    assert not Aide.objects.exists()

    # WHEN POSTing to add Aide
    url = reverse("admin:aides_aide_add")
    res = admin_client.post(
        url,
        data={
            "nom": "Aide de test",
            "organisme": organisme.pk,
            "is_derivable": False,
            "importance": Aide.Importance.BASE,
            "urgence": Aide.Urgence.LOW,
            "status": "00",
        },
        headers={"host": "localhost"},
    )

    # THEN an Aide has been created
    assert res.status_code == 302
    assert Aide.objects.count() == 1
    aide = Aide.objects.first()
    assert aide.slug == "organisme-1-aide-de-test"
    assert aide.status == Aide.Status.TODO


@pytest.mark.parametrize("aide__is_derivable", [True])
@pytest.mark.parametrize("aide__status", [Aide.Status.TO_BE_DERIVED])
@pytest.mark.parametrize("aide__organisme", [LazyFixture("organisme")])
@pytest.mark.parametrize("aide__url_descriptif", ["https://www.franceagrimer.fr"])
def test_derive_aide(admin_client, monkeypatch, aide):
    # we don't care about 2FA here, let's skip it
    monkeypatch.setattr(django_otp_middleware, "is_verified", lambda u: True)

    # GIVEN one derivable Aide
    assert Aide.objects.count()
    aide = Aide.objects.first()
    assert aide.is_derivable
    assert aide.organisme is not None

    # WHEN POSTing to add an Aide derived from the existing one
    url = reverse("admin:aides_aide_add")
    res = admin_client.post(
        url,
        query_params={"parent": aide.pk},
        data={
            "parent": aide.pk,
            "nom": "Aide déclinée",
            "is_derivable": False,
        },
        headers={"host": "localhost"},
    )

    # THEN an Aide has been created:
    # - At initial edition status
    # - With relation to its parent
    # - And other properties copied
    assert res.status_code == 302
    assert Aide.objects.count() == 2
    derived = Aide.objects.order_by("pk").last()
    assert derived.parent == aide
    assert derived.status == Aide.Status.CHOSEN
    assert derived.organisme == aide.organisme
    assert derived.url_descriptif == aide.url_descriptif


@pytest.mark.parametrize("aide__is_derivable", [True])
@pytest.mark.parametrize("aide__status", [Aide.Status.TO_BE_DERIVED])
@pytest.mark.parametrize("aide__organisme", [LazyFixture("organisme")])
@pytest.mark.parametrize("aide__url_descriptif", ["https://www.franceagrimer.fr"])
@pytest.mark.parametrize(
    "aide__couverture_geographique", [Aide.CouvertureGeographique.DEPARTEMENTAL]
)
@pytest.mark.parametrize("aide__is_published", [True])
def test_derive_aide_departementale(
    admin_client, monkeypatch, aide, zone_geographique_departement_13
):
    # we don't care about 2FA here, let's skip it
    monkeypatch.setattr(django_otp_middleware, "is_verified", lambda u: True)

    # GIVEN one derivable Departemental published Aide
    assert Aide.objects.count()
    aide = Aide.objects.first()
    assert aide.is_derivable
    assert aide.organisme is not None
    assert aide.is_published
    assert aide.is_departemental

    # WHEN POSTing to add an Aide derived from the existing one
    url = reverse("admin:aides_aide_derive_for_departements", args=[aide.pk])
    res = admin_client.post(url, headers={"host": "localhost"})

    # THEN an Aide has been created:
    # - At initial status
    # - With relation to its parent
    # - And other properties copied
    assert res.status_code == 302
    assert Aide.objects.count() == 2
    derived = Aide.objects.order_by("pk").last()
    assert derived.parent == aide
    assert derived.status == Aide.Status.CHOSEN
    assert derived.organisme == aide.organisme
    assert derived.url_descriptif == aide.url_descriptif
    assert derived.is_published
    assert set(derived.zones_geographiques.all()) == {zone_geographique_departement_13}


def test_themes_csv_export(admin_client, monkeypatch, theme):
    # we don't care about 2FA here, let's skip it
    monkeypatch.setattr(django_otp_middleware, "is_verified", lambda u: True)

    # GIVEN one Theme
    assert Theme.objects.count() == 1

    # WHEN requesting a CSV export
    url = reverse("admin:aides_theme_export_to_csv")
    res = admin_client.get(url, headers={"host": "localhost"})

    # THEN it's a 200 and it returns a CSV file download
    assert res.status_code == 200
    assert res.headers["Content-Disposition"].startswith("attachment; filename=")
    assert res.headers["Content-Disposition"].endswith('.csv"')
    csvreader = csv.reader(io.StringIO(res.text))
    for i, row in enumerate(csvreader):
        assert len(row) == 6
        if i == 1:
            assert row[0] == theme.nom_court
