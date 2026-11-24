import pytest
from django.core.management import call_command

from aides_workflow.management.commands import aides_workflow_scan_aides_for_anomalies
from aides_workflow.models import Anomaly


@pytest.mark.django_db
def test_aides_workflow_scan_aides_for_anomalies(
    aide_published, requests_mock, mocker, settings
):
    # GIVEN a published Aide and no Anomaly
    aide = aide_published
    assert aide_published.is_published
    assert not Anomaly.objects.exists()

    # WHEN calling the command that detects broken links
    spy = mocker.spy(aides_workflow_scan_aides_for_anomalies, "send_mail")
    requests_mock.get(aide.url_descriptif, status_code=404)
    call_command("aides_workflow_scan_aides_for_anomalies")

    # THEN an Anomaly has been created, and an e-mail has been sent
    assert Anomaly.objects.count() == 1
    anomaly = Anomaly.objects.first()
    assert anomaly.is_open
    assert anomaly.aide == aide
    assert anomaly.faulty_url_field == Anomaly.FaultyUrlField.URL_DESCRIPTIF
    assert anomaly.faulty_url == aide.url_descriptif
    assert anomaly.http_status_code == 404
    assert spy.call_count == 1
    assert spy.call_args[0][3] == settings.AIDES_MANAGERS

    # WHEN calling it again
    call_command("aides_workflow_scan_aides_for_anomalies")

    # THEN no new Anomaly has been created, and no e-mail has been sent
    assert Anomaly.objects.count() == 1
    anomaly = Anomaly.objects.first()
    assert anomaly.occurrences_count == 2
    assert spy.call_count == 1
