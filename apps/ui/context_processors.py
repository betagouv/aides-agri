from django.conf import settings


def ui_tools_tokens(request):
    return {
        "MATOMO_SITE_ID": settings.MATOMO_SITE_ID,
        "SENTRY_DSN": settings.SENTRY_DSN_UI,
    }
