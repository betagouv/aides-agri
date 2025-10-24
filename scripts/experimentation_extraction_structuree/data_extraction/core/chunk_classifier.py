from abc import ABC, abstractmethod
from typing import List, Dict

class ChunkClassifier(ABC):
    """Port interface for extracting text from any document type."""

    @abstractmethod
    def classify_chunk(        
        self,
        chunk: str,
        title: str,
        previous_chunks: str = "No chunk is available.",
        next_chunks: str = "No chunk is available."
    ) -> str:
        
        """Classify a text chunk and return its category."""
        pass
    
    @abstractmethod
    def classify_chunks(        
        self,
        chunks: List[Dict[str, str]],
        window_size: int = 2
    ) -> List[Dict[str, str]]:
        """Classify a list of text chunks and return their categories."""
        pass

    @abstractmethod
    def group_by_category(
        self,
        classified_chunks: List[Dict[str, str]]
    ) -> Dict[str, List[Dict[str, str]]]:
        """Group classified chunks by their category."""
        pass