from typing import Type, List, Dict, Tuple, Callable, Optional

from data_extraction.core.structured_extractor import StructuredExtractor
from data_extraction.core.chunk_classifier import ChunkClassifier
from data_extraction.core.document_parser import DocumentParser
from data_extraction.core.chunker import FileChunker
from data_extraction.core.structured_output import StructuredOutput
from data_extraction.adapters.parsers.pdf_extractors import PDFExtractor
from data_extraction.adapters.chunkers.hierarchical_file_chunker import HierarchicalFileChunker
from data_extraction.adapters.structured_extractors.albert_structured_extractor import AlbertStructuredExtractor
from data_extraction.schemas.schema_aide import DispositifAideLeger
from data_extraction.prompts.structured_extraction_prompt import build_structured_extraction_prompt

class ParserAide:
    """Port interface for parsing an agricultural "aide" information in correct categories from a pdf."""

    def __init__(
        self, 
        chunk_classifier: ChunkClassifier,
        structured_extractor: Type[StructuredExtractor] = AlbertStructuredExtractor,
        model_name: str = "albert-large",
        pdf_extractor: DocumentParser = PDFExtractor("docling"),  # Default to Docling PDF
        chunker: FileChunker = HierarchicalFileChunker()
    ) -> None:
        self.structured_extractor = structured_extractor(pydantic_schema=DispositifAideLeger)
        self.chunk_classifier = chunk_classifier
        self.pdf_extractor = pdf_extractor
        self.chunker = chunker
        self.model_name = model_name

    def _structured_extraction(self, pdf_document: str) -> StructuredOutput:
        parsed_pdf = self.pdf_extractor.extract(pdf_document)
        extracted_data = self.structured_extractor.get_structured_output(
            model_name=self.model_name,
            system_prompt=build_structured_extraction_prompt(DispositifAideLeger),
            user_message=parsed_pdf,
            temperature=0
        )
        return extracted_data
    
    def _chunk_classification(self, pdf_document: str) -> Tuple[Dict[str, List[Dict[str, str]]], List[Dict[str, str]]]:
        """Run chunking + classification, returning grouped and flat classified chunks.

        Returns:
            grouped_chunks: dict mapping category -> list of classified chunk dicts
            classified_chunks: original flat list preserving document order
        """
        chunks = self.chunker.chunk_file(pdf_document)
        classified_chunks = self.chunk_classifier.classify_chunks(chunks)
        grouped_chunks = self.chunk_classifier.group_by_category(classified_chunks)
        return grouped_chunks, classified_chunks

    def classify_chunks_with_progress(
        self,
        pdf_document: str,
        window_size: int = 2,
        progress_callback: Optional[Callable[[int, int], None]] = None
    ) -> Tuple[Dict[str, List[Dict[str, str]]], List[Dict[str, str]]]:
        """Classify chunks with an optional progress callback.

        Args:
            pdf_document: Path to PDF file.
            window_size: Number of surrounding chunks for context.
            progress_callback: Function receiving (completed, total).

        Returns:
            grouped_chunks: category -> list of chunk dicts
            classified_chunks: flat ordered list of chunk dicts
        """
        chunks = self.chunker.chunk_file(pdf_document)
        classified_chunks: List[Dict[str, str]] = []
        total = len(chunks)
        no_chunk_msg = "No chunk is available."

        for i, chunk_obj in enumerate(chunks):
            if i == 0:
                prev_chunks = no_chunk_msg
            else:
                start_idx = max(0, i - window_size)
                prev = chunks[start_idx:i]
                prev_chunks = "\n\n".join([c['content'] for c in prev])

            if i >= total - 1:
                next_chunks = no_chunk_msg
            else:
                end_idx = min(total, i + 1 + window_size)
                nxt = chunks[i + 1:end_idx]
                next_chunks = "\n\n".join([c['content'] for c in nxt])

            classification = self.chunk_classifier.classify_chunk(
                chunk=chunk_obj['content'],
                title=chunk_obj['title'],
                previous_chunks=prev_chunks,
                next_chunks=next_chunks
            )

            # Support both dict (structured) and str (raw category)
            if isinstance(classification, dict):
                categorie_val = classification.get('categorie', 'autre')
            else:
                categorie_val = classification

            classified_chunks.append({
                'title': chunk_obj['title'],
                'content': chunk_obj['content'],
                'categorie': categorie_val
            })

            if progress_callback:
                progress_callback(i + 1, total)

        grouped = self.chunk_classifier.group_by_category(classified_chunks)
        return grouped, classified_chunks

    def extract_structured(self, pdf_document: str) -> Dict:
        """Public wrapper for structured extraction JSON."""
        return self._structured_extraction(pdf_document).get_json()
    
    def parse_pdf(self, pdf_document: str) -> Tuple[Dict[str, List[Dict[str, str]]], List[Dict[str, str]], Dict]:
        """End-to-end parsing pipeline for an aide PDF.

        Args:
            pdf_document: Path to the PDF file.

        Returns:
            grouped_chunks: category -> list of chunk dicts
            classified_chunks: flat ordered list of chunk dicts (title, content, categorie)
            structured_json: structured extraction JSON output
        """
        structured_output = self._structured_extraction(pdf_document)
        grouped_chunks, classified_chunks = self._chunk_classification(pdf_document)
        return grouped_chunks, classified_chunks, structured_output.get_json()