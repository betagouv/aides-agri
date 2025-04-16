import os


ANYMAIL = {
    "BREVO_API_KEY": os.getenv("BREVO_API_KEY", ""),
}
EMAIL_BACKEND = "anymail.backends.brevo.EmailBackend"
