import io
import re
import requests
from abc import abstractmethod
from typing import Optional, Dict, Type

from trafilatura import fetch_url, extract

from data_extraction.core.document_parser import DocumentParser


class TrafilaturaExtractor(DocumentParser):
    def extract(self, file_path: str) -> str:
        downloaded = fetch_url("https://bofip.impots.gouv.fr/bofip/1585-PGP.html/identifiant%3DBOI-BA-RICI-20-40-20240410")
        result = extract(downloaded, output_format="markdown") or ""
        return result

PARSER_REGISTRY: Dict[str, Type[DocumentParser]] = {
    "tf": TrafilaturaExtractor
}

class HTMLExtractor(DocumentParser):

    def __init__(self, parser_name: Optional[str] = "") -> None:
        super().__init__()
        parser_cls = PARSER_REGISTRY.get(parser_name) if parser_name is not None else None
        self.parser = parser_cls() if parser_cls else TrafilaturaExtractor()
    
    def extract(self, file_path: str) -> str:
        return self.parser.extract(file_path)