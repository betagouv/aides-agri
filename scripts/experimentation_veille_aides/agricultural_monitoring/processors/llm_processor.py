"""LLM processor for extracting agricultural aid information."""

import json
import re
from typing import Dict, Any, Optional, List
from langchain_openai import ChatOpenAI

from ..utils.prompts import CONTENT_EXTRACTION_PROMPT
from ..config.settings import ALBERT_API_KEY, ALBERT_BASE_URL, ALBERT_MODEL, LLM_TEMPERATURE, LLM_MAX_TOKENS, LLM_REQUEST_TIMEOUT
from ..monitoring.tracing import trace_step


class LLMProcessor:
    """Processes web content using LLM to extract agricultural aid information"""
    
    def __init__(self, llm: Optional[ChatOpenAI] = None):
        self.llm = llm or self._create_llm()
    
    def _create_llm(self) -> ChatOpenAI:
        """Create an instance of the Albert LLM"""
        return ChatOpenAI(
            model=ALBERT_MODEL,
            base_url=ALBERT_BASE_URL,
            temperature=LLM_TEMPERATURE,
            api_key=ALBERT_API_KEY,
            max_tokens=LLM_MAX_TOKENS, # type: ignore
            request_timeout=LLM_REQUEST_TIMEOUT # type: ignore
        )
    
    @trace_step("llm_content_processing")
    def process_content(self, web_content: Dict[str, Any], article_list: List[dict]) -> Dict[str, Any]:
        """Process web content with LLM to extract agricultural aids"""
        if web_content.get("status") != "success":
            return {
                "status": "skipped",
                "reason": "Web content extraction failed",
                "aides_identifiees": []
            }
        
        try:
            # Truncate content if too long (keep first 8000 characters)
            content = web_content.get("content", "")[:8000]
            
            # Create the chain
            chain = CONTENT_EXTRACTION_PROMPT | self.llm
            
            # Run the LLM processing
            response = chain.invoke({
                "url": web_content.get("url", ""),
                "title": web_content.get("title", ""),
                "content": content,
                "article_list": article_list
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
                    result = {"aides_identifiees": [], "resume": "Erreur de parsing JSON"}
            
            return {
                "status": "success",
                **result
            }
            
        except Exception as e:
            print(f"❌ Error in LLM content processing: {e}")
            return {
                "status": "error",
                "error": str(e),
                "aides_identifiees": []
            }