from typing import Type, Dict, List

from pydantic import BaseModel

from data_extraction.adapters.structured_extractors.ollama_structured_extractor import OllamaStructuredExtractor
from data_extraction.adapters.structured_extractors.albert_structured_extractor import AlbertStructuredExtractor
from data_extraction.prompts.structured_extraction_prompt import build_structured_extraction_prompt
from data_extraction.core.structured_extractor import StructuredExtractor
from data_extraction.core.structured_output import StructuredOutput
from .parser_engine import ParserEngine


DEFAULT_PARSER = "pdfminer"
DEFAULT_OLLAMA_MODEL = "gemma3:4b"
DEFAULT_ALBERT_MODEL = "albert-small"


EXTRACTOR_REGISTRY: Dict[str, Type[StructuredExtractor]] = {
    "ollama": OllamaStructuredExtractor,
    "albert": AlbertStructuredExtractor,
}


class Engine:
    """
    High-level orchestrator that:
    - parses a PDF (local path or URL) using the selected parser
    - calls the selected LLM provider to produce structured output using a Pydantic schema

    It accepts human-friendly string identifiers for the parser and model provider
    and supplies sensible defaults when omitted.
    """

    def __init__(
        self,
        schema: Type[BaseModel],
        model_name: str | None = None
    ) -> None:
        self.schema = schema
        self.parser_engine = ParserEngine()

        # Determine model name default first
        self.model_name = model_name or DEFAULT_ALBERT_MODEL

        # Auto-detect provider from model_name if not explicitly provided
        self.provider_name = "albert" if "albert" in self.model_name.lower() else "ollama"
        if self.provider_name not in EXTRACTOR_REGISTRY:
            raise ValueError(f"Unknown model provider '{self.provider_name}'. Valid: {list(EXTRACTOR_REGISTRY)}")
        self.extractor_impl = EXTRACTOR_REGISTRY[self.provider_name](self.schema)

        # If a defaulted model_name was used that doesn't match provider intent, adjust
        if model_name is None:
            if self.provider_name == "ollama" and "albert" in self.model_name.lower():
                self.model_name = DEFAULT_OLLAMA_MODEL
            if self.provider_name == "albert" and "albert" not in self.model_name.lower():
                self.model_name = DEFAULT_ALBERT_MODEL

    def generate(self, system_prompt: str, user_prompt: str, temperature: float = 0.2, **provider_kwargs) -> StructuredOutput:
        return self.extractor_impl.get_structured_output(
            model_name=self.model_name,
            system_prompt=system_prompt,
            user_message=user_prompt,
            temperature=temperature,
            **provider_kwargs
        )

    def run(self, resource_pool: List[str], temperature: float = 0.2, **provider_kwargs) -> StructuredOutput:
        content = self.parser_engine.parse_resource_pool(resource_pool)
        system_prompt = build_structured_extraction_prompt(self.schema)
        return self.generate(system_prompt=system_prompt, user_prompt=content, temperature=temperature, **provider_kwargs)
