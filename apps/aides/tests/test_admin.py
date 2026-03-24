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
    assert aide.slug == f"organisme-{organisme.nom.split()[-1]}-aide-de-test"
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


@pytest.mark.parametrize(
    "aide_published_with_parent__url_descriptif", ["https://beta.gouv.fr"]
)
def test_change_parent_aide_applies_changes_to_children(
    monkeypatch,
    admin_client,
    aide_published_with_parent,
    zone_geographique_departement_13,
):
    # we don't care about 2FA here, let's skip it
    monkeypatch.setattr(django_otp_middleware, "is_verified", lambda u: True)

    aide = aide_published_with_parent

    # GIVEN a derived Aide
    assert aide.parent.url_descriptif != aide.url_descriptif

    # WHEN POSTing to change the parent Aide
    url = reverse("admin:aides_aide_change", args=[aide.parent.pk])
    res = admin_client.post(
        url,
        headers={"host": "localhost"},
        data={
            "nom": "Coucou trop bien",
            "organisme": aide.parent.organisme_id,
            "status": aide.parent.status,
            "importance": aide.parent.importance,
            "urgence": aide.parent.urgence,
            "couverture_geographique": Aide.CouvertureGeographique.DEPARTEMENTAL,
            "zones_geographiques": [zone_geographique_departement_13.pk],
            "url_descriptif": "https://aides-agri.beta.gouv.fr",
        },
    )

    # THEN the child Aide has been changed as well, but not everything
    assert res.status_code == 302
    aide.refresh_from_db()
    # have changed on both parent and child
    assert aide.parent.url_descriptif == "https://aides-agri.beta.gouv.fr"
    assert aide.url_descriptif == aide.parent.url_descriptif
    assert (
        aide.parent.couverture_geographique == Aide.CouvertureGeographique.DEPARTEMENTAL
    )
    assert aide.couverture_geographique == aide.parent.couverture_geographique
    assert set(aide.parent.zones_geographiques.all()) == {
        zone_geographique_departement_13
    }
    assert set(aide.zones_geographiques.all()) == set(
        aide.parent.zones_geographiques.all()
    )
    # have changed on parent only
    assert aide.nom != aide.parent.nom


@pytest.mark.parametrize("aide__organisme", [LazyFixture("organisme")])
@pytest.mark.parametrize("aide_published__organisme", [LazyFixture("organisme")])
@pytest.mark.parametrize("aide__url_descriptif", ["https://beta.gouv.fr"])
@pytest.mark.parametrize("aide_published__url_descriptif", ["https://beta.gouv.fr"])
@pytest.mark.parametrize(
    "aide__couverture_geographique", [Aide.CouvertureGeographique.REGIONAL]
)
@pytest.mark.parametrize(
    "aide_published__couverture_geographique",
    [Aide.CouvertureGeographique.DEPARTEMENTAL],
)
def test_make_parent_aide_from_existing_aides(
    admin_client, monkeypatch, aide, aide_published
):
    # we don't care about 2FA here, let's skip it
    monkeypatch.setattr(django_otp_middleware, "is_verified", lambda u: True)

    # GIVEN 2 Aides
    assert Aide.objects.count() == 2
    assert aide.parent is None
    assert aide_published.parent is None
    assert aide.organisme == aide_published.organisme

    # WHEN going to its "duplicate Aide" form
    url = reverse("admin:aides_aide_changelist")
    res = admin_client.post(
        url,
        data={
            "action": "make_parent_aide_from_existing_aides",
            "_selected_action": [aide.pk, aide_published.pk],
        },
    )

    # THEN a new Aide was created
    assert res.status_code == 302
    assert Aide.objects.count() == 3
    aide.refresh_from_db()
    aide_published.refresh_from_db()
    # both selected Aide have now a parent
    parent = aide.parent
    assert parent is not None
    assert aide_published.parent == parent
    # identical fields have been factorized to the parent
    assert parent.organisme == aide.organisme
    assert parent.url_descriptif == aide.url_descriptif
    # fields with different values have not been
    assert parent.couverture_geographique != aide.couverture_geographique


@pytest.mark.parametrize("aide_published__organisme", [LazyFixture("organisme")])
@pytest.mark.parametrize(
    "aide_published__couverture_geographique", [Aide.CouvertureGeographique.REGIONAL]
)
@pytest.mark.parametrize(
    "aide_published__url_descriptif", ["https://www.franceagrimer.fr"]
)
@pytest.mark.parametrize("aide_published__with_given_sujet", [LazyFixture("sujet")])
def test_duplicate_aide_form(admin_client, monkeypatch, aide_published, sujet):
    # we don't care about 2FA here, let's skip it
    monkeypatch.setattr(django_otp_middleware, "is_verified", lambda u: True)

    # GIVEN one published Aide
    assert Aide.objects.count() == 1
    aide = Aide.objects.first()
    assert aide.organisme is not None
    assert set(aide.sujets.all()) == {sujet}
    assert aide.is_published

    # WHEN going to its "duplicate Aide" form
    url = reverse("admin:aides_aide_duplicate", args=[aide.pk])
    res = admin_client.get(url)

    # THEN
    assert res.status_code == 200
    assert list(res.context_data["fields"].keys()) == [
        Aide.url_descriptif.field,
        Aide.urgence.field,
        Aide.sujets.field,
        Aide.organisme.field,
        Aide.couverture_geographique.field,
    ]


@pytest.mark.parametrize("aide_published__status", [Aide.Status.VALIDATED])
@pytest.mark.parametrize("aide_published__organisme", [LazyFixture("organisme")])
@pytest.mark.parametrize(
    "aide_published__couverture_geographique", [Aide.CouvertureGeographique.REGIONAL]
)
@pytest.mark.parametrize(
    "aide_published__url_descriptif", ["https://www.franceagrimer.fr"]
)
@pytest.mark.parametrize("aide_published__with_given_sujet", [LazyFixture("sujet")])
def test_duplicate_aide(admin_client, monkeypatch, aide_published, sujet):
    # we don't care about 2FA here, let's skip it
    monkeypatch.setattr(django_otp_middleware, "is_verified", lambda u: True)

    # GIVEN one published Aide
    assert Aide.objects.count() == 1
    aide = Aide.objects.first()
    assert aide.organisme is not None
    assert set(aide.sujets.all()) == {sujet}
    assert aide.is_published

    # WHEN going to its "duplicate Aide" form
    url = reverse("admin:aides_aide_duplicate", args=[aide.pk])
    res = admin_client.post(
        url, data={"fields": ["url_descriptif", "organisme", "sujets"]}
    )

    # THEN
    assert res.status_code == 302
    assert Aide.objects.count() == 2
    new_aide = Aide.objects.order_by("pk").last()
    assert not new_aide.is_published
    assert new_aide.status == Aide.Status.CHOSEN
    assert new_aide.url_descriptif == aide.url_descriptif
    assert new_aide.organisme == aide.organisme
    assert set(new_aide.sujets.all()) == set(aide.sujets.all())
    assert new_aide.couverture_geographique != aide.couverture_geographique


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
