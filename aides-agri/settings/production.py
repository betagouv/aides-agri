from .base import *

DEBUG = False
ALLOWED_HOSTS = ['.osc-fr1.scalingo.io']

# Static files
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Database - Scalingo injecte automatiquement DATABASE_URL
import dj_database_url
DATABASES['default'] = dj_database_url.config()

# Sécurité
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# Secret Key - à définir dans les variables d'environnement Scalingo
SECRET_KEY = env('SECRET_KEY')