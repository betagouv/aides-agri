set dotenv-load

default:
    just --list

# Install Python dependencies
install-python:
    uv sync

# Install Javascript dependencies
install-js:
    npm install
    # For JS deps that distribute a bundle, just vendor it
    while read jsfile; do cp "node_modules/$jsfile" "static/vendor/" && echo "Vendored $jsfile"; done <vendor.txt
    # For JS deps that don't, build'em then vendor the bundle
    echo 'export * as Sentry from "@sentry/browser"' | ./node_modules/.bin/esbuild --bundle --minify --format=esm --outfile=static/vendor/sentry.js

# Install Talisman as pre-push hook
install-talisman:
    curl -s 'https://thoughtworks.github.io/talisman/install.sh' | bash

# Install deployment tools for Scalingo
@install-deployment-scalingo:
    echo "Ensure Scalingo CLI is installed"
    scalingo --version || (curl -s -O https://cli-dl.scalingo.com/install && bash install)

# Install everything needed
install: install-python install-js install-talisman install-deployment-scalingo

# Run any Django command
manage command:
    uv run --no-sync manage.py {{command}}

# Start Django server for development
runserver: (manage "runserver")

# Apply Django migrations
migrate: (manage "migrate")

# Launch Django shell
shell: (manage "shell")

# Generate Django migrations
makemigrations: (manage "makemigrations")
    ruff format apps/*/migrations/*.py

# Dump fixtures for end-to-end testing
dump-fixtures:
    uv run --no-sync manage.py dumpdata --natural-primary --natural-foreign aides.Theme aides.Sujet --output=cypress/e2e/fixtures/aides_01_sujets.json
    uv run --no-sync manage.py dumpdata --natural-primary --natural-foreign aides.Filiere aides.SousFiliere aides.Production aides.GroupementProducteurs --output=cypress/e2e/fixtures/aides_02_filieres.json
    uv run --no-sync manage.py dumpdata --natural-primary --natural-foreign aides.ZoneGeographique --pks=13,26,265,5754 --output=cypress/e2e/fixtures/aides_03_zones_geographiques.json

# Run Django tests
test:
    DJANGO_SETTINGS_MODULE=conf.settings.testing uv run pytest --cov

# Start Django for end-to-end tests
runserver-for-e2e-tests:
    uv run --no-sync manage.py collectstatic --noinput --settings conf.settings.testing
    uv run --no-sync manage.py runserver --noreload --insecure --settings conf.settings.testing

# Run Lighthouse end-to-end tests
lighthouse:
    npx lhci autorun

# Run Cypress end-to-end tests
cypress:
    npx cypress run

# Scalingo: SSH
scalingo-ssh environment:
    scalingo run --app aides-agri-{{environment}} bash

# Scalingo: run Django command
scalingo-django-command environment command:
    scalingo run --app aides-agri-{{environment}} python manage.py {{command}}

# Scalingo: login to Django shell
scalingo-django-shell environment: (scalingo-django-command environment "shell")
