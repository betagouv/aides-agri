#!/usr/bin/env bash

python manage.py aides_unpublish_aides_having_invalid_link
python manage.py aides_feedback_reporting
python manage.py aides_send_daily_admin_notifications
python manage.py aides_alert_organismes_without_logo
python manage.py agri_alarm_on_too_many_alertes
bash scripts/jorf.sh && python manage.py aides_send_jorf_monitoring
