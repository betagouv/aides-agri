"""Data normalizer for converting LLM output to structured format."""

from typing import Dict, Any, List
from datetime import datetime
from langchain_core.output_parsers import PydanticOutputParser

from ..models.data_models import AideAgricole, AidesAgricolesResponse
from ..monitoring.tracing import trace_step


class DataNormalizer:
    """Normalizes LLM output data to structured schema"""
    
    def __init__(self):
        self.parser = PydanticOutputParser(pydantic_object=AidesAgricolesResponse)
    
    @trace_step("data_normalization")
    def normalize_data(self, llm_result: Dict[str, Any], source_url: str) -> Dict[str, Any]:
        """Normalize LLM output data to AideAgricole schema"""
        if llm_result.get("status") != "success":
            return {
                "aides": [],
                "metadata": {
                    "status": "failed",
                    "reason": "LLM processing failed",
                    "source_url": source_url,
                    "processing_date": datetime.now().isoformat(),
                    "count": 0
                }
            }
        
        try:
            aides_raw = llm_result.get("aides_identifiees", [])
            normalized_aides = []
            
            for aide_raw in aides_raw:
                try:
                    # Create AideAgricole instance with validation
                    aide = AideAgricole(
                        titre_aide=aide_raw.get("titre", "").strip(),
                        description=aide_raw.get("description", "").strip(),
                        date=aide_raw.get("date_publication"),
                        source_url=aide_raw.get("url_specifique", source_url)
                    )
                    
                    # Only include aids with sufficient information
                    if aide.titre_aide and aide.description:
                        normalized_aides.append(aide.model_dump())
                        
                except Exception as e:
                    print(f"⚠️  Error normalizing aide: {e}")
                    continue
            
            return {
                "aides": normalized_aides,
                "metadata": {
                    "status": "success",
                    "total_found": len(normalized_aides),
                    "source_url": source_url,
                    "processing_date": datetime.now().isoformat(),
                    "resume": llm_result.get("resume", ""),
                    "count": len(normalized_aides)
                }
            }
            
        except Exception as e:
            print(f"❌ Error in data normalization: {e}")
            return {
                "aides": [],
                "metadata": {
                    "status": "error",
                    "error": str(e),
                    "source_url": source_url,
                    "processing_date": datetime.now().isoformat(),
                    "count": 0
                }
            }