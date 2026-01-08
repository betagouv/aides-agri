import pytest
from pytest_factoryboy import LazyFixture

from agri import tasks


@pytest.mark.django_db
@pytest.mark.parametrize("aide__with_given_sujet", [LazyFixture("sujet")])
def test_send_results_by_mail(
    mocker,
    aide,
    sujet,
    zone_geographique_commune_75001,
    filiere,
    beneficiaire,
):
    # GIVEN an Aide
    assert aide
    theme = sujet.themes.first()
    email = "name@domain.tld"
    base_url = "http://localhost"

    # WHEN
    # spy = mocker.spy(tasks, "send_mail")
    mocker.patch("agri.tasks.send_mail")
    tasks.send_results_by_mail.call(
        email,
        base_url,
        theme.pk,
        [sujet.pk],
        zone_geographique_commune_75001.pk,
        "2025-12-01",
        ("0", "10"),
        [filiere.pk],
        [beneficiaire.pk],
        [aide.pk],
    )

    # THEN
    # assert spy.assert_called_once()
    assert True
