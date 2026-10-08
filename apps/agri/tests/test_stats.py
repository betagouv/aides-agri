import pytest

from agri.models import Alerte
from agri.stats import get_alertes_stats


@pytest.mark.django_db
@pytest.mark.parametrize(
    "alerte__email,alerte_2__email", [["example1@domain.com", "example2@domain.com"]]
)
def test_get_stats(alerte, alerte_2):
    # GIVEN 2 alertes from 2 distinct users
    assert Alerte.objects.count() == 2
    assert Alerte.objects.first().email != Alerte.objects.last().email

    # WHEN calling stats
    stats = get_alertes_stats()

    # THEN
    assert stats["alertes"] == 2
    assert stats["alertes_distinct_users"] == 2


@pytest.mark.django_db
@pytest.mark.parametrize(
    "alerte__email,alerte_2__email", [["example@domain.com", "example@domain.com"]]
)
def test_get_stats_same_email(alerte, alerte_2):
    # GIVEN 2 alertes from 2 distinct users
    assert Alerte.objects.count() == 2
    assert Alerte.objects.first().email == Alerte.objects.last().email

    # WHEN calling stats
    stats = get_alertes_stats()

    # THEN
    assert stats["alertes"] == 2
    assert stats["alertes_distinct_users"] == 1
