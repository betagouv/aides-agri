# 🌾 Agricultural Aides Monitoring Sandbox

This package (`experimentation_veille_aides/agricultural_monitoring`) provides an experimental framework for automated monitoring of French agricultural aide pages. It fetches target web pages, extracts visible aide/article blocks, applies LLM processing (Albert), normalizes results into Pydantic models, filters out duplicates using memory, and optionally emits rich tracing spans to Langfuse.

> Goal: Rapid iteration on hybrid extraction workflows (static parsing + vision agent + LLM summarization) to detect new or updated agricultural aids.

---
## 📁 Folder Overview
```
experimentation_veille_aides/
  pipeline.ipynb            # Scratch notebook / experiments
  memory.json               # Persistent memory of already-seen aids (titles, etc.)
  targets.json              # (Optional) list of target URLs (not enforced in code yet)
  agricultural_monitoring/
    config/                 # Settings & environment loading
    extractors/             # Raw, standard, and enhanced web content extractors
    processors/             # LLM, memory filtering, normalization, agent-based extraction
    models/                 # Pydantic schemas for structured outputs
    monitoring/             # Tracing & observability utilities (Langfuse)
    utils/                  # Prompt templates (content extraction + memory filtering)
    workflows/              # Orchestrated multi-step workflows (LLM / Hybrid / Agent)
```

---
## 🔧 Architecture Layers
| Layer | Modules | Responsibility |
|-------|---------|----------------|
| Config | `config/settings.py` | Centralized constants & environment (Albert, Langfuse, memory, workflow retry) |
| Extractors | `raw_web_extractor.py`, `web_extractor.py`, `enhanced_extractor.py` | Fetch + parse HTML, clean scripts/styles, preserve or inline links |
| Processors | `llm_processor.py`, `web_agent.py`, `memory_filter.py`, `normalizer.py` | LLM extraction, browser vision agent, duplication filtering, schema normalization |
| Models | `data_models.py` | Pydantic definitions: `AideAgricole`, responses, extraction results |
| Monitoring | `tracing.py` | Langfuse span decorator (`trace_step`) with graceful fallback |
| Utils | `prompts.py` | LangChain `ChatPromptTemplate` prompt definitions |
| Workflows | `llm_workflow.py`, `hybrid_workflow.py`, `agent_workflow.py` | End‑to‑end orchestration variants |

---
## 🧪 Workflow Variants
| Workflow | Source Strategies | Use Case |
|----------|-------------------|----------|
| `LLMWorkflow` | Enhanced HTML extractor → LLM → normalization → memory filter | Baseline, no vision agent |
| `HybridWorkflow` | Enhanced extractor + browser agent article list → LLM enrichment | Combine structural hints + text content |
| `AgentWorkflow` | Vision/browser agent only (structured output) → normalization → memory filter | When DOM parsing is unreliable |

All workflows wrap steps with `@trace_step` to emit spans if Langfuse keys are present.

---
## 🧬 Data Models (Key Fields)
| Model | Purpose | Important Fields |
|-------|---------|------------------|
| `AideAgricole` | Canonical normalized aide | `titre_aide`, `description`, `date`, `source_url` |
| `AideAgricoleLeger` | Lightweight aide (agent minimal) | `titre_aide`, `description` |
| `AidesAgricolesResponse` | List wrapper + metadata | `aides`, `metadata` |
| `WebExtractionResult` | Raw HTML extraction outcome | `content`, `links_count`, `extraction_method` |
| `LLMProcessingResult` | Output from Albert content processing | `aides_identifiees`, `resume`, `token_usage` |
| `MemoryFilteringResult` | After duplicate filtering | `filtered_count`, `new_count`, `filtering_summary` |

---
## 🌐 Web Extraction Modes
| Extractor | Method | Link Handling | Output Field `extraction_method` |
|-----------|--------|---------------|----------------------------------|
| `RawWebContentExtractor` | Basic HTML + body fallback | Raw HTML main section | `standard_with_links` |
| `WebContentExtractor` | Clean text + appended link list | Links listed separately | `standard_with_links` |
| `EnhancedWebContentExtractor` | Inline link rewriting | Links replaced inline `[LIEN: url]` | `enhanced_with_inline_links` |

Choose based on downstream prompt requirements (inline link clues vs separate list).

---
## 🤖 LLM & Agent Components
- **Albert (via `langchain_openai.ChatOpenAI`)**: Used for content extraction + memory comparison prompts.
- **Browser Agent (`browser_use.Agent`)**: Vision-enabled scraping of visually grouped aide blocks with structured output.
- **Prompts**: Defined in `utils/prompts.py` (`CONTENT_EXTRACTION_PROMPT`, `MEMORY_FILTERING_PROMPT`).

---
## 🧠 Memory Filtering
`memory_filter.py` loads `memory.json` and avoids re-processing aids based on normalized titles. Optional LLM-enhanced filtering (`filter_with_llm_memory`) compares semantic content and returns lists:
```json
{
  "articles_nouveaux": [ ... ],
  "articles_filtres": [ ... ],
  "resume": "Résumé du filtrage"
}
```
If LLM parsing fails, it gracefully falls back to simple title matching.

