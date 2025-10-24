import io
import re
import requests
from typing import Optional, Dict, Type

from pypdf import PdfReader
from pdfminer.high_level import extract_text
from docling.document_converter import DocumentConverter
from langchain_community.document_loaders import UnstructuredPDFLoader, OnlinePDFLoader

from data_extraction.core.document_parser import DocumentParser

URL_PATTERN = re.compile(r"^https?://.+", re.IGNORECASE)

def is_url(path: str) -> bool:
    return bool(URL_PATTERN.match(path))


    

class PDFMinerExtractor(DocumentParser):
    def extract(self, file_path: str) -> str:
        if is_url(file_path):
            response = requests.get(file_path, timeout=30)
            response.raise_for_status()
            return extract_text(io.BytesIO(response.content))
        else:
            with open(file_path, "rb") as f:
                return extract_text(f)

class PyPDFExtractor(DocumentParser):
    def extract(self, file_path: str) -> str:
        reader = PdfReader(file_path)
        return "".join(page.extract_text() or "" for page in reader.pages)


class DoclingExtractor(DocumentParser):
    def extract(self, file_path: str) -> str:
        converter = DocumentConverter()
        doc = converter.convert(file_path).document
        return doc.export_to_text()


class LangChainExtractor(DocumentParser):
    def extract(self, file_path: str) -> str:
        loader_cls = OnlinePDFLoader if is_url(file_path) else UnstructuredPDFLoader
        loader = loader_cls(file_path) if is_url(file_path) else loader_cls(file_path)
        data = loader.load()
        return data[0].page_content if data else ""


PARSER_REGISTRY: Dict[str, Type[DocumentParser]] = {
    "pdfminer": PDFMinerExtractor,
    "pypdf": PyPDFExtractor,
    "docling": DoclingExtractor,
    "langchain": LangChainExtractor,
}

class PDFExtractor(DocumentParser):

    def __init__(self, parser_name: Optional[str] = "") -> None:
        super().__init__()
        parser_cls = PARSER_REGISTRY.get(parser_name) if parser_name is not None else None
        self.parser = parser_cls() if parser_cls else PDFMinerExtractor()
    
    def extract(self, file_path: str) -> str:
        return self.parser.extract(file_path)