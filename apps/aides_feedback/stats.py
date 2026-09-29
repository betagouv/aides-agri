from datetime import date, timedelta

from django.utils.numberformat import format

from .models import FeedbackOnAides


def _get_avg_and_count(qs):
    if qs:
        avg = sum(list(qs.values_list("usefulness", flat=True))) * 5 / (len(qs) * 100)
        return f"{format(avg, ',', decimal_pos=2)} / 5, avec {len(qs)} notes"
    else:
        return "Pas de notes"


def get_feedback_on_aides_stats():
    today = date.today()
    this_month = today.replace(day=1)
    last_month = (this_month - timedelta(days=20)).replace(day=1)
    next_month = (this_month + timedelta(days=40)).replace(day=1)

    base_qs = FeedbackOnAides.objects.filter(is_spam=False)

    # Notes sur la page de résultats
    qs_results = base_qs.filter(aide__isnull=True)
    qs_results_last_month = qs_results.filter(
        sent_at__date__range=[last_month, this_month]
    )
    qs_results_this_month = qs_results.filter(
        sent_at__date__range=[this_month, next_month]
    )

    # Notes sur les aides
    qs_aides = base_qs.filter(aide__isnull=False)
    qs_aides_last_month = qs_aides.filter(sent_at__date__range=[last_month, this_month])
    qs_aides_this_month = qs_aides.filter(sent_at__date__range=[this_month, next_month])

    return {
        "feedback_on_results_last_month": _get_avg_and_count(qs_results_last_month),
        "feedback_on_results_this_month": _get_avg_and_count(qs_results_this_month),
        "feedback_on_aides_last_month": _get_avg_and_count(qs_aides_last_month),
        "feedback_on_aides_this_month": _get_avg_and_count(qs_aides_this_month),
    }


__all__ = ["get_feedback_on_aides_stats"]
