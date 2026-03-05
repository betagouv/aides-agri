#!/usr/bin/env bash

# extract illustrations from DB and store them on local storage
python manage.py aides_publish_illustrations_from_db

# Symlink the correct robots.txt
if [[ "$ENVIRONMENT" == "prod" ]]; then
  robots="robots-prod.txt"
else
  robots="robots-non-prod.txt"
fi
cd webroot && ln -s "$robots" robots.txt && cd - || exit

# Start Gunicorn
gunicorn conf.wsgi --log-file -