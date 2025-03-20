import os

AIDES_PYGRISTER_CONFIG = {
    "GRIST_API_KEY": os.environ.get("AIDES_GRIST_API_KEY", ""),
    "GRIST_SELF_MANAGED": "Y",
    "GRIST_SELF_MANAGED_HOME": "https://grist.numerique.gouv.fr",
    "GRIST_SELF_MANAGED_SINGLE_ORG": "N",
    "GRIST_SERVER_PROTOCOL": "https://",
    "GRIST_API_SERVER": "grist.numerique.gouv.fr",
    "GRIST_API_ROOT": "api",
    "GRIST_TEAM_SITE": "docs",
    "GRIST_WORKSPACE_ID": os.environ.get("AIDES_GRIST_WORKSPACE_ID", ""),
    "GRIST_DOC_ID": os.environ.get("AIDES_GRIST_DOC_ID", ""),
    "GRIST_RAISE_ERROR": "Y",
    "GRIST_SAFEMODE": "N",
}
