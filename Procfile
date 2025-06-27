web: bash deployment/scalingo/bin/start-web.sh
worker: python manage.py db_worker
postdeploy: python manage.py migrate
