#!/usr/bin/env bash

set -e

python manage.py aides_unpublish_aides_having_invalid_link
python manage.py aides_feedback_reporting
python manage.py aides_send_daily_admin_notifications
python manage.py aides_alert_organismes_without_logo
