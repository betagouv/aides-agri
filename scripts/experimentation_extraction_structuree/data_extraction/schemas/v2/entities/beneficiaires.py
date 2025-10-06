from typing import List
from pydantic import BaseModel, Field

class Beneficiaire(BaseModel):

      beneficiaire: List[str] | None = Field(
        ...,
        title="Bénéficiaires"
    )