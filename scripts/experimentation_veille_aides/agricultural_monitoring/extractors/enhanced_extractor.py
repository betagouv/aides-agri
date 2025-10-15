"""Enhanced web content extractor with inline link preservation."""

import requests
import re
from datetime import datetime
from typing import Dict, Any, Optional
from urllib.parse import urljoin
from bs4 import BeautifulSoup

from .base_extractor import BaseExtractor
from ..config.settings import WEB_EXTRACTOR_TIMEOUT, WEB_EXTRACTOR_MAX_RETRIES, WEB_EXTRACTOR_USER_AGENT
from ..monitoring.tracing import trace_step


class EnhancedWebContentExtractor(BaseExtractor):
    """Enhanced web content extractor that preserves links inline with text"""
    
    def __init__(self, timeout: Optional[int] = None, max_retries: Optional[int] = None):
        self.timeout = timeout or WEB_EXTRACTOR_TIMEOUT
        self.max_retries = max_retries or WEB_EXTRACTOR_MAX_RETRIES
        self.session = requests.Session()
        # Set user agent to avoid blocking
        self.session.headers.update({
            'User-Agent': WEB_EXTRACTOR_USER_AGENT
        })
    
    def _convert_links_to_text(self, element, base_url: str) -> str:
        """Convert HTML element to text while preserving link information inline"""
        if element is None:
            return ""
        
        # Clone the element to avoid modifying the original
        element_copy = element.__copy__()
        
        # Process all links in the element
        for link in element_copy.find_all('a', href=True):
            href_attr = link.get('href', '')
            href = str(href_attr).strip() if href_attr else ""
            link_text = link.get_text(strip=True)
            
            if not href or not link_text:
                # Replace with just the text if no proper link
                link.replace_with(link_text)
                continue
            
            # Convert relative URLs to absolute
            if href.startswith('/'):
                full_url = base_url.rstrip('/') + href
            elif href.startswith('http'):
                full_url = href
            elif href.startswith('#'):
                # Skip anchor links - just keep the text
                link.replace_with(link_text)
                continue
            elif href.startswith('mailto:') or href.startswith('tel:'):
                # Keep email and phone links as is
                link.replace_with(f"{link_text} ({href})")
                continue
            else:
                # Handle other relative links
                full_url = urljoin(base_url, href)
            
            # Replace the link with formatted text that includes the URL
            formatted_link = f"{link_text} [LIEN: {full_url}]"
            link.replace_with(formatted_link)
        
        # Get the text with preserved link information
        text = element_copy.get_text(separator=' ', strip=True)
        return re.sub(r'\s+', ' ', text).strip()
    
    @trace_step("enhanced_web_extraction")
    def extract_content(self, url: str) -> Dict[str, Any]:
        """Extract content from a web page with inline link preservation"""
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
                
                # Get base URL for relative links
                base_domain = f"{response.url.split('/')[0]}//{response.url.split('/')[2]}"
                
                # Get main content (try common content selectors)
                content_selectors = [
                    'main', '.main-content', '#main-content', 
                    '.content', '#content', 'article', '.article'
                ]
                
                main_content = ""
                content_element = None
                for selector in content_selectors:
                    content_element = soup.select_one(selector)
                    if content_element:
                        main_content = self._convert_links_to_text(content_element, base_domain)
                        break
                
                # Fallback to body content if no main content found
                if not main_content:
                    content_element = soup.find('body')
                    if content_element:
                        main_content = self._convert_links_to_text(content_element, base_domain)
                
                # Extract structured links information for additional analysis
                all_links = []
                if content_element:
                    links_found = content_element.find_all('a', href=True)
                    
                    for link in links_found:
                        href_attr = link.get('href', '')
                        href = str(href_attr).strip() if href_attr else ""
                        link_text = link.get_text(strip=True)
                        
                        if not href or not link_text:
                            continue
                        
                        # Convert relative URLs to absolute
                        if href.startswith('/'):
                            full_url = base_domain.rstrip('/') + href
                        elif href.startswith('http'):
                            full_url = href
                        elif href.startswith('#'):
                            continue  # Skip anchor links
                        elif href.startswith('mailto:') or href.startswith('tel:'):
                            continue  # Skip email and phone links
                        else:
                            full_url = urljoin(url, href)
                        
                        all_links.append({
                            "text": link_text,
                            "url": full_url
                        })
                
                # Deduplicate links
                seen_urls = set()
                unique_links = []
                for link in all_links:
                    if link["url"] not in seen_urls:
                        seen_urls.add(link["url"])
                        unique_links.append(link)
                
                return {
                    "url": url,
                    "title": title_text,
                    "content": main_content,
                    "structured_links": unique_links,
                    "links_count": len(unique_links),
                    "status": "success",
                    "extracted_at": datetime.now().isoformat(),
                    "extraction_method": "enhanced_with_inline_links"
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