from django.contrib.auth import get_user_model

from .models import Alerte


def get_alertes_stats():
    qs_not_from_team = Alerte.objects.exclude(
        email__in=get_user_model()
        .objects.filter(is_staff=True)
        .values_list("email", flat=True)
    )
    return {
        "alertes": qs_not_from_team.count(),
        "alertes_distinct_users": qs_not_from_team.distinct("email").count(),
    }


__all__ = ["get_alertes_stats"]
