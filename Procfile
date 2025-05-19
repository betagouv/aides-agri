web: python manage.py aides_organismes_logos_files_from_db && gunicorn conf.wsgi --log-file -
worker: python manage.py db_worker
postdeploy: bash deployment/scalingo/bin/post_deploy.sh
