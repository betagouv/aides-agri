set dotenv-load

default:
    just --list

# Install Python dependencies
install-python:
    uv sync

# Install Javascript dependencies
install-js:
    npm install
    while read jsfile; do cp "node_modules/$jsfile" "static/vendor/"; echo "Vendorized $jsfile"; done <vendorize.txt

# Install Talisman as pre-push hook
install-talisman:
    curl -s 'https://thoughtworks.github.io/talisman/install.sh' | bash

# Install deployment tools for Scalingo
@install-deployment-scalingo:
    echo "Setup Git hook for generating requirements.txt..."
    cp deployment/scalingo/git-hooks/* .git/hooks/
    echo "Ensure Scalingo CLI is installed"
    scalingo --version || (curl -s -O https://cli-dl.scalingo.com/install && bash install)

# Install everything needed
install: install-python install-js install-talisman install-deployment-scalingo

# Django base command
manage command:
    uv run --no-sync manage.py {{command}}

# Django shorthands
runserver: (manage "runserver")
migrate: (manage "migrate")
shell: (manage "shell")
makemigrations: (manage "makemigrations")
    ruff format apps/*/migrations/*.py

# Testing
test:
    DJANGO_SETTINGS_MODULE=conf.settings.testing uv run pytest --cov

# Scalingo: SSH
scalingo-django-ssh environment:
    scalingo run --app aides-agri-{{environment}} bash

# Scalingo: run Django command
scalingo-django-command environment command:
    scalingo run --app aides-agri-{{environment}} python manage.py {{command}}

# Scalingo: login to Django shell
scalingo-django-shell environment: (scalingo-django-command environment "shell")
