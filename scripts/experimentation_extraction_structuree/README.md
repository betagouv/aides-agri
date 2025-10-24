# 🧪 Structured & Classified Extraction Sandbox

This folder is an experimentation sandbox combining:

1. Multi-parser PDF / HTML text extraction (local path or URL)
2. Chunking & classification of hierarchical PDF sections
3. Structured extraction to validated Pydantic schemas via:
   - Albert API (remote LLM with JSON Schema format)
   - Ollama local models (structured decoding using Pydantic JSON schema)
4. Benchmark scripts (timing + field-level extraction comparison)
5. Streamlit demo apps for interactive exploration:
   - `classification_app.py` (chunk classification + structured aide fields)
   - `extraction_app.py` (resource pool + end-to-end extraction)

---
## 🏗 Architecture Overview

```
data_extraction/
  core/                # Abstract ports (parser, chunker, extractor, output)
  adapters/            # Concrete implementations (PDF parsers, LLM providers, chunkers)
  prompts/             # Prompt builders (schema → instructions, extraction prompt)
  schemas/             # Pydantic models (v0, v1, v2 evolution, entities & enums)
  services/            # Orchestration of components
  benchmarks/          # Generated results & comparison artifacts
```

### Core Layer (ports)
| Component | Purpose |
|-----------|---------|
| `DocumentParser` | Unified interface for raw text extraction from a file/URL. |
| `FileChunker` | (Extension point) Breaks files into logical sections. |
| `StructuredExtractor` | Interface for LLM-backed structured output generation. |
| `StructuredOutput` | Normalized result wrapper with `get_json()` + carbon metrics. |
| `ChunkClassifier` | Interface to assign semantic categories to chunks. |

### Adapters
| Adapter | Key libs | Description |
|---------|----------|-------------|
| `PDFMinerExtractor`, `PyPDFExtractor`, `DoclingExtractor`, `LangChainExtractor` | pdfminer, pypdf, docling, langchain-community | Multiple strategies to parse PDF content. |
| `TrafilaturaExtractor` | trafilatura | HTML → simplified markdown/text. |
| `AlbertStructuredExtractor` | requests, python-dotenv | Calls Albert API with JSON schema response enforcement. |
| `OllamaStructuredExtractor` | ollama, codecarbon | Local model generation + emissions tracking. |
| `AlbertChunkClassifier` | langfuse, Albert LLM | Classifies hierarchical chunks using a managed prompt. |

### Services
| Service | Description |
|---------|-------------|
| `ParserAide` | Final solution of this experimentation. Composite pipeline combining chunking, chunk classification (AlbertChunkClassifier), structured extraction and aggregation helpers for aide documents. |
| `ParserEngine` | Selects proper parser per resource (PDF vs HTML). Aggregates pool into a single content string. |
| `Engine` | High-level orchestration: parse resource(s) → build system/user prompt → generate structured output. Provider auto-detected from `model_name`. |

### Schemas
Versioned Pydantic models (`v0`, `v1`, `v2`) progressively refine structure: dates, geographic eligibility, beneficiaries, categories, etc. Utilities in `schema_utils.py` convert schemas to JSON Schema for model constraints.

### Prompts
`structured_extraction_prompt.build_structured_extraction_prompt(schema)` injects JSON field skeleton and strict behavioral instructions. Classification prompts live in `classification_prompts.py`.

---
## 📦 Dependencies (extraction group)
Only the required libraries for this folder are declared in `pyproject.toml` under the `extraction` group (parsers, LLM adapters, Streamlit UI, notebooks & carbon tracking).

Install (recommended minimal for this sandbox):
```bash
uv sync --group extraction
```

For both experimentations :
```bash
uv sync --group extraction --group veille
```

Or all groups:
```bash
uv sync --all-groups
```

---
## 🔐 Albert API Setup

Create or update `.env` (repo root or exported in shell):
```dotenv
ALBERT_API_KEY=YOUR_API_KEY_HERE
```
No further configuration needed; the extractor loads it automatically.

Obtain a key (government personnel only):
1. Visit https://albert.sites.beta.gouv.fr/
2. Click “Try our API”
3. Submit the request form
4. Use the received key in your environment

