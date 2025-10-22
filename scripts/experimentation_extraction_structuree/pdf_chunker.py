"""
PDF Chunker Module

This module provides functionality to parse PDFs using Docling,
convert to markdown format, and chunk based on hierarchical titles.
"""

import re
from typing import List, Dict, Optional
from docling.document_converter import DocumentConverter


class HierarchicalPDFChunker:
    """
    Chunks PDF documents based on hierarchical markdown headers.
    
    Uses Docling to parse PDF and extract markdown, then splits content
    based on title hierarchy (#, ##, ###, etc.)
    """
    
    def __init__(self, separators: Optional[List[str]] = None):
        """
        Initialize the chunker.
        
        Args:
            separators: List of markdown header prefixes to use as separators
                       (e.g., ["#", "##", "###"]). Defaults to 5 levels.
        """
        self.separators = separators or ["##### ", "#### ", "### ", "## ", "# "]
        self.converter = DocumentConverter()
    
    def parse_pdf_to_markdown(self, file_path: str) -> str:
        """
        Parse PDF file and convert to markdown format.
        
        Args:
            file_path: Path to the PDF file
            
        Returns:
            Markdown string representation of the PDF
        """
        doc = self.converter.convert(file_path).document
        return doc.export_to_markdown()
    
    def chunk_markdown(self, markdown_text: str) -> List[Dict[str, str]]:
        """
        Split markdown text into chunks based on hierarchical headers.
        
        Args:
            markdown_text: Markdown formatted text
            
        Returns:
            List of dictionaries with 'title' and 'content' keys
        """
        chunks = []
        lines = markdown_text.split('\n')
        
        current_chunk = []
        current_title = ""
        current_level = 0
        
        for line in lines:
            # Check if line is a header
            header_match = re.match(r'^(#{1,5})\s+(.+)$', line)
            
            if header_match:
                # Save previous chunk if it exists
                if current_chunk:
                    chunks.append({
                        'title': current_title,
                        'content': '\n'.join(current_chunk).strip()
                    })
                
                # Start new chunk
                level = len(header_match.group(1))
                current_title = header_match.group(2).strip()
                current_level = level
                current_chunk = [line]
            else:
                current_chunk.append(line)
        
        # Add last chunk
        if current_chunk:
            chunks.append({
                'title': current_title,
                'content': '\n'.join(current_chunk).strip()
            })
        
        return chunks
    
    def chunk_file(self, file_path: str) -> List[Dict[str, str]]:
        """
        Complete pipeline: parse PDF and chunk it.
        
        Args:
            file_path: Path to the PDF file
            
        Returns:
            List of chunks with title and content
        """
        markdown = self.parse_pdf_to_markdown(file_path)
        return self.chunk_markdown(markdown)
    
    def get_context_window(
        self, 
        chunks: List[Dict[str, str]], 
        index: int, 
        window_size: int = 2
    ) -> tuple[str, str]:
        """
        Get previous and next chunks for context.
        
        Args:
            chunks: List of all chunks
            index: Index of current chunk
            window_size: Number of chunks before/after to include
            
        Returns:
            Tuple of (previous_chunks, next_chunks) as strings
        """
        no_chunk_msg = "No chunk is available."
        
        # Previous chunks
        if index == 0:
            prev_chunks = no_chunk_msg
        else:
            start_idx = max(0, index - window_size)
            prev = chunks[start_idx:index]
            prev_chunks = "\n\n".join([c['content'] for c in prev])
        
        # Next chunks
        if index >= len(chunks) - 1:
            next_chunks = no_chunk_msg
        else:
            end_idx = min(len(chunks), index + 1 + window_size)
            next = chunks[index + 1:end_idx]
            next_chunks = "\n\n".join([c['content'] for c in next])
        
        return prev_chunks, next_chunks
