"""
Agricultural Monitoring Package

A comprehensive package for monitoring agricultural aid websites using LangChain with Langfuse observability.

Author: Théo Moreau
Date: October 14, 2025
"""

__version__ = "1.0.0"
__author__ = "Théo Moreau"

# Main imports for easy access
from .workflows.hybrid_workflow import HybridWorkflow
from .workflows.agent_workflow import AgentWorkflow
from .workflows.llm_workflow import LLMWorkflow
from .config.settings import TARGET_URLS, ALBERT_API_KEY, ALBERT_BASE_URL, ALBERT_MODEL

__all__ = [
    "HybridWorkflow",
    "AgentWorkflow",
    "LLMWorkflow",
    "TARGET_URLS",
    "ALBERT_API_KEY",
    "ALBERT_BASE_URL",
    "ALBERT_MODEL"
]