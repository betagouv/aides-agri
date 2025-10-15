"""LangSmith analyzer for monitoring workflow performance."""

from typing import Dict, Any, List, Optional
from datetime import datetime
from langsmith import Client, traceable
import langsmith

from ..config.settings import LANGSMITH_API_KEY, LANGSMITH_PROJECT


class LangSmithAnalyzer:
    """Analyze workflow performance using LangSmith data"""
    
    def __init__(self, client: Optional[Client] = None):
        self.client = client
        if not self.client and LANGSMITH_API_KEY:
            try:
                self.client = Client(api_key=LANGSMITH_API_KEY)
                print("✅ LangSmith client initialized")
            except Exception as e:
                print(f"⚠️  Could not initialize LangSmith client: {e}")
                self.client = None
    
    def log_workflow_run(self, results: List[Dict[str, Any]], run_type: str = "batch_monitoring") -> Optional[Dict[str, Any]]:
        """Log a complete workflow run to LangSmith"""
        if not self.client:
            print("⚠️  LangSmith client not available for logging")
            return None
        
        try:
            # Create a run for the batch operation
            with langsmith.trace(name=f"agricultural_monitoring_batch_{run_type}"):
                summary = {
                    "total_urls": len(results),
                    "successful_extractions": sum(1 for r in results if r.get('normalized_data', {}).get('metadata', {}).get('status') == 'success'),
                    "total_aids_found": sum(len(r.get('normalized_data', {}).get('aides', [])) for r in results),
                    "timestamp": datetime.now().isoformat()
                }
                
                # Log each URL result
                for result in results:
                    url = result.get('web_content', {}).get('url', 'unknown')
                    status = result.get('normalized_data', {}).get('metadata', {}).get('status', 'unknown')
                    aids_count = len(result.get('normalized_data', {}).get('aides', []))
                    
                    @traceable(name="url_monitoring", metadata={"step": "url_monitoring"})
                    def monitor_url_trace(url: str, status: str, aids_count: int) -> Dict[str, Any]:
                        print(f"Monitoring {url} - Status {status} - AIDs found: {aids_count}")
                        return {"url": url, "status": status, "aids_count": aids_count}
                    
                    monitor_url_trace(url, status, aids_count)
                
                return summary
                
        except Exception as e:
            print(f"❌ Error logging to LangSmith: {e}")
            return None
    
    def get_performance_metrics(self, project_name: Optional[str] = None) -> Dict[str, Any]:
        """Retrieve performance metrics from LangSmith"""
        project = project_name or LANGSMITH_PROJECT
        
        if not self.client:
            print("⚠️  LangSmith client not available")
            return {}
        
        try:
            # This is a simplified example - actual implementation would depend on LangSmith API
            print(f"📊 Performance metrics would be retrieved from project: {project}")
            print("   - Average execution time per URL")
            print("   - Success rates by step")
            print("   - Error patterns and frequencies")
            print("   - LLM token usage statistics")
            
            return {
                "project": project,
                "metrics_available": True,
                "note": "Access LangSmith dashboard for detailed metrics"
            }
            
        except Exception as e:
            print(f"❌ Error retrieving metrics: {e}")
            return {}


def run_monitored_workflow(workflow, urls: List[str]) -> Dict[str, Any]:
    """Run a workflow with LangSmith monitoring"""
    print("🔍 Running monitored workflow...")
    
    # Initialize analyzer
    analyzer = LangSmithAnalyzer()
    
    # Run enhanced workflow with error recovery
    if hasattr(workflow, 'monitor_with_error_recovery'):
        results = workflow.monitor_with_error_recovery(urls)
        all_results = results['successful_results'] + results['failed_results']
    else:
        all_results = workflow.monitor_multiple_urls(urls)
        results = {
            'successful_results': [r for r in all_results if r.get('normalized_data', {}).get('metadata', {}).get('status') == 'success'],
            'failed_results': [r for r in all_results if r.get('normalized_data', {}).get('metadata', {}).get('status') != 'success'],
            'summary': {
                'total_urls': len(urls),
                'successful': len([r for r in all_results if r.get('normalized_data', {}).get('metadata', {}).get('status') == 'success']),
                'failed': len([r for r in all_results if r.get('normalized_data', {}).get('metadata', {}).get('status') != 'success']),
                'success_rate': len([r for r in all_results if r.get('normalized_data', {}).get('metadata', {}).get('status') == 'success']) / len(urls) if urls else 0
            }
        }
    
    # Log to LangSmith
    analyzer.log_workflow_run(all_results, "production_monitoring")
    
    # Display results
    print(f"\n📊 MONITORING COMPLETED")
    print(f"✅ Successful: {results['summary']['successful']}")
    print(f"❌ Failed: {results['summary']['failed']}")
    print(f"📈 Success Rate: {results['summary']['success_rate']:.2%}")
    
    # Show successful extractions
    if results['successful_results']:
        print(f"\n✅ SUCCESSFUL EXTRACTIONS:")
        for result in results['successful_results']:
            url = result['web_content']['url']
            aids_count = len(result['normalized_data']['aides'])
            print(f"   {url}: {aids_count} aids found")
    
    # Show failures
    if results['failed_results']:
        print(f"\n❌ FAILED EXTRACTIONS:")
        for result in results['failed_results']:
            url = result.get('url', result.get('web_content', {}).get('url', 'unknown'))
            error = result.get('error', result.get('normalized_data', {}).get('metadata', {}).get('error', 'Unknown error'))
            print(f"   {url}: {error}")
    
    return results