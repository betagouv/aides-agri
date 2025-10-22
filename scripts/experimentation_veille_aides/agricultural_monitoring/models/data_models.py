"""Data models for agricultural monitoring workflow."""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class AideAgricole(BaseModel):
    """Model for agricultural aid information"""
    titre_aide: str = Field(..., description="Le titre de l'aide agricole.")
    description: str = Field(..., description="Une description courte de l'aide agricole.")
    date: Optional[str] = Field(default=None, description="La date de publication de l'aide, si elle est disponible.")
    source_url: str = Field(..., description="L'URL direct vers la page de l'aide.")
    
    class Config:
        schema_extra = {
            "example": {
                "titre_aide": "Aide à l'installation des jeunes agriculteurs",
                "description": "Soutien financier pour faciliter l'installation des jeunes dans l'agriculture",
                "date": "15 octobre 2025",
                "source_url": "https://agriculture.gouv.fr/aide-installation-jeunes"
            }
        }

class AideAgricoleLeger(BaseModel):
    """Model for agricultural aid information"""
    titre_aide: str = Field(..., description="Le titre de l'aide agricole.")
    description: str = Field(..., description="Une description courte de l'aide agricole.")

class AideAgricoleLegerResponse(BaseModel):
    """Response model containing list of agricultural aids"""
    aides: List[AideAgricoleLeger] = Field(..., description="La liste des aides trouvées.")
    metadata: Dict[str, Any] = Field(default_factory=dict, description="Métadonnées sur l'extraction")


class AidesAgricolesResponse(BaseModel):
    """Response model containing list of agricultural aids"""
    aides: List[AideAgricole] = Field(..., description="La liste des aides agricoles trouvées.")
    metadata: Dict[str, Any] = Field(default_factory=dict, description="Métadonnées sur l'extraction")


class WebExtractionResult(BaseModel):
    """Model for web extraction results"""
    url: str
    title: str
    content: str
    status: str
    extracted_at: str
    links_count: Optional[int] = None
    extraction_method: Optional[str] = None
    structured_links: Optional[List[Dict[str, str]]] = None
    error: Optional[str] = None


class LLMProcessingResult(BaseModel):
    """Model for LLM processing results"""
    status: str
    content: Optional[str] = None
    aides_identifiees: Optional[List[Dict[str, Any]]] = None
    resume: Optional[str] = None
    error: Optional[str] = None
    token_usage: Optional[Dict[str, Any]] = None


class MemoryFilteringResult(BaseModel):
    """Model for memory filtering results"""
    status: str
    aides: List[Dict[str, Any]]
    filtered_count: int
    new_count: int
    filtering_summary: Optional[str] = None
    articles_filtres: Optional[List[Dict[str, str]]] = None
    error: Optional[str] = None