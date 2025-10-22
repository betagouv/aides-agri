# Plateforme aides-agri

Based on Django and [the French Administration Design System](https://www.systeme-de-design.gouv.fr/).

## Pre-requisites

You need those pretty standard tools on your system:
- [uv](https://docs.astral.sh/uv/) as the Python venv/dependencies manager
- [just](https://just.systems/) as the command runner
- Docker for a simple PostgreSQL

## Useful recipes

### Django commands with native virtualenv and `.env`

The following will run the given Django `COMMAND` after loading the correct Python version, the correct virtualenv and your `.env` file:

```shell
just manage COMMAND
```

Shorthands exist for:
- `just runserver`
- `just shell`
- `just makemigrations`
- `just migrate`

## Acknowledgements

This project is tested with BrowserStack.

## Observability (Langfuse)

The agricultural monitoring workflows use [Langfuse](https://langfuse.com) for tracing instead of LangSmith.

Set the following environment variables in your `.env` file to enable tracing:

```env
LANGFUSE_PUBLIC_KEY=your_public_key
LANGFUSE_SECRET_KEY=your_secret_key
LANGFUSE_HOST=https://cloud.langfuse.com  # Or your self-hosted endpoint
```

Initialization is automatic; if keys are present traces and spans will be emitted. No action required in application code beyond existing decorators.

Backward compatibility: any legacy call to `setup_langsmith()` now maps to `setup_langfuse()`.
