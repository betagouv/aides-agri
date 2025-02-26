from .default import *  # noqa

INTERNAL_IPS = [
    "127.0.0.1",
]

LOGGING = {}

STORAGES["staticfiles"]["BACKEND"] = (  # noqa: F405
    "django.contrib.staticfiles.storage.StaticFilesStorage"
)

# Apps specific
AGRI_PATH_DATA = "tests/data"
