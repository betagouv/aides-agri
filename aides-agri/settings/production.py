from .base import *

DEBUG = False

# Static files
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]


# Database - Scalingo injecte automatiquement DATABASE_URL
import dj_database_url
DATABASES['default'] = dj_database_url.config()

# Sécurité
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# Secret Key - à définir dans les variables d'environnement Scalingo
SECRET_KEY = env('SECRET_KEY')