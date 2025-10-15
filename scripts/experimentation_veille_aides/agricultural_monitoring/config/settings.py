"""Configuration module for agricultural monitoring workflow."""

import os
from dotenv import load_dotenv

load_dotenv()

# Albert API Configuration
ALBERT_API_KEY = os.getenv("ALBERT_API_KEY")
ALBERT_BASE_URL = "https://albert.api.etalab.gouv.fr/v1"
ALBERT_MODEL = "albert-large"

# LangSmith Configuration
LANGSMITH_API_KEY = os.getenv("LANGSMITH_API_KEY", "")
LANGSMITH_PROJECT = "agricultural-aid-monitoring"

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

def setup_langsmith():
    """Setup LangSmith environment variables for tracing."""
    if LANGSMITH_API_KEY:
        os.environ["LANGCHAIN_TRACING_V2"] = "true"
        os.environ["LANGCHAIN_ENDPOINT"] = "https://api.smith.langchain.com"
        os.environ["LANGCHAIN_API_KEY"] = LANGSMITH_API_KEY
        os.environ["LANGCHAIN_PROJECT"] = LANGSMITH_PROJECT
        return True
    return False