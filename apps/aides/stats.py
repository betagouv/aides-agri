from .models import Aide


def get_published_aides_stats():
    return {
        "aides_published": Aide.objects.official_published_count(),
        "aides_published_validated": Aide.objects.official_published_validated_count(),
    }
