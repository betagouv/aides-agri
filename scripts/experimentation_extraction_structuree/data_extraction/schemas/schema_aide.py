from pydantic import BaseModel, Field

from .v1.entities import (
    EligibiliteGeographique,
    Dates,
)
from ..prompts.geography_prompts import PROMPT_CARTOGRAPHIE_FRANCE

class DispositifAideLeger(BaseModel):

    eligibilite_geographique: EligibiliteGeographique = Field(
        ...,
        title="Couverture géographique de l’aide",
        description=f"""
            Les zones géographiques éligibles ou non à l'aide. Une zone géographique peut être :
                - Le pays entier (France)
                - Une région
                - Un département
                - Un EPCI
                - Une commune
            Voici une liste des régions et des départements français pour t'aider : {PROMPT_CARTOGRAPHIE_FRANCE}
            """
    )

    dates: Dates = Field(
        ...,
        title="Dates relatives au dispositif.",
        description="Date d'ouverture et de clotûre du dispositif d'aides, au format YYYY-MM-DD."
    )

class Categorie(BaseModel):
    categorie : str = Field(title="Catégorie de classification")