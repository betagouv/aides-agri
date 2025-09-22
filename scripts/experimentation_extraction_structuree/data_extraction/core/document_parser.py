from abc import ABC, abstractmethod

class DocumentParser(ABC):
    """Port interface for extracting text from any document type."""

    @abstractmethod
    def extract(self, file_path: str) -> str:
        """Extract text from a file or URL, regardless of format."""
        pass