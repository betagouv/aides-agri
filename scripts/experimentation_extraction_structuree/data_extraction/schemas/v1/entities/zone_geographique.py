from typing import List
from pydantic import BaseModel, Field

from data_extraction.prompts.geography_prompts import PROMPT_CARTOGRAPHIE_FRANCE

class EligibiliteGeographique(BaseModel):
    f"""
    Couverture géographique de l’aide : zones éligibles et exclusions éventuelles. Une zone géographique peut être :
    Ça peut être :
        - Le pays entier (France). Il s’agit de la plus large unité géographique et administrative. La France est composée de régions, départements, communes et autres subdivisions administratives.
        - une région. C’est la granularité intermédiaire entre le pays et le département.
        - un département. C’est la granularité intermédiaire entre la région et la commune. Chaque département est associé à un nombre unique entre 01 et 95 pour la France métropolitaine, et les départements d’outre-mer disposent de numéros spécifiques à trois chiffres (971 à 976).
        - un établissement public de coopération intercommunale (EPCI). C’est une structure administrative qui regroupe plusieurs communes. C’est le niveau intermédiaire entre le département et la commune.
        - une commune. C’est la plus petite division administrative. Des mots équivalents sont ville, village, métropole, bourg, agglomération.

    {PROMPT_CARTOGRAPHIE_FRANCE}
    """
    
    zones_eligibles: List[str] | str | None = Field(
        None,
        title="Zones géographiques éligibles",
        description="Les zones géographiques éligibles à l'aide.",
        examples=[
            "région Auvergne Rhône-Alpes", 
            "département des Hautes-Alpes",
            "ville de Caen",
        ]
    )
    zones_exclues: List[str] | str | None = Field(
        None,
        title="Zones géographiques exclues",
        description="Aires géographiques exclues du dispositif.",
        examples=[
            "région Auvergne Rhône-Alpes", 
            "département des Hautes-Alpes",
            "ville de Caen",
        ]
    )