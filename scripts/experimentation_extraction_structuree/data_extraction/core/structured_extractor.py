from abc import ABC, abstractmethod
from pydantic import BaseModel

from data_extraction.prompts.prompts import INSTRUCTION_PROMPT

class StructuredExtractor(ABC):
    """Port interface for extracting text from any document type."""

    def __init__(self, pydantic_schema: BaseModel) -> None:
        self.pydantic_schema = pydantic_schema
        self.instruction_prompt = INSTRUCTION_PROMPT
    
    @abstractmethod
    def get_structured_output(self, instruction_prompt: str, user_message: str, pydantic_schema: BaseModel, **kwargs) -> str:
        """Extract text from a file or URL, regardless of format."""
        pass