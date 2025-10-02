from typing import Type
from abc import ABC, abstractmethod
from pydantic import BaseModel

from data_extraction.prompts.instruction_prompts import INSTRUCTION_PROMPT

class StructuredExtractor(ABC):
    """Port interface for extracting text from any document type."""

    def __init__(self, pydantic_schema: Type[BaseModel]) -> None:
        self.pydantic_schema = pydantic_schema
        self.instruction_prompt = INSTRUCTION_PROMPT
    
    @abstractmethod
    def get_structured_output(self, model_name: str, user_message: str, **kwargs):
        """Return a StructuredOutput built from the user message following the schema."""
        pass