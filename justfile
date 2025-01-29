set dotenv-load

default:
    just --list

# Install Python dependencies
install-python:
    uv sync

# Install deployment tools for Scalingo
install-deployment-scalingo:
    cp deployment/scalingo/git-hooks/* .git/hooks/

# Install everything needed
install: install-python install-deployment-scalingo

# Django base command
manage command:
    uv run --no-sync manage.py {{command}}

# Django shorthands
runserver: (manage "runserver")
makemigrations: (manage "makemigrations")
migrate: (manage "migrate")
shell: (manage "shell")
