#!/usr/bin/env bash

# extract Organismes logos from DB and store them on local storage
python manage.py aides_organismes_logos_files_from_db

# Symlink the correct robots.txt
if [[ "$ENVIRONMENT" == "prod" ]]; then
  robots="robots-prod.txt"
else
  robots="robots-non-prod.txt"
fi
cd webroot && ln -s "$robots" robots.txt && cd - || exit

# Start Gunicorn
gunicorn conf.wsgi --log-file -