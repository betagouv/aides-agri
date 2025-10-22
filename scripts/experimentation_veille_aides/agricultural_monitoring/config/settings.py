"""Configuration module for agricultural monitoring workflow."""

import os
from dotenv import load_dotenv

load_dotenv()

# Albert API Configuration
ALBERT_API_KEY = os.getenv("ALBERT_API_KEY")
ALBERT_BASE_URL = "https://albert.api.etalab.gouv.fr/v1"
ALBERT_MODEL = "albert-large"

# Langfuse Configuration (replaces LangSmith)
LANGFUSE_PUBLIC_KEY = os.getenv("LANGFUSE_PUBLIC_KEY", "")
LANGFUSE_SECRET_KEY = os.getenv("LANGFUSE_SECRET_KEY", "")
LANGFUSE_HOST = os.getenv("LANGFUSE_HOST", "https://cloud.langfuse.com")
LANGFUSE_PROJECT = "veille-aides"

# Target URLs for monitoring
TARGET_URLS = [
    "https://agriculture.gouv.fr/mots-cles/aides",
    "https://ain-rhone.msa.fr/lfp/soutien-exploitant", 
    "https://www.franceagrimer.fr/rechercher-une-aide"
]

# Web extraction settings
WEB_EXTRACTOR_TIMEOUT = 30
WEB_EXTRACTOR_MAX_RETRIES = 3
WEB_EXTRACTOR_USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'

# LLM settings
LLM_TEMPERATURE = 0.1
LLM_MAX_TOKENS = 4000
LLM_REQUEST_TIMEOUT = 60

# Memory filtering settings
MEMORY_FILE = "memory.json"

# Workflow settings
WORKFLOW_MAX_RETRIES = 2
WORKFLOW_RETRY_DELAY = 3

def setup_langfuse():
    """Setup Langfuse environment variables (used if implicit LangChain integration is desired)."""
    if LANGFUSE_PUBLIC_KEY and LANGFUSE_SECRET_KEY:
        # These ENV vars are only needed if using LangChain's built-in Langfuse callback handlers.
        os.environ["LANGFUSE_PUBLIC_KEY"] = LANGFUSE_PUBLIC_KEY
        os.environ["LANGFUSE_SECRET_KEY"] = LANGFUSE_SECRET_KEY
        os.environ["LANGFUSE_HOST"] = LANGFUSE_HOST
        return True
    return False