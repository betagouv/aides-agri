from datetime import date
from pydantic import BaseModel, Field

class Dates(BaseModel):
  
  date_ouverture: date | None = Field(
      ...,
      title="Date d’ouverture",
      description="Date de début de dépôt des candidatures, à partir de laquelle les agriculteurs peuvent transmettre leurs informations en vue de bénéficier de l’aide.",
      examples=["2025-10-15"]
  )

  date_cloture: date | None = Field(
      ...,
      title="Date de fin",
      description="Date après laquelle les candidatures ne sont plus acceptées et les agriculteurs ne peuvent plus transmettre leurs informations pour bénéficier de l’aide.",
      examples=["2027-09-11"]
  )