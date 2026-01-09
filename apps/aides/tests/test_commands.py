import pytest
from django.core.management import call_command

from aides.models import Aide


@pytest.mark.parametrize(
    "aide_published__url_descriptif",
    ["https://aides-agri.beta.gouv.fr/thisurlwillnevermatch"],
)
@pytest.mark.django_db
def test_unpublish_aides_having_invalid_link(aide_published):
    # GIVEN
    assert Aide.objects.published().count() == 1

    # WHEN
    call_command("aides_unpublish_aides_having_invalid_link")

    # THEN
    assert not Aide.objects.published().exists()