---
## � Langfuse Observability (Optional)

Chunk classification and advanced prompt management integrate with [Langfuse](https://langfuse.com) when keys are present. The sandbox works **without** these keys; classification will fall back to static, local prompt content (no remote prompt versioning and no tracing).

Add the following variables to your `.env` (or skip entirely if you don't need tracing analytics):

```dotenv
LANGFUSE_PUBLIC_KEY=your_public_key
LANGFUSE_SECRET_KEY=your_secret_key
# LANGFUSE_HOST=https://cloud.langfuse.com   # Override if self-hosted
```

Behavior summary:
| Scenario | Result |
|----------|--------|
| Keys present | Remote prompt fetched, traces/spans emitted to Langfuse. |
| Keys absent | Fallback to static classification prompt; no errors, no traces. |
| Invalid host | Requests fail silently (recommended: verify `LANGFUSE_HOST`). |

Security note: never commit real keys—use `.env.example` as a reference.

---
## �🚀 Streamlit Apps

Run classification demo:
```bash
cd scripts/experimentation_extraction_structuree
uv run streamlit run classification_app.py
```

Run structured extraction demo:
```bash
cd scripts/experimentation_extraction_structuree
uv run streamlit run extraction_app.py
```

### Classification App Highlights
1. Upload PDF → hierarchical chunking
2. Each chunk classified (Albert LLM + Langfuse prompt)
3. Structured aide fields extracted (dates, geography, etc.)
4. Category grouping & JSON view

### Extraction App Highlights
1. Build a “resource pool” from local sample PDFs or URLs
2. Select provider (`ollama` or `albert`) & model name
3. Run `Engine` → unified structured JSON + Markdown export
4. Carbon emission metric returned for Ollama generations

---
## 🧩 Engine Usage Examples (deprecated)

### 1. Single PDF (auto provider detection)
```python
from data_extraction.services.engine import Engine
from data_extraction.schemas.v2.schema_dispositif_aide import DispositifAide

engine = Engine(schema=DispositifAide, model_name="albert-small")
response = engine.run(resource_pool=["sample_pdf/example.pdf"])  # list of paths
print(response.get_json())
```

### 2. Local Ollama Model
```python
engine = Engine(schema=DispositifAide, model_name="gemma3:4b")  # provider auto-detected
response = engine.run(["sample_pdf/example.pdf"], temperature=0.1)
print(response.carbon)          # kgCO2eq estimate
print(response.get_json())
```

### 3. Mixed Resource Pool (PDF + HTML URL)
```python
pool = [
  "sample_pdf/example.pdf",
  "https://example.org/infos-aide.html"
]
engine = Engine(schema=DispositifAide, model_name="albert-large")
data = engine.run(pool).get_json()
```

### 4. Custom Generation Options (Ollama)
```python
engine = Engine(schema=DispositifAide, model_name="gemma3:4b")
out = engine.run(["sample_pdf/example.pdf"], temperature=0.3, num_ctx=200000, num_predict=5000)
print(out.get_json())
```

---
## 🏷 Chunk Classification
```python
from data_extraction.adapters.chunk_classifier import AlbertChunkClassifier
from data_extraction.services.parser_aide import ParserAide

classifier = AlbertChunkClassifier(model_name="albert-large")
parser = ParserAide(chunk_classifier=classifier, model_name="albert-large")

chunks = parser.chunker.chunk_file("sample_pdf/example.pdf")
classified = classifier.classify_chunks(chunks, window_size=2)
grouped = classifier.group_by_category(classified)
print(grouped.keys())
```

---
## ❗ Troubleshooting
| Issue | Fix |
|-------|-----|
| `ALBERT_API_KEY` missing | Add to `.env` or export before running. |
| Ollama model not found | `ollama pull gemma3:4b` (or chosen model). |
| Import errors in apps | Run Streamlit from this folder root. |
| Empty extraction JSON | Verify the PDF has selectable text (try `pdfminer` parser). |
| Slow local generation | Reduce `num_ctx` / `num_predict` or use Albert. |

---
## © Licensing
This sandbox lives inside the main project repository and inherits its license. See the root `LICENSE` file.

---
Happy experimenting 🌾
