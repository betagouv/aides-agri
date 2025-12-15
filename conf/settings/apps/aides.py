import os

AIDES_MANAGERS = os.getenv("AIDES_MANAGERS", "aides-agri@beta.gouv.fr").split(",")

AIDES_AIDES_TERRITOIRES_API_KEY = os.getenv("AIDES_AIDES_TERRITOIRES_API_KEY", "")
