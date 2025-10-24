"""Tracing utilities for monitoring workflow steps using Langfuse (v2+ API)."""

from functools import wraps
from typing import Callable, Any, Optional, Dict
from datetime import datetime, timezone
import asyncio
import inspect

from dotenv import load_dotenv

try:
    from langfuse import get_client  # ✅ nouvelle API
    LANGFUSE_AVAILABLE = True
except Exception:  # pragma: no cover
    get_client = None  # type: ignore
    LANGFUSE_AVAILABLE = False

from ..config.settings import (
    LANGFUSE_PUBLIC_KEY,
    LANGFUSE_SECRET_KEY,
    LANGFUSE_HOST,
    LANGFUSE_PROJECT,
)

_langfuse_client: Optional[Any] = None


def get_langfuse() -> Optional[Any]:
    """Lazily initialize the Langfuse client (v2 API)."""
    global _langfuse_client
    if _langfuse_client is None and LANGFUSE_AVAILABLE and LANGFUSE_PUBLIC_KEY and LANGFUSE_SECRET_KEY and get_client:
        try:
            load_dotenv()
            _langfuse_client = get_client()
        except Exception as e:  # pragma: no cover
            print(f"⚠️ Langfuse init failed: {e}")
            _langfuse_client = None
    return _langfuse_client


def trace_step(step_name: str):
    """Decorator to trace workflow steps using Langfuse (contextual span API).

    Creates a span for the decorated function, automatically ending it on exit.
    Falls back gracefully if Langfuse is not available.
    Supports both sync and async functions.
    """

    def decorator(func: Callable) -> Callable:
        # Check if the function is async
        is_async = asyncio.iscoroutinefunction(func)
        
        if is_async:
            @wraps(func)
            async def async_wrapper(*args, **kwargs) -> Any:
                lf = get_langfuse()
                if not lf:
                    return await func(*args, **kwargs)

                start_time = datetime.now(timezone.utc)

                # ✅ Utilisation de la nouvelle API : start_as_current_span
                with lf.start_as_current_span(
                    name=f"agri_monitoring_{step_name}",
                    input={"args_count": len(args), "kwargs_keys": list(kwargs.keys())},
                ) as span:
                    # Ajouter des attributs au trace global (si utile)
                    span.update_trace(
                        tags=["agri_monitoring", step_name, LANGFUSE_PROJECT],
                    )

                    try:
                        result = await func(*args, **kwargs)

                        # Sérialiser un aperçu enrichi du résultat
                        output_payload: Dict[str, Any] = _serialize_output(result)

                        duration_ms = (datetime.now(timezone.utc) - start_time).total_seconds() * 1000
                        span.update(
                            output={"status": "success", "duration_ms": duration_ms, **output_payload}
                        )

                        return result

                    except Exception as e:
                        span.update(
                            output={
                                "status": "error",
                                "error": str(e),
                                "duration_ms": (datetime.now(timezone.utc) - start_time).total_seconds() * 1000,
                            }
                        )
                        raise

            return async_wrapper
        else:
            @wraps(func)
            def sync_wrapper(*args, **kwargs) -> Any:
                lf = get_langfuse()
                if not lf:
                    return func(*args, **kwargs)

                start_time = datetime.now(timezone.utc)

                # ✅ Utilisation de la nouvelle API : start_as_current_span
                with lf.start_as_current_span(
                    name=f"agri_monitoring_{step_name}",
                    input={"args_count": len(args), "kwargs_keys": list(kwargs.keys())},
                ) as span:
                    # Ajouter des attributs au trace global (si utile)
                    span.update_trace(
                        tags=["agri_monitoring", step_name, LANGFUSE_PROJECT],
                    )

                    try:
                        result = func(*args, **kwargs)

                        # Sérialiser un aperçu enrichi du résultat
                        output_payload: Dict[str, Any] = _serialize_output(result)

                        duration_ms = (datetime.now(timezone.utc) - start_time).total_seconds() * 1000
                        span.update(
                            output={"status": "success", "duration_ms": duration_ms, **output_payload}
                        )

                        return result

                    except Exception as e:
                        span.update(
                            output={
                                "status": "error",
                                "error": str(e),
                                "duration_ms": (datetime.now(timezone.utc) - start_time).total_seconds() * 1000,
                            }
                        )
                        raise

            return sync_wrapper

    return decorator


def _serialize_output(result: Any) -> Dict[str, Any]:
    """Serialize output with special handling for agricultural aid results."""
    output_payload: Dict[str, Any] = {}
    
    if isinstance(result, dict):
        # Always capture status
        if "status" in result:
            output_payload["status"] = result["status"]
        
        # Special handling for aids results
        if "aides_identifiees" in result:
            aides = result["aides_identifiees"]
            output_payload["aides_count"] = len(aides) if isinstance(aides, list) else 0
            # Log first few aids with title and description
            if isinstance(aides, list) and aides:
                output_payload["aides_sample"] = [
                    {
                        "titre": aide.get("titre", "N/A"),
                        "description": aide.get("description", "N/A")[:100] if aide.get("description") else "N/A",
                    }
                    for aide in aides[:5]  # First 5 aids
                ]
        
        # Handle "aides" key (alternative naming)
        if "aides" in result:
            aides = result["aides"]
            output_payload["aides_count"] = len(aides) if isinstance(aides, list) else 0
            if isinstance(aides, list) and aides:
                output_payload["aides_sample"] = [
                    {
                        "titre": aide.get("titre", aide.get("title", "N/A")),
                        "description": (aide.get("description", "N/A")[:100] 
                                      if aide.get("description") else "N/A"),
                    }
                    for aide in aides[:5]
                ]
        
        # Capture other important fields (limited to avoid large payloads)
        for key in ["resume", "url", "error", "filtered_count", "new_aids_count"]:
            if key in result:
                value = result[key]
                # Truncate long strings
                if isinstance(value, str) and len(value) > 500:
                    output_payload[key] = value[:500] + "... [truncated]"
                else:
                    output_payload[key] = value
    
    return output_payload

__all__ = ["trace_step", "get_langfuse"]