#!/usr/bin/env bash

set -e

# extract illustrations from DB and store them on local storage
if [[ -z "$TMP_DISABLE_PUBLISH_ILLUSTRATIONS" ]]; then
  python manage.py aides_publish_illustrations_from_db
fi

# Symlink the correct robots.txt
if [[ "$ENVIRONMENT" == "prod" ]]; then
  robots="robots-prod.txt"
else
  robots="robots-non-prod.txt"
fi
cd webroot && ln -s "$robots" robots.txt && cd - || exit

# Start Gunicorn
gunicorn conf.wsgi --max-requests 200 --max-requests-jitter 20 --log-file -