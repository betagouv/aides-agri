"""Standard web content extractor."""

import requests
import re
from datetime import datetime
from typing import Dict, Any, Optional
from urllib.parse import urljoin
from bs4 import BeautifulSoup

from .base_extractor import BaseExtractor
from ..config.settings import WEB_EXTRACTOR_TIMEOUT, WEB_EXTRACTOR_MAX_RETRIES, WEB_EXTRACTOR_USER_AGENT
from ..monitoring.tracing import trace_step


class RawWebContentExtractor(BaseExtractor):
    """Handles web content extraction with error handling and retry logic"""
    
    def __init__(self, timeout: Optional[int] = None, max_retries: Optional[int] = None):
        self.timeout = timeout or WEB_EXTRACTOR_TIMEOUT
        self.max_retries = max_retries or WEB_EXTRACTOR_MAX_RETRIES
        self.session = requests.Session()
        # Set user agent to avoid blocking
        self.session.headers.update({
            'User-Agent': WEB_EXTRACTOR_USER_AGENT
        })
    
    @trace_step("web_extraction")
    def extract_content(self, url: str) -> Dict[str, Any]:
        """Extract content from a web page"""
        for attempt in range(self.max_retries):
            try:
                print(f"📥 Fetching content from: {url} (attempt {attempt + 1})")
                
                response = self.session.get(url, timeout=self.timeout)
                response.raise_for_status()
                
                # Parse HTML content
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # Remove script and style elements
                for script in soup(["script", "style"]):
                    script.decompose()
                
                # Extract relevant content
                title = soup.find('title')
                title_text = title.get_text().strip() if title else ""
                
                # Get main content (try common content selectors)
                content_selectors = [
                    'main', '.main-content', '#main-content', 
                    '.content', '#content', 'article', '.article'
                ]
                
                main_content = ""
                for selector in content_selectors:
                    content_element = soup.select_one(selector)
                    if content_element:
                        main_content += str(content_element)
                        break
                
                # Fallback to body content if no main content found
                if not main_content:
                    content_element = soup.find('body')
                    main_content = str(content_element) if content_element else ""
                
                
                return {
                    "url": url,
                    "title": title_text,
                    "content": main_content,
                    "status": "success",
                    "extracted_at": datetime.now().isoformat(),
                    "extraction_method": "standard_with_links"
                }
                
            except requests.exceptions.RequestException as e:
                print(f"❌ Error fetching {url} (attempt {attempt + 1}): {e}")
                if attempt == self.max_retries - 1:
                    return {
                        "url": url,
                        "title": "",
                        "content": "",
                        "status": "error",
                        "error": str(e),
                        "extracted_at": datetime.now().isoformat()
                    }
            except Exception as e:
                print(f"❌ Unexpected error processing {url}: {e}")
                return {
                    "url": url,
                    "title": "",
                    "content": "",
                    "status": "error",
                    "error": str(e),
                    "extracted_at": datetime.now().isoformat()
                }

        # This should never be reached, but just in case
        return {
            "url": url,
            "title": "",
            "content": "",
            "status": "error",
            "error": "Max retries exceeded",
            "extracted_at": datetime.now().isoformat()
        }