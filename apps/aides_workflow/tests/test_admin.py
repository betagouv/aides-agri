import pytest
from django.urls import reverse

from aides_workflow.models import Anomaly


@pytest.mark.django_db
class TestAnomalyAdmin:
    def test_unpublish_aide(self, admin_client, anomaly):
        # GIVEN an Anomaly on a published Aide
        assert Anomaly.objects.count() == 1
        aide = anomaly.aide
        assert anomaly.is_open
        assert aide.is_published

        # WHEN POSTing to unpublish the Aide
        res = admin_client.post(
            reverse("admin:aides_workflow_anomaly_unpublish_aide", args=[anomaly.pk])
        )

        # THEN the Aide has been unpublished, and the Anomaly is closed
        assert res.status_code == 302
        aide.refresh_from_db()
        assert not aide.is_published
        anomaly.refresh_from_db()
        assert not anomaly.is_open

    def test_change_url_in_aide(self, admin_client, anomaly):
        # GIVEN an Anomaly on a published Aide
        assert Anomaly.objects.count() == 1
        aide = anomaly.aide
        assert anomaly.is_open
        assert aide.is_published

        # WHEN POSTing to set a new URL to the Aide
        res = admin_client.post(
            reverse(
                "admin:aides_workflow_anomaly_change_url_in_aide", args=[anomaly.pk]
            ),
            data={"new_url": "https://url-correcte.gouv.fr"},
        )

        # THEN the Aide is still published, with a new url_descriptif,
        # and the Anomaly is closed
        assert res.status_code == 302
        aide.refresh_from_db()
        assert aide.is_published
        assert aide.url_descriptif == "https://url-correcte.gouv.fr"
        anomaly.refresh_from_db()
        assert not anomaly.is_open

    def test_mark_known(self, admin_client, anomaly):
        # GIVEN an Anomaly on a published Aide
        assert Anomaly.objects.count() == 1
        aide = anomaly.aide
        assert anomaly.is_open
        assert aide.is_published

        # WHEN POSTing to declare a false positive
        res = admin_client.post(
            reverse("admin:aides_workflow_anomaly_mark_known", args=[anomaly.pk])
        )

        # THEN the Aide is still published, and the Anomaly is still opened by shut
        assert res.status_code == 302
        aide.refresh_from_db()
        assert aide.is_published
        anomaly.refresh_from_db()
        assert anomaly.is_open
        assert anomaly.status == Anomaly.Status.KNOWN
