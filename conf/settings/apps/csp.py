from csp.constants import SELF, NONCE


CONTENT_SECURITY_POLICY = {
    "DIRECTIVES": {
        "default-src": [SELF],
        "img-src": [SELF, "data:"],  # Because of dsfr
        "script-src": [
            SELF,
            "stats.beta.gouv.fr",  # Matomo
            NONCE,  # page-specific entry-points
        ],
        "connect-src": [
            SELF,
            "stats.beta.gouv.fr",  # Matomo
            "sentry.incubateur.net",  # Sentry
        ],
        "frame-ancestors": [SELF],
        "form-action": [SELF],
    },
}
