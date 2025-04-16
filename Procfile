web: gunicorn conf.wsgi --log-file -
worker: python manage.py procrastinate worker --listen-notify --shutdown-graceful-timeout=5
postdeploy: bash deployment/scalingo/bin/post_deploy.sh
