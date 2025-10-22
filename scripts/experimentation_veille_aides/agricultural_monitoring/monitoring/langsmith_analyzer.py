"""Langfuse analyzer for monitoring workflow performance (replaces LangSmith)."""

from typing import Dict, Any, List, Optional
from datetime import datetime

try:
    from langfuse import Langfuse
except Exception:  # pragma: no cover
    Langfuse = None  # type: ignore

from ..config.settings import (
    LANGFUSE_PUBLIC_KEY,
    LANGFUSE_SECRET_KEY,
    LANGFUSE_HOST,
    LANGFUSE_PROJECT,
)


class LangfuseAnalyzer:
    """Analyze workflow performance using Langfuse traces."""

    def __init__(self, client: Optional[Any] = None):  # type: ignore[valid-type]
        self.client = client
        if not self.client and Langfuse and LANGFUSE_PUBLIC_KEY and LANGFUSE_SECRET_KEY:
            try:
                self.client = Langfuse(
                    public_key=LANGFUSE_PUBLIC_KEY,
                    secret_key=LANGFUSE_SECRET_KEY,
                    host=LANGFUSE_HOST,
                )
                print("✅ Langfuse client initialized")
            except Exception as e:  # pragma: no cover
                print(f"⚠️  Could not initialize Langfuse client: {e}")
                self.client = None

    def log_workflow_run(self, results: List[Dict[str, Any]], run_type: str = "batch_monitoring") -> Optional[Dict[str, Any]]:
        """Log a complete workflow run to Langfuse as a trace with spans per URL."""
        if not self.client:
            print("⚠️  Langfuse client not available for logging")
            return None

        try:
            trace_method = getattr(self.client, "trace", None)
            if not callable(trace_method):
                print("⚠️ Langfuse client missing 'trace' method; skipping logging.")
                return None
            trace = trace_method(
                name=f"agri_monitoring_batch_{run_type}",
                input={"total_urls": len(results)},
                tags=["agri_monitoring", run_type, LANGFUSE_PROJECT],
            )

            summary = {
                "total_urls": len(results),
                "successful_extractions": sum(1 for r in results if r.get('normalized_data', {}).get('metadata', {}).get('status') == 'success'),
                "total_aids_found": sum(len(r.get('normalized_data', {}).get('aides', [])) for r in results),
                "timestamp": datetime.now().isoformat(),
            }

            for result in results:
                url = result.get('web_content', {}).get('url', 'unknown')
                status = result.get('normalized_data', {}).get('metadata', {}).get('status', 'unknown')
                aids_count = len(result.get('normalized_data', {}).get('aides', []))
                span_method = getattr(trace, "span", None)
                if callable(span_method):
                    span_obj = span_method(name="url_monitoring", input={"url": url})
                    end_method = getattr(span_obj, "end", None)
                    if callable(end_method):
                        end_method(output={"status": status, "aids_count": aids_count})

            end_trace = getattr(trace, "end", None)
            if callable(end_trace):
                end_trace(output=summary)
            return summary
        except Exception as e:
            print(f"❌ Error logging to Langfuse: {e}")
            return None

    def get_performance_metrics(self, project_name: Optional[str] = None) -> Dict[str, Any]:
        """Placeholder for retrieving performance metrics (manual via Langfuse UI)."""
        project = project_name or LANGFUSE_PROJECT
        if not self.client:
            print("⚠️  Langfuse client not available")
            return {}

        # Langfuse metrics exploration is typically done in dashboard; provide stub.
        print(f"📊 Metrics can be explored in Langfuse project: {project}")
        return {
            "project": project,
            "metrics_available": True,
            "note": "Access Langfuse dashboard for detailed metrics",
        }


def run_monitored_workflow(workflow, urls: List[str]) -> Dict[str, Any]:
    """Run a workflow with Langfuse monitoring."""
    print("🔍 Running monitored workflow...")
    analyzer = LangfuseAnalyzer()

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
                'success_rate': len([r for r in all_results if r.get('normalized_data', {}).get('metadata', {}).get('status') == 'success']) / len(urls) if urls else 0,
            },
        }

    analyzer.log_workflow_run(all_results, "production_monitoring")

    print(f"\n📊 MONITORING COMPLETED")
    print(f"✅ Successful: {results['summary']['successful']}")
    print(f"❌ Failed: {results['summary']['failed']}")
    print(f"📈 Success Rate: {results['summary']['success_rate']:.2%}")

    if results['successful_results']:
        print(f"\n✅ SUCCESSFUL EXTRACTIONS:")
        for result in results['successful_results']:
            url = result['web_content']['url']
            aids_count = len(result['normalized_data']['aides'])
            print(f"   {url}: {aids_count} aids found")

    if results['failed_results']:
        print(f"\n❌ FAILED EXTRACTIONS:")
        for result in results['failed_results']:
            url = result.get('url', result.get('web_content', {}).get('url', 'unknown'))
            error = result.get('error', result.get('normalized_data', {}).get('metadata', {}).get('error', 'Unknown error'))
            print(f"   {url}: {error}")

    return results