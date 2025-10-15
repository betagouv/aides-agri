"""
Agricultural Monitoring Package

A comprehensive package for monitoring agricultural aid websites using LangChain and LangSmith.

Author: Théo Moreau
Date: October 14, 2025
"""

__version__ = "1.0.0"
__author__ = "Théo Moreau"

# Main imports for easy access
from .workflows.enhanced_workflow import EnhancedAgriculturalMonitoringWorkflow
from .workflows.monitoring_workflow import AgriculturalMonitoringWorkflow
from .config.settings import TARGET_URLS, ALBERT_API_KEY, ALBERT_BASE_URL, ALBERT_MODEL

__all__ = [
    "EnhancedAgriculturalMonitoringWorkflow",
    "AgriculturalMonitoringWorkflow", 
    "TARGET_URLS",
    "ALBERT_API_KEY",
    "ALBERT_BASE_URL",
    "ALBERT_MODEL"
]