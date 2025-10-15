"""Base extractor interface."""

from abc import ABC, abstractmethod
from typing import Dict, Any


class BaseExtractor(ABC):
    """Abstract base class for content extractors."""
    
    @abstractmethod
    def extract_content(self, url: str) -> Dict[str, Any]:
        """Extract content from a web page.
        
        Args:
            url: The URL to extract content from
            
        Returns:
            Dictionary containing extracted content and metadata
        """
        pass