"""Models package."""

from .data_models import (
    AideAgricole, 
    AidesAgricolesResponse,
    WebExtractionResult,
    LLMProcessingResult,
    MemoryFilteringResult
)

__all__ = [
    "AideAgricole",
    "AidesAgricolesResponse", 
    "WebExtractionResult",
    "LLMProcessingResult",
    "MemoryFilteringResult"
]