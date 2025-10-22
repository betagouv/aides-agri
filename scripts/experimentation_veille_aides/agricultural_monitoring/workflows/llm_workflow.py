"""Standard agricultural monitoring workflow."""

from typing import Dict, Any, List
from datetime import datetime

from ..extractors.enhanced_extractor import EnhancedWebContentExtractor
from ..processors.llm_processor import LLMProcessor
from ..processors.normalizer import DataNormalizer
from ..processors.memory_filter import MemoryBasedFilter
from ..models.data_models import AidesAgricolesResponse
from ..monitoring.tracing import trace_step


class LLMWorkflow:
    """Complete workflow for monitoring agricultural aids"""
    
    def __init__(self):
        self.web_extractor = EnhancedWebContentExtractor()
        self.llm_processor = LLMProcessor()
        self.normalizer = DataNormalizer()
        self.memory_filter = MemoryBasedFilter(llm=self.llm_processor.llm)
    
    @trace_step("complete_workflow")
    def monitor_url(self, url: str) -> Dict[str, Any]:
        """Monitor a single URL for agricultural aids"""
        print(f"🔍 Starting monitoring workflow for: {url}")
        
        try:
            # Step 1: Web content extraction
            web_content = self.web_extractor.extract_content(url)
            
            if web_content["status"] != "success":
                return self._create_error_result(url, "Web extraction failed", web_content.get("error", "Unknown error"))
            
            # Step 2: LLM processing
            llm_result = self.llm_processor.process_content(web_content, article_list="")
            
            if llm_result["status"] != "success":
                return self._create_error_result(url, "LLM processing failed", llm_result.get("error", "Unknown error"))
            
            # Step 3: Data normalization
            normalized_result = self.normalizer.normalize_data(llm_result, url)
            
            if normalized_result["metadata"]["status"] != "success":
                return self._create_error_result(url, "Normalization failed", normalized_result["metadata"].get("error", "Unknown error"))
            
            # Step 4: Memory filtering
            memory_result = self.memory_filter.filter_with_llm_memory(normalized_result["aides"], url)
            
            return {
                "web_content": web_content,
                "llm_extraction": llm_result,
                "normalized_data": normalized_result,
                "memory_filtered_data": memory_result
            }
            
        except Exception as e:
            print(f"❌ Workflow error for {url}: {e}")
            return self._create_error_result(url, "Workflow error", str(e))
    
    def _create_error_result(self, url: str, error_type: str, error_message: str) -> Dict[str, Any]:
        """Create a standardized error result"""
        return {
            "web_content": {"url": url, "status": "error", "error": error_message},
            "llm_extraction": {"status": "error", "error": error_message},
            "normalized_data": AidesAgricolesResponse(
                aides=[],
                metadata={
                    "status": "error", 
                    "error": f"{error_type}: {error_message}",
                    "source_url": url,
                    "processing_date": datetime.now().isoformat()
                }
            ).dict(),
            "memory_filtered_data": {"status": "error", "error": error_message}
        }
    
    def monitor_multiple_urls(self, urls: List[str]) -> List[Dict[str, Any]]:
        """Monitor multiple URLs"""
        print(f"🔍 Starting batch monitoring for {len(urls)} URLs")
        
        results = []
        for url in urls:
            result = self.monitor_url(url)
            results.append(result)
            
        return results
    
    def get_summary(self, results: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Generate summary of monitoring results including filtering statistics"""
        total_urls = len(results)
        successful_extractions = 0
        total_aids_before_filtering = 0
        total_aids_after_filtering = 0
        total_filtered_out = 0
        
        for result in results:
            normalized_data = result.get("normalized_data", {})
            memory_filtered_data = result.get("memory_filtered_data", {})
            
            if normalized_data.get("metadata", {}).get("status") == "success":
                successful_extractions += 1
                total_aids_before_filtering += len(normalized_data.get("aides", []))
            
            if memory_filtered_data.get("status") == "success":
                total_aids_after_filtering += len(memory_filtered_data.get("aides", []))
                total_filtered_out += memory_filtered_data.get("filtered_count", 0)
        
        return {
            "total_urls_monitored": total_urls,
            "successful_extractions": successful_extractions,
            "total_aids_before_filtering": total_aids_before_filtering,
            "total_aids_after_filtering": total_aids_after_filtering,
            "total_filtered_out": total_filtered_out,
            "filtering_effectiveness": total_filtered_out / total_aids_before_filtering if total_aids_before_filtering > 0 else 0,
            "success_rate": successful_extractions / total_urls if total_urls > 0 else 0,
            "timestamp": datetime.now().isoformat()
        }