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


class WebContentExtractor(BaseExtractor):
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
                        main_content = content_element.get_text(separator=' ', strip=True)
                        break
                
                # Fallback to body content if no main content found
                if not main_content:
                    content_element = soup.find('body')
                    main_content = content_element.get_text(separator=' ', strip=True) if content_element else ""
                
                # Extract all links from the page
                all_links = []
                links_found = soup.find_all('a', href=True)
                base_domain = f"{response.url.split('/')[0]}//{response.url.split('/')[2]}"
                
                for link in links_found:
                    href_attr = link.get('href', '')
                    href = str(href_attr).strip() if href_attr else ""
                    link_text = link.get_text(strip=True)
                    
                    if not href:
                        continue
                    
                    # Convert relative URLs to absolute
                    if href.startswith('/'):
                        full_url = base_domain + href
                    elif href.startswith('http'):
                        full_url = href
                    elif href.startswith('#'):
                        # Skip anchor links
                        continue
                    elif href.startswith('mailto:') or href.startswith('tel:'):
                        # Skip email and phone links
                        continue
                    else:
                        # Handle other relative links
                        full_url = urljoin(url, href)
                    
                    all_links.append({
                        "text": link_text,
                        "url": full_url
                    })
                
                # Deduplicate links based on URL
                seen_urls = set()
                unique_links = []
                for link in all_links:
                    if link["url"] not in seen_urls:
                        seen_urls.add(link["url"])
                        unique_links.append(link)
                
                # Create enhanced content that includes all links
                enhanced_content = main_content
                if unique_links:
                    links_section = "\n\nTOUS LES LIENS TROUVÉS SUR LA PAGE:\n"
                    for i, link in enumerate(unique_links, 1):
                        links_section += f"{i}. [{link['text']}] -> {link['url']}\n"
                    enhanced_content = main_content + links_section
                
                # Clean up content
                enhanced_content = re.sub(r'\s+', ' ', enhanced_content).strip()
                
                return {
                    "url": url,
                    "title": title_text,
                    "content": enhanced_content,
                    "links_count": len(unique_links),
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