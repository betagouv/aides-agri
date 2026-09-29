import pytest

from aides.models import Aide
from aides.stats import get_published_aides_stats


@pytest.mark.django_db
def test_get_stats(aide_published, aide_published_minimal):
    # GIVEN 2 Aides
    assert Aide.objects.count() == 2

    # WHEN calling stats
    stats = get_published_aides_stats()

    # THEN
    assert stats["aides_published"] == 2
    assert stats["aides_published_validated"] == 1
