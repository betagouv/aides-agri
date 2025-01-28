from .base import *

DEBUG = True

INSTALLED_APPS += [
    'debug_toolbar',
    'django_dump_die'
]

MIDDLEWARE += [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
    'django_dump_die.middleware.DumpAndDieMiddleware',
]

INTERNAL_IPS = ['127.0.0.1']
