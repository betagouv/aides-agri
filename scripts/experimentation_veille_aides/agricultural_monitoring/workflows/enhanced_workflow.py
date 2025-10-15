"""Enhanced agricultural monitoring workflow with inline link preservation."""

import time
from typing import Dict, Any, List, Optional
from datetime import datetime

from ..extractors.enhanced_extractor import EnhancedWebContentExtractor
from ..processors.llm_processor import LLMProcessor
from ..processors.normalizer import DataNormalizer
from ..processors.memory_filter import MemoryBasedFilter
from ..models.data_models import AidesAgricolesResponse
from ..config.settings import WORKFLOW_MAX_RETRIES, WORKFLOW_RETRY_DELAY
from ..monitoring.tracing import trace_step


class EnhancedAgriculturalMonitoringWorkflow:
    """Enhanced workflow with improved error handling and retry capabilities"""
    
    def __init__(self, max_retries: Optional[int] = None, retry_delay: Optional[int] = None):
        self.max_retries = max_retries or WORKFLOW_MAX_RETRIES
        self.retry_delay = retry_delay or WORKFLOW_RETRY_DELAY
        
        self.web_extractor = EnhancedWebContentExtractor()
        self.llm_processor = LLMProcessor()
        self.normalizer = DataNormalizer()
        self.memory_filter = MemoryBasedFilter(llm=self.llm_processor.llm)
    
    @trace_step("enhanced_url_monitoring")
    def monitor_url(self, url: str) -> Dict[str, Any]:
        """Monitor a single URL with enhanced inline link processing"""
        print(f"🔍 Starting enhanced monitoring workflow for: {url}")
        
        try:
            # Step 1: Enhanced web extraction with inline links
            web_content = self.web_extractor.extract_content(url)
            
            if web_content["status"] != "success":
                return self._create_error_result(url, "Web extraction failed", web_content.get("error", "Unknown error"))
            
            # Step 2: LLM processing
            llm_result = self.llm_processor.process_content(web_content)
            
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
    
    def monitor_url_with_retry(self, url: str) -> Dict[str, Any]:
        """Monitor URL with retry logic for failed operations"""
        last_error = None
        
        for attempt in range(self.max_retries + 1):
            try:
                if attempt > 0:
                    print(f"⏳ Retrying {url} (attempt {attempt + 1}/{self.max_retries + 1})")
                    time.sleep(self.retry_delay)
                
                result = self.monitor_url(url)
                
                # Check if the result is successful
                if (result['web_content']['status'] == 'success' and 
                    result['llm_extraction']['status'] == 'success'):
                    return result
                
                # If not successful, consider it a failure for retry
                last_error = f"Workflow failed at step: {self._get_failure_point(result)}"
                
            except Exception as e:
                last_error = str(e)
                print(f"❌ Attempt {attempt + 1} failed: {e}")
        
        # All retries exhausted
        print(f"❌ All retry attempts exhausted for {url}")
        return self._create_error_result(
            url, 
            "Max retries exceeded", 
            f"{last_error} (retries: {self.max_retries})"
        )
    
    def _get_failure_point(self, result: Dict[str, Any]) -> str:
        """Identify where the workflow failed"""
        if result['web_content']['status'] != 'success':
            return "web_extraction"
        elif result['llm_extraction']['status'] != 'success':
            return "llm_processing"
        elif result['normalized_data']['metadata']['status'] != 'success':
            return "normalization"
        else:
            return "unknown"
    
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
    
    def monitor_with_error_recovery(self, urls: List[str]) -> Dict[str, Any]:
        """Monitor URLs with comprehensive error recovery"""
        successful_results = []
        failed_results = []
        
        for url in urls:
            try:
                result = self.monitor_url_with_retry(url)
                
                if result['normalized_data']['metadata']['status'] == 'success':
                    successful_results.append(result)
                else:
                    failed_results.append(result)
                    
            except Exception as e:
                print(f"❌ Critical error processing {url}: {e}")
                failed_results.append({
                    "url": url,
                    "error": str(e),
                    "status": "critical_error"
                })
        
        return {
            "successful_results": successful_results,
            "failed_results": failed_results,
            "summary": {
                "total_urls": len(urls),
                "successful": len(successful_results),
                "failed": len(failed_results),
                "success_rate": len(successful_results) / len(urls) if urls else 0
            }
        }
    
    def monitor_multiple_urls(self, urls: List[str]) -> List[Dict[str, Any]]:
        """Monitor multiple URLs (compatibility method)"""
        recovery_result = self.monitor_with_error_recovery(urls)
        return recovery_result["successful_results"] + recovery_result["failed_results"]
    
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