from typing import Dict, List
from abc import abstractmethod

class FileChunker:
    """
    Create chunks from a local file (PDF or text) based on a list of separators.
    Returns a list of chunk dicts similar to the Albert chunks:
      {'object': 'chunk', 'id': int, 'metadata': {...}, 'content': str}
    """

    @abstractmethod
    def chunk_file(self, file_path: str, separators: List[str] = ["## ", "# "]) -> List[Dict[str, str]]:
        """
        Split file content into chunks based on heading separators.
        Each chunk starts with a separator line (e.g. '#', '##', etc.)
        and aggregates following lines until the next separator.
        """
        pass