"""Memory-based filtering system to avoid processing duplicate articles."""

import json
import unicodedata
import re
from pathlib import Path
from typing import Dict, List, Any, Optional
from langchain_openai import ChatOpenAI

from ..models.data_models import AideAgricole
from ..utils.prompts import MEMORY_FILTERING_PROMPT
from ..config.settings import MEMORY_FILE
from ..monitoring.tracing import trace_step


class MemoryBasedFilter:
    """Filter articles based on previously processed memory"""
    
    def __init__(self, memory_file: Optional[str] = None, llm: Optional[ChatOpenAI] = None):
        self.memory_file = Path(memory_file or MEMORY_FILE)
        self.memory_data = self._load_memory()
        self.llm = llm
    
    def _load_memory(self) -> Dict[str, List[Dict]]:
        """Load memory data from JSON file"""
        if self.memory_file.exists():
            try:
                with open(self.memory_file, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception as e:
                print(f"⚠️  Error loading memory file: {e}")
                return {}
        else:
            print(f"⚠️  Memory file {self.memory_file} not found")
            return {}
    
    def _normalize_title(self, title: str) -> str:
        """Normalize title for comparison (remove accents, lowercase, strip whitespace)"""
        normalized = unicodedata.normalize('NFKD', title)
        normalized = normalized.encode('ascii', 'ignore').decode('ascii')
        normalized = normalized.lower().strip()
        return ' '.join(normalized.split())  # Remove extra spaces
    
    def get_memory_for_url(self, url: str) -> List[Dict]:
        """Get previously processed articles for a specific URL"""
        return self.memory_data.get(url, [])
    
    @trace_step("memory_filtering")
    def filter_new_articles(self, current_articles: List[Dict], source_url: str) -> List[Dict]:
        """Filter out articles that are already in memory using simple title comparison"""
        memory_articles = self.get_memory_for_url(source_url)
        
        if not memory_articles:
            print(f"ℹ️  No memory found for {source_url}, keeping all {len(current_articles)} articles")
            return current_articles
        
        # Create set of normalized memory titles for fast lookup
        memory_titles = {self._normalize_title(article.get('titre', '')) for article in memory_articles}
        
        # Filter current articles
        new_articles = []
        for article in current_articles:
            current_title = self._normalize_title(article.get('titre_aide', ''))
            if current_title not in memory_titles:
                new_articles.append(article)
        
        print(f"🔍 Filtered {len(current_articles)} → {len(new_articles)} new articles for {source_url}")
        return new_articles

    @trace_step("llm_memory_filtering")
    def filter_with_llm_memory(self, current_articles: List[Dict], source_url: str) -> Dict[str, Any]:
        """Filter articles using LLM-based memory comparison"""
        if not current_articles:
            return {
                "status": "success",
                "aides": [],
                "filtered_count": 0,
                "new_count": 0
            }
        
        if not self.llm:
            # Fallback to simple filtering if no LLM provided
            filtered_articles = self.filter_new_articles(current_articles, source_url)
            return {
                "status": "success",
                "aides": filtered_articles,
                "filtered_count": len(current_articles) - len(filtered_articles),
                "new_count": len(filtered_articles),
                "filtering_summary": "Used simple title-based filtering (no LLM provided)"
            }
        
        try:
            # Get memory articles for this URL
            memory_articles = self.get_memory_for_url(source_url)
            
            # Use LLM for sophisticated filtering
            chain = MEMORY_FILTERING_PROMPT | self.llm
            
            response = chain.invoke({
                "current_articles": json.dumps(current_articles, indent=2, ensure_ascii=False),
                "memory_articles": json.dumps(memory_articles, indent=2, ensure_ascii=False)
            })
            
            # Parse JSON response
            try:
                result = json.loads(response.content if isinstance(response.content, str) else str(response.content))
            except json.JSONDecodeError:
                # Fallback: try to extract JSON from response
                json_match = re.search(r'\{.*\}', str(response.content), re.DOTALL)
                if json_match:
                    result = json.loads(json_match.group())
                else:
                    # Fallback: use simple filtering
                    print("⚠️  LLM JSON parsing failed, using simple title-based filtering")
                    filtered_articles = self.filter_new_articles(current_articles, source_url)
                    result = {
                        "articles_nouveaux": filtered_articles,
                        "articles_filtres": [],
                        "resume": "Utilisé le filtrage simple par titre (échec du parsing LLM)"
                    }
            
            # Validate and create AideAgricole objects
            new_articles = []
            for article_data in result.get("articles_nouveaux", []):
                try:
                    aide = AideAgricole(**article_data)
                    new_articles.append(aide.dict())
                except Exception as e:
                    print(f"⚠️  Error validating filtered article: {e}")
                    continue
            
            filtered_count = len(current_articles) - len(new_articles)
            
            return {
                "status": "success",
                "aides": new_articles,
                "filtered_count": filtered_count,
                "new_count": len(new_articles),
                "filtering_summary": result.get("resume", ""),
                "articles_filtres": result.get("articles_filtres", [])
            }
            
        except Exception as e:
            print(f"❌ Error in memory filtering: {e}")
            # Fallback to original articles if filtering fails
            return {
                "status": "error",
                "error": str(e),
                "aides": current_articles,
                "filtered_count": 0,
                "new_count": len(current_articles)
            }