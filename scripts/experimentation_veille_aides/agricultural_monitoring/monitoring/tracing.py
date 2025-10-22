"""Tracing utilities for monitoring workflow steps using Langfuse (v2+ API)."""

from functools import wraps
from typing import Callable, Any, Optional, Dict
from datetime import datetime, timezone

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
    """

    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs) -> Any:
            lf = get_langfuse()
            if not lf:
                return func(*args, **kwargs)

            start_time = datetime.now(timezone.utc)

            # ✅ Utilisation de la nouvelle API : start_as_current_span
            with lf.start_as_current_span(
                name=f"agri_monitoring_{step_name}",
                input={"args_count": len(args)},
            ) as span:
                # Ajouter des attributs au trace global (si utile)
                span.update_trace(
                    tags=["agri_monitoring", step_name, LANGFUSE_PROJECT],
                )

                try:
                    result = func(*args, **kwargs)

                    # Sérialiser un aperçu du résultat (pour éviter les gros payloads)
                    output_payload: Dict[str, Any] = {}
                    if isinstance(result, dict):
                        output_payload = {
                            k: v
                            for k, v in list(result.items())[:10]
                            if not isinstance(v, (bytes, bytearray))
                        }

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

        return wrapper

    return decorator

__all__ = ["trace_step", "get_langfuse"]