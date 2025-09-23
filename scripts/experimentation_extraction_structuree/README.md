# Structured Extraction Sandbox

This folder contains a Streamlit demo app to:

- extract text from PDFs using multiple parsers
- generate structured outputs (validated with Pydantic) via a unified Engine using either the Albert API or a local Ollama model

## Prerequisites

- Python 3.10+
- Project dependencies installed (see below)
- For local model: Ollama installed with a pulled model (e.g. `gemma3:4b`)
- For Albert API: a valid API key in environment variable `ALBERT_API_KEY`

## Install dependencies

From the repository root:

Option A – uv (only necessary dependencies)

```bash
uv sync --group extraction
```

Option B – uv (all dependencies)

```bash
uv sync --all-groups
```

Note: The Streamlit app imports modules from `data_extraction/` in this folder. Running Streamlit from this folder ensures imports resolve correctly.

## Configure the Albert API (.env)

Create a `.env` file (at the repo root or export in your shell) with:

```dotenv
ALBERT_API_KEY=YOUR_API_KEY_HERE
```

The Albert provider loads the key from the environment automatically. No UI input is required.

If you don't have an API key, you can get one [here](https://albert.sites.beta.gouv.fr/) _(you must be a government employee)_ :

1. Click on **"Try our API"**
2. Fill out the form with your professional information.
3. You’ll receive an email at the address you provided. Follow the instructions in the email to obtain your API key.

## Run the Streamlit app

From root folder :

```bash
cd scripts/experimentation_extraction_structuree
uv run streamlit run streamlit_app.py
```

The UI lets you:

- pick a PDF automatically discovered from `sample_pdf/`
- choose a pdf parser
- choose a model/provider for structured extraction (Albert or Ollama)

## Engine defaults and behavior

- Provider auto-detected from `model_name`:
  - contains `albert` => Albert
  - otherwise => Ollama
- Default `model_name`: `albert-small`
- Available parsers: `pdfminer` (default), `pypdf`, `docling`, `langchain`

## Programmatic usage (example)

```python
from data_extraction.core.engine import Engine
from data_extraction.schemas.pydantic_schema import DispositifAide

engine = Engine(
    schema=DispositifAide,
    parser="pdfminer",           # or "pypdf", "docling", "langchain"
    model_name="albert-small",   # or an Ollama model, e.g. "gemma3:4b"
    **api_specific_kwargs
)

result = engine.run("sample_pdf/example.pdf")
print(result.get_json())
```

## Troubleshooting

- Albert: ensure `ALBERT_API_KEY` is set in your environment before launching Streamlit.
- Ollama: verify Ollama is installed and the chosen model is available (`ollama pull gemma3:4b`).
- Python imports: start Streamlit from this folder so `data_extraction/...` imports succeed.
- PDFs: place files in `sample_pdf/` to have them listed in the UI.
