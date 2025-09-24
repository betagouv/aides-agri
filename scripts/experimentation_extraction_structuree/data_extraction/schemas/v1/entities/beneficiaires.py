from typing import List
from pydantic import BaseModel, Field

class Beneficiaire(BaseModel):

      beneficiaire: List[str] | None = Field(
        ...,
        title="Bénéficiaires",
        description="""
            Détermine à quels types d’agriculteurs cette aide est destinée. 
            S’agit-il de tous les agriculteurs en activité, y a-t-il une limite d’âge pour l’agriculteur, une tranche d’âge pour son exploitation ? 
            Ou bien l’aide est-elle réservée aux agriculteurs regroupés en coopératives (Cuma, SCA, SICA) ou d’autres formes de regroupements (ASA, GIEE) ?
        """,
        examples=[
            ["associations"],
            ["agriculteurs", "coopératives"],
            ["SICA"]
        ]
    )