from typing import List
from pydantic import BaseModel, Field

class Beneficiaire(BaseModel):

      beneficiaire: List[str] | None = Field(
        ...,
        title="Bénéficiaires",
        description="""
            A partir des critères d'éligibilités, détermine les catégories de personnes qui peuvent bénéficier de l'aide. 
            Il peut s'agir de conditions d'intégration ou d'exclusion. Ces conditions peuvent concerner l'agriculteur, son exploitation ou son entreprise. 
            Par exemple :
                - limite d’âge pour l’agriculteur, 
                - une tranche d’âge pour son exploitation,
                - la forme juridique de l'exploitation : agriculteurs, coopératives (Cuma, SCA, SICA), ou d’autres formes de regroupements (ASA, GIEE)
                - la situation financière de l'exploitation ou d'un agriculteur,
                - ...
        """,
        examples=[
            ["agriculteurs en dessous de 45 ans", "coopératives sous la forme SICA"],
            ["titulaires d'un diplome agricole"]
        ]
    )