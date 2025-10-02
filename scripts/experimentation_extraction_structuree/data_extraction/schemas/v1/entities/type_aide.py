from typing import List
from pydantic import BaseModel, Field

from data_extraction.schemas.v1.enums.type_aide_enum import TypeAideEnum

class TypeAide(BaseModel):

  types_aides: List[TypeAideEnum] | None = Field(
      ...,
      description="""
      Types d'aides disponibles via le dispositif décrit. Chaque aide appartient à une des catégories suivantes :
        - assistance : services de remplacement, cellule d'écoute. 
        - avantage fiscal : crédits d'impôt, réduction d'impôt et autres allégements
        - conseil : accompagnement, échange avec un expert, ingenieurie
        - étude : diagnostic, accompagnement, étude faisabilité
        - financement : subvention, co-financement, participation financière à votre projet
        - formation : montée en compétences pour le/la chef d'entreprise ou les salariés
        - information : légales, administratives
        - prêt : prêt, garantie par un acteur public
        Attention : La liste ne doit pas contenir 2 fois la même catégorie.
        Exemple d'une réponse attendue : ["assistance", "avantage fiscal", "financement"]
        Exemple à ne pas suivre : ["assistance", "assistance", "financement"]
      """
  )