from .default import *  # noqa


DEBUG = True

INSTALLED_APPS.extend(  # noqa: F405
    [
        "django_browser_reload",
        "debug_toolbar",
    ]
)

MIDDLEWARE.extend(  # noqa: F405
    [
        "debug_toolbar.middleware.DebugToolbarMiddleware",
        "django_browser_reload.middleware.BrowserReloadMiddleware",
    ]
)

INTERNAL_IPS = [
    "127.0.0.1",
]

LOGGING = {}

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
