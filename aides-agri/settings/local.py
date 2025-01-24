from .base import *

DEBUG = True
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

import environ
env = environ.Env()
environ.Env.read_env()

if DEBUG:
    INSTALLED_APPS += ['debug_toolbar', 'django_dump_die']
    MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware', 'django_dump_die.middleware.DumpAndDieMiddleware']
    INTERNAL_IPS = ['127.0.0.1']