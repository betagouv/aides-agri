from typing import Type, Dict

from pydantic import BaseModel

from data_extraction.adapters.pdf_extractors import (
    PDFMinerExtractor,
    PyPDFExtractor,
    DoclingExtractor,
    LangChainExtractor,
)
from data_extraction.adapters.ollama_structured_extractor import OllamaStructuredExtractor
from data_extraction.adapters.albert_structured_extractor import AlbertStructuredExtractor
from data_extraction.core.document_parser import DocumentParser
from data_extraction.core.structured_extractor import StructuredExtractor


DEFAULT_PARSER = "pdfminer"
DEFAULT_OLLAMA_MODEL = "gemma3:4b"
DEFAULT_ALBERT_MODEL = "albert-small"


PARSER_REGISTRY: Dict[str, Type[DocumentParser]] = {
    "pdfminer": PDFMinerExtractor,
    "pypdf": PyPDFExtractor,
    "docling": DoclingExtractor,
    "langchain": LangChainExtractor,
}


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
        parser: str | None = None,
        model_name: str | None = None
    ) -> None:
        self.schema = schema

        self.parser_name = (parser or DEFAULT_PARSER).lower()
        if self.parser_name not in PARSER_REGISTRY:
            raise ValueError(f"Unknown parser '{self.parser_name}'. Valid: {list(PARSER_REGISTRY)}")
        self.parser_impl = PARSER_REGISTRY[self.parser_name]()

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

    def parse(self, file_path: str) -> str:
        return self.parser_impl.extract(file_path)

    def generate(self, prompt: str, temperature: float = 0.2, **provider_kwargs):
        return self.extractor_impl.get_structured_output(
            model_name=self.model_name,
            user_message=prompt,
            temperature=temperature,
            **provider_kwargs
        )

    def run(self, file_path: str, instruction_prefix: str | None = None, temperature: float = 0.2, **provider_kwargs):
        content = self.parse(file_path)
        prompt = f"{instruction_prefix}\n\n{content}" if instruction_prefix else content
        return self.generate(prompt, temperature=temperature, **provider_kwargs)


