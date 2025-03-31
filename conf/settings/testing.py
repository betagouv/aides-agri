from .default import *  # noqa

INTERNAL_IPS = [
    "127.0.0.1",
]

SECRET_KEY = "testing"
LOGGING = {}

STORAGES["staticfiles"]["BACKEND"] = (  # noqa: F405
    "django.contrib.staticfiles.storage.StaticFilesStorage"
)

# Apps specific
AGRI_PATH_DATA = "tests/data"

GRIST_PYGRISTER_CONFIG = {}
