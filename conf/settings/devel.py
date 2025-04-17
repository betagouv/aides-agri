import os

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

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "sandbox.smtp.mailtrap.io"
EMAIL_PORT = 465
EMAIL_HOST_USER = os.getenv("MAILTRAP_USER")
EMAIL_HOST_PASSWORD = os.getenv("MAILTRAP_PASSWORD")
EMAIL_USE_TLS = True
