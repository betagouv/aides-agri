from typing import Dict, Any, List
import os

from docling.datamodel.pipeline_options import (
    EasyOcrOptions,
    PdfPipelineOptions
)
from docling.document_converter import DocumentConverter, PdfFormatOption
from docling.datamodel.base_models import InputFormat

from data_extraction.core.chunker import FileChunker

class DoclingOCRFileChunker(FileChunker):
    """
    Create chunks from a local file (PDF or text) based on a list of separators.
    Returns a list of chunk dicts similar to the Albert chunks:
      {'object': 'chunk', 'id': int, 'metadata': {...}, 'content': str}
    """

    def __init__(self, min_chunk_chars: int = 50):
        # minimum characters to flush a chunk (helps avoid tiny fragments)
        self.min_chunk_chars = min_chunk_chars
        tesseract_ocr_options = EasyOcrOptions(force_full_page_ocr=True)

        pipeline_options = PdfPipelineOptions()
        pipeline_options.do_ocr = True
        pipeline_options.do_table_structure = True
        pipeline_options.table_structure_options.do_cell_matching = True

        pipeline_options.ocr_options = tesseract_ocr_options

        self.converter = DocumentConverter(
                format_options={
                    InputFormat.PDF: PdfFormatOption(
                        pipeline_options=pipeline_options,
                    )
                }
            )

    def _extract_pages(self, file_path: str) -> str:
        # PDF extraction if .pdf, otherwise treat as plain text (single page)
        if file_path.lower().endswith(".pdf"):
            doc = self.converter.convert(file_path).document
            # Export to markdown and write to a .md file alongside the PDF
            markdown_content = doc.export_to_markdown()
            return markdown_content
        else:
            # plain text file
            with open(file_path, "r", encoding="utf-8") as f:
                return f.read()

    def chunk_file(self, file_path: str, separators: List[str] = ["## ", "# "]) -> List[Dict[str, Any]]:
        """
        Split file content into chunks based on heading separators.
        Each chunk starts with a separator line (e.g. '#', '##', etc.)
        and aggregates following lines until the next separator.
        """
        text = self._extract_pages(file_path)
        lines = text.splitlines()

        chunks: List[Dict[str, Any]] = []
        current: List[str] = []

        # Normalize separators (keep original but also stripped variants)
        normalized_seps = list({s.strip(): None for s in separators}.keys())

        def is_separator_line(line: str) -> bool:
            stripped = line.lstrip()
            return any(stripped.startswith(sep) for sep in normalized_seps)

        def flush(force: bool = False):
            if not current:
                return
            content = "\n".join(current).strip()
            if not content:
                current.clear()
                return
            # Keep if large enough or it's a heading-only chunk
            if force or len(content) >= self.min_chunk_chars or is_separator_line(current[0]):
                chunks.append({
                    "object": "chunk",
                    "id": len(chunks) + 1,
                    "metadata": {
                        "document_name": os.path.basename(file_path)
                    },
                    "chunk": content,
                    "previous_chunks": "No chunks have been provided.",
                    "next_chunks": "No chunks have been provided.",
                    "title": "No title has been provided."

                })
            current.clear()

        for line in lines:
            if is_separator_line(line):
                # start a new chunk; flush previous
                flush(force=True)
                current.append(line)
            else:
                current.append(line)
            # Optional size guard to avoid overly big chunks
            if len("\n".join(current)) > 4000:
                flush(force=True)

        flush(force=True)
        return chunks