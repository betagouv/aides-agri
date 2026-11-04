from datetime import datetime, timedelta

import pytest
from django.core.management import call_command
from django.test.utils import override_settings

from agri.management.commands import agri_alarm_on_too_many_alertes
from agri.models import Alerte


@pytest.mark.django_db
@override_settings(AGRI_HIGH_DAILY_ALERTES_COUNT=1)
def test_agri_alarm_on_too_many_alertes(alerte, alerte_2, mocker):
    # GIVEN 2 Alerte objects
    # AND both of them are less than a day old
    assert Alerte.objects.count() == 2
    assert (
        Alerte.objects.filter(
            date_creation__gte=datetime.now() - timedelta(days=1)
        ).count()
        == 2
    )

    # WHEN
    spy = mocker.spy(agri_alarm_on_too_many_alertes, "send_mail")
    call_command("agri_alarm_on_too_many_alertes")

    # THEN
    assert spy.call_count == 1


@pytest.mark.django_db
@override_settings(AGRI_HIGH_DAILY_ALERTES_COUNT=1)
@pytest.mark.parametrize("alerte_2__override_date_creation", ["2026-01-01T00:00:00Z"])
def test_agri_alarm_on_too_many_alertes_negative(alerte, alerte_2, mocker):
    # GIVEN 2 Alerte objects
    # AND one of them if more than a day old
    assert Alerte.objects.count() == 2
    assert (
        Alerte.objects.filter(
            date_creation__gte=datetime.now() - timedelta(days=1)
        ).count()
        == 1
    )

    # WHEN
    spy = mocker.spy(agri_alarm_on_too_many_alertes, "send_mail")
    call_command("agri_alarm_on_too_many_alertes")

    # THEN
    assert spy.call_count == 0
