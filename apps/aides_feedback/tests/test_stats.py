import pytest

from aides_feedback.models import FeedbackOnAides
from aides_feedback.stats import get_feedback_on_aides_stats


@pytest.mark.django_db
def test_get_stats(feedback_on_aide):
    # GIVEN 1 FeedbackOnAide
    assert FeedbackOnAides.objects.count() == 1

    # WHEN calling stats
    stats = get_feedback_on_aides_stats()

    # THEN
    assert stats["feedback_on_aides_this_month"] == "5,00 / 5, avec 1 notes"
