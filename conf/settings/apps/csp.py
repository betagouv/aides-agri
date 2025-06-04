from csp.constants import SELF, NONCE


CONTENT_SECURITY_POLICY = {
    "DIRECTIVES": {
        "default-src": [SELF, NONCE],
        "img-src": [SELF, "data:"],
        "frame-ancestors": [SELF],
        "form-action": [SELF],
    },
}