---
## 🛰 Tracing & Observability (Langfuse)
- Decorator: `@trace_step("step_name")` wraps sync/async functions.
- Automatically logs input metadata, duration, and summarized output samples.
- Fallback: If keys missing or client init fails, execution proceeds silently.

| Env Var | Purpose |
|---------|---------|
| `LANGFUSE_PUBLIC_KEY` | Public key for project tracing |
| `LANGFUSE_SECRET_KEY` | Secret key for authenticated API calls |
| `LANGFUSE_HOST` | Override host (default: cloud) |
| `LANGFUSE_PROJECT` | Logical tag applied to spans |

No keys → no spans, but workflows still run.

---
## 🔐 Other Environment Variables
| Variable | Source | Default | Purpose |
|----------|--------|---------|---------|
| `ALBERT_API_KEY` | `.env` | (none) | Auth for Albert LLM API |
| `ALBERT_BASE_URL` | settings | `https://albert.api.etalab.gouv.fr/v1` | Endpoint base |
| `ALBERT_MODEL` | settings | `albert-large` | Default model name |
| `MEMORY_FILE` | settings | `memory.json` | Persistent memory store |
| `WORKFLOW_MAX_RETRIES` | settings | `2` | Retry attempts for workflows |
| `WORKFLOW_RETRY_DELAY` | settings | `3` | Seconds between retries |

Copy and adjust from `.env.example` at folder root.

---
## 📦 Installation
Use the `veille` dependency group defined in the project `pyproject.toml`:
```bash
uv sync --group veille
```
(Ensure a Python 3.13+ environment per root config.)

For both experimentations :
```bash
uv sync --group extraction --group veille
```

Optionally install all groups if combining with extraction sandbox:
```bash
uv sync --all-groups
```

---
## ▶️ Quick Start (LLM Workflow)
```python
from agricultural_monitoring.workflows.llm_workflow import LLMWorkflow
from agricultural_monitoring.config.settings import TARGET_URLS

workflow = LLMWorkflow()
results = workflow.monitor_multiple_urls(TARGET_URLS)
summary = workflow.get_summary(results)
print(summary)
for r in results:
    print(r["normalized_data"]["metadata"], len(r["normalized_data"]["aides"]))
```

## 🔀 Hybrid Workflow Example
```python
import asyncio
from agricultural_monitoring.workflows.hybrid_workflow import HybridWorkflow
from agricultural_monitoring.config.settings import TARGET_URLS

async def run():
    hw = HybridWorkflow()
    tasks = [hw.monitor_url(url) for url in TARGET_URLS]
    results = await asyncio.gather(*tasks)
    print(hw.get_summary(results))

asyncio.run(run())
```

## 🤖 Vision Agent Only (Agent Workflow)
```python
import asyncio
from agricultural_monitoring.workflows.agent_workflow import AgentWorkflow
from agricultural_monitoring.config.settings import TARGET_URLS

async def run():
    aw = AgentWorkflow()
    tasks = [aw.monitor_url(url) for url in TARGET_URLS]
    results = await asyncio.gather(*tasks)
    print(aw.get_summary(results))

asyncio.run(run())
```

---
## 🛠 Adding a New Extractor
1. Subclass `BaseExtractor` and implement `extract_content(url) -> Dict[str, Any]`.
2. Return a dict with keys: `url`, `title`, `content`, `status`, `extracted_at` (+ optional link/meta fields).
3. Inject into workflow by replacing the extractor instance (`workflow.web_extractor = MyExtractor()`).

---
## 🧪 Testing & Validation Ideas (Not Included Yet)
| Future Test | Purpose |
|-------------|---------|
| Unit test for each extractor | Ensure consistent shape / error handling |
| Prompt regression tests | Guard changes to `CONTENT_EXTRACTION_PROMPT` |
| Memory filter diff tests | Validate LLM vs title-only outcomes |
| Workflow integration test | Multi-URL success rate & performance metrics |

---
## ⚠️ Edge Cases & Resilience
| Scenario | Handling |
|----------|----------|
| Network timeout | Retries via extractor and workflow constants |
| Non-HTML content | Returns error status; workflow short-circuits |
| Oversized pages | Content truncated before prompting (see processor) |
| Invalid JSON from LLM | Regex fallback extraction → or empty result |
| Missing Langfuse keys | No tracing, normal operation |
| Memory file missing | Logged warning; treat all articles as new |

---
## 🔄 Updating Memory Store
Current implementation reads `memory.json` but does not persist new aids back. To enable persistence:
```python
with open("memory.json", "w", encoding="utf-8") as f:
    json.dump({url: result["normalized_data"]["aides"] for url, result in zip(TARGET_URLS, results)}, f, ensure_ascii=False, indent=2)
```
Add after workflow runs.
Happy monitoring! 🌱
