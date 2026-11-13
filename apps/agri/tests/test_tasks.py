import datetime

import pytest
from pytest_factoryboy import LazyFixture

from agri.models import Alerte

from agri import tasks


@pytest.mark.django_db
def test_maybe_send_daily_alerte_positive(
    aide_published_nationale_type_1_sujet_non_urgence_no_filiere_ended, alerte, mocker
):
    aide = aide_published_nationale_type_1_sujet_non_urgence_no_filiere_ended
    # GIVEN a freshly published Aide and a large-scope Alerte
    assert aide.is_published
    assert aide.first_published_at.date() == datetime.date.today()
    assert Alerte.objects.count() == 1
    alerte = Alerte.objects.first()
    assert alerte.departement is None
    assert not alerte.filieres.exists()
    assert not alerte.sujets.exists()
    assert not alerte.themes.exists()

    # WHEN calling maybe_send_daily_alerte
    spy = mocker.spy(tasks, "send_mail")
    tasks.maybe_send_daily_alerte.enqueue(alerte.pk, 86400, "http://localhost")

    # THEN
    assert spy.call_count == 1


@pytest.mark.django_db
@pytest.mark.parametrize(
    "alerte__departement", [LazyFixture("zone_geographique_departement_13")]
)
def test_maybe_send_daily_alerte_negative(
    aide_published_region_na_type_2_sujet_non_urgence_no_filiere,
    zone_geographique_departement_13,
    alerte,
    mocker,
):
    aide = aide_published_region_na_type_2_sujet_non_urgence_no_filiere
    # GIVEN a freshly published Aide and a departement-scope Alerte
    assert aide.is_published
    assert aide.first_published_at.date() == datetime.date.today()
    assert Alerte.objects.count() == 1
    alerte = Alerte.objects.first()
    assert alerte.departement == zone_geographique_departement_13
    assert not alerte.filieres.exists()
    assert not alerte.sujets.exists()
    assert not alerte.themes.exists()

    # WHEN calling maybe_send_daily_alerte
    spy = mocker.spy(tasks, "send_mail")
    tasks.maybe_send_daily_alerte.enqueue(alerte.pk, 86400, "http://localhost")

    # THEN
    assert spy.call_count == 0
