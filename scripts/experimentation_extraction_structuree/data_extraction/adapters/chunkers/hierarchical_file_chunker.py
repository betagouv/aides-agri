import re
import os
from collections import Counter
from typing import Dict, Any, Optional, List

from docling.document_converter import DocumentConverter
from hierarchical.postprocessor import ResultPostprocessor

from data_extraction.core.chunker import FileChunker

class HierarchicalFileChunker(FileChunker):
    """
    Create chunks from a local file (PDF or text) based on a list of separators.
    Returns a list of chunk dicts similar to the Albert chunks:
      {'object': 'chunk', 'id': int, 'metadata': {...}, 'content': str}
    """

    def __init__(self, min_chunk_chars: int = 50):
        self.min_chunk_chars = min_chunk_chars
        self.converter = DocumentConverter()

    def _extract_pages(self, file_path: str) -> str:
        # PDF extraction if .pdf, otherwise treat as plain text (single page)
        if file_path.lower().endswith(".pdf"):
            doc = self.converter.convert(file_path)
            # Export to markdown and write to a .md file alongside the PDF
            ResultPostprocessor(doc).process()
            markdown_content = doc.document.export_to_markdown()
            self.title_separator = find_highest_title_hierarchy(markdown_content)
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
        The title field contains the parent title from the highest hierarchy level.
        """
        text = self._extract_pages(file_path)
        lines = text.splitlines()

        chunks: List[Dict[str, Any]] = []
        current: List[str] = []
        current_parent_title: Optional[str] = None  # Track the parent (highest level) title

        # Normalize separators (keep original but also stripped variants)
        normalized_seps = list({s.strip(): None for s in separators}.keys())

        def is_separator_line(line: str) -> bool:
            stripped = line.lstrip()
            return any(stripped.startswith(sep) for sep in normalized_seps)
        
        def extract_title(line: str) -> str:
            """Extract title text after the separator (e.g., '# Title' -> 'Title')"""
            stripped = line.lstrip()
            for sep in normalized_seps:
                if stripped.startswith(sep):
                    title_text = stripped[len(sep):].lstrip()
                    return title_text
            return ""
        
        def is_highest_level(line: str) -> bool:
            """Check if line uses the highest hierarchy separator (exact match)"""
            if not hasattr(self, 'title_separator') or self.title_separator is None:
                return False
            stripped = line.lstrip()
            # Exact match: the line must start with title_separator followed by a space
            # and not have an additional # before the space
            if not stripped.startswith(self.title_separator):
                return False
            # Get what comes after the title_separator
            after_sep = stripped[len(self.title_separator):]
            # Make sure the next character is a space (not another #)
            return len(after_sep) > 0 and after_sep[0] == ' '

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
                        "document_name": os.path.basename(file_path),
                    },
                    "content": content,
                    "previous_chunks": "No chunks have been provided",
                    "next_chunks": "No chunks have been provided",
                    "title": current_parent_title
                })
            current.clear()

        for line in lines:
            if is_separator_line(line):
                # start a new chunk; flush previous
                flush(force=True)
                
                # Update parent title only if this is the highest level
                if is_highest_level(line):
                    current_parent_title = extract_title(line)
                
                current.append(line)
            else:
                current.append(line)
            # Optional size guard to avoid overly big chunks
            if len("\n".join(current)) > 4000:
                flush(force=True)

        flush(force=True)
        return chunks

def find_highest_title_hierarchy(markdown_text: str, min_frequency: int = 2):
    """
    Find the highest title hierarchy (e.g., '#', '##', '###') in a markdown document
    that appears at least min_frequency times.
    
    Args:
        markdown_text: The markdown document content as a string
        min_frequency: Minimum number of occurrences required (default: 2)
    
    Returns:
        The highest title hierarchy that meets the frequency requirement (e.g., '#', '##'),
        or None if no title hierarchy meets the requirement
    
    Args:
        markdown_text: The markdown document content as a string
        min_frequency: Minimum number of occurrences required (default: 2)
    
    Returns:
        The highest title hierarchy that meets the frequency requirement (e.g., '#', '##'),
        or None if no title hierarchy meets the requirement
    
    Example:
        >>> text = "# Title 1\\n## Subtitle\\n# Title 2\\n### Small\\n## Another subtitle"
        >>> find_highest_title_hierarchy(text)
        '#'
    """
    # Match markdown headers at the start of lines
    # Pattern: start of line, one or more #, followed by space
    header_pattern = re.compile(r'^(#{1,6})\s', re.MULTILINE)
    
    # Find all header markers
    headers = header_pattern.findall(markdown_text)
    
    if not headers:
        return None
    
    # Count occurrences of each header level
    header_counts = Counter(headers)
    
    # Filter headers that meet the minimum frequency requirement
    valid_headers = {level: count for level, count in header_counts.items() 
                     if count >= min_frequency}
    
    if not valid_headers:
        return None
    
    # Find the highest hierarchy (shortest string, i.e., fewest #)
    # '#' is higher than '##', which is higher than '###', etc.
    highest_header = min(valid_headers.keys(), key=len)
    
    return highest_header