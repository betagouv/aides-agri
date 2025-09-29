from datetime import date

import pytest
from django.core.management import call_command

from aides.models import Aide


@pytest.mark.django_db
@pytest.mark.parametrize("aide__status", [Aide.Status.VALIDATED])
@pytest.mark.parametrize("aide__date_target_publication", [date.today()])
def test_publish_pending_aides(aide):
    # GIVEN
    assert not Aide.objects.published().exists()
    assert Aide.objects.pending().exists()

    # WHEN
    call_command("aides_publish_pending_aides")

    # THEN
    assert Aide.objects.published().exists()
    assert not Aide.objects.pending().exists()


@pytest.mark.parametrize("aide__status", [Aide.Status.PUBLISHED])
@pytest.mark.parametrize(
    "aide__url_descriptif", ["https://aides-agri.beta.gouv.fr/thisurlwillnevermatch"]
)
@pytest.mark.django_db
def test_unpublish_aides_having_invalid_link(aide):
    # GIVEN
    assert Aide.objects.published().count() == 1

    # WHEN
    call_command("aides_unpublish_aides_having_invalid_link")

    # THEN
    assert not Aide.objects.published().exists()
