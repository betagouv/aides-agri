from pydantic import BaseModel, Field

class InformationsExternes(BaseModel):

  programmes_parents: str | None = Field(
      ...,
      title="Programmes parents et régime d'aides",
      description="""
          La plupart des dispositifs d’aides aux agriculteurs font partie d’une initiative globale, que l’on appelle un programme. Le programme parent est le nom du programme auquel appartient un dispositif. 
          Par exemple : L’aide de l’ADEME fait partie du programme Fonds Chaleur. Le programme parent de l’aide ADEME est alors “Fonds Chaleur”.
          Ces programmes disposent d’un budget défini par des politiques publiques pour atteindre, de différentes manières, un objectif global (la relance économique, la baisse des émissions de gaz à effet de serre, etc.). 
      """,
      examples=[
          "Fonds Chaleur",
          "Fonds vert 2024",
          "Action cœur de ville (2018-2022)",
          "UE - Europe Créative 2021-2027",
          "Territoires d'industrie"
      ]
  )

  url_source: str | None = Field(
      ...,
      title="URL Source",
      description="Lien permettant d'obtenir plus d'informations sur le dispositif.",
      examples=["https://agirpourlatransition.ademe.fr/entreprises/aides-financieres/2023/audit-energetique-industrie"],
      pattern=r"^https?://[^\s]+$"
  )