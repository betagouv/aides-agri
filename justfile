set dotenv-load

default:
    just --list

# Install Python dependencies
install-python:
    uv sync

# Install Javascript dependencies
install-js:
    npm install

# Install both Python dependencies and Javascript dependencies
install: install-python install-js

# Run a Django command
manage command:
    uv run --no-sync manage.py {{command}}

# Run the Django webserver
runserver: (manage "runserver")

# Generate Django migrations
makemigrations: (manage "makemigrations")

# Run Django migrations
migrate: (manage "migrate")

# Open Django shell
shell: (manage "shell")
