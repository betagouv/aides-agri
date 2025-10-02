from typing import List
from pydantic import BaseModel, Field, ConfigDict

from data_extraction.prompts.geography_prompts import PROMPT_CARTOGRAPHIE_FRANCE

class EligibiliteGeographique(BaseModel):
    
    zones_eligibles: List[str] | None = Field(
        None,
        title="Zones géographiques éligibles",
        description="Les zones géographiques éligibles à l'aide.",
        examples=[
            "région Auvergne Rhône-Alpes", 
            "département des Hautes-Alpes",
            "ville de Caen",
        ]
    )
    zones_exclues: List[str] | None = Field(
        None,
        title="Zones géographiques exclues",
        description="Les zones géographiques éligibles à l'aide.",
        examples=[
            "région Auvergne Rhône-Alpes", 
            "département des Hautes-Alpes",
            "ville de Caen",
        ]
    )

    model_config = ConfigDict(
        title="Eligibilité géographique",
        json_schema_extra={
            "description": (
                "Couverture géographique de l’aide : zones éligibles et exclusions éventuelles. "
                "Une zone géographique peut être :\n- Le pays entier (France)\n- Une région\n- Un département\n- Un EPCI\n- Une commune\n\n"
                + PROMPT_CARTOGRAPHIE_FRANCE
            )
        }
    )