from typing import Type
from abc import ABC, abstractmethod
from pydantic import BaseModel

from data_extraction.core.structured_output import StructuredOutput

class StructuredExtractor(ABC):
    """Port interface for extracting text from any document type."""

    def __init__(self, pydantic_schema: Type[BaseModel]) -> None:
        self.pydantic_schema = pydantic_schema
    
    @abstractmethod
    def get_structured_output(self, model_name: str, system_prompt: str, user_message: str, **kwargs) -> StructuredOutput:
        """Return a StructuredOutput built from the user message following the schema."""
        pass