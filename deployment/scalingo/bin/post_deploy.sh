#!/usr/bin/env bash

python manage.py migrate
python manage.py aides_organismes_logos_files_from_db
