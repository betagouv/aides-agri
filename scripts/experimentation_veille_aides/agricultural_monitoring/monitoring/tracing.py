"""Tracing utilities for monitoring workflow steps."""

from functools import wraps
from typing import Callable, Any
import langsmith
from ..config.settings import LANGSMITH_API_KEY


def trace_step(step_name: str):
    """Decorator to trace workflow steps with LangSmith"""
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs) -> Any:
            if LANGSMITH_API_KEY:
                with langsmith.trace(name=f"agricultural_monitoring_{step_name}"):
                    return func(*args, **kwargs)
            else:
                return func(*args, **kwargs)
        return wrapper
    return decorator