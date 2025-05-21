from django.conf import settings


def ui_tools_tokens(request):
    return {
        "UI_ENVIRONMENT": settings.ENVIRONMENT,
        "UI_MATOMO_SITE_ID": settings.MATOMO_SITE_ID,
        "UI_SENTRY_PUBLIC_KEY": settings.SENTRY_UI_PUBLIC_KEY,
        "UI_SENTRY_PROJECT_ID": settings.SENTRY_UI_PROJECT_ID,
    }
