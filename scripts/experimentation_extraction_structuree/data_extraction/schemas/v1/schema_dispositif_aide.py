from pydantic import BaseModel, Field

from .entities import (
    PresentationAide,
    Eligibilite,
    TypeAide,
    ListePorteurs,
    InformationsExternes,
    Beneficiaire,
    EligibiliteGeographique,
    Dates,
)

class DispositifAide(BaseModel):

    presentation_aide: PresentationAide = Field(
        ...,
        title="Présentation de l'aide",
        description="Titre et description du dispositif d'aide"
    )

    eligibilite: Eligibilite | None = Field(
        ...,
        title="Eligibilité de l'aide",
        description="Qui peut accéder au dispositif d'aide ? Quel projets sont ou ne sont pas éligibles ?",
    )

    types_aides: TypeAide | None = Field(
        ...,
        title="Type d'aide",
        description="Types d'aides disponibles via le dispositif décrit."
    )

    porteurs: ListePorteurs | None = Field(
        ...,
        title="Porteurs",
        description="Liste des acteurs impliqués dans la mise en œuvre du dispositif et leurs rôles."
    )

    informations_externes : InformationsExternes | None = Field(
        ...,
        title="Informations externes",
        description="Informations sur les programmes parents, ainsi que sur les liens pointants vers des ressources externes."
    )

    cibles: Beneficiaire | None = Field(
        ...,
        title="Bénéficiaires"
    )

    eligibilite_geographique: EligibiliteGeographique | None = Field(
        ...,
        title="Couverture géographique de l’aide",
        description="Les zones géographiques éligibles ou non à l'aide",
    )

    dates: Dates | None = Field(
        ...,
        title="Dates relatives au dispositif.",
        description="Date d'ouverture et de clotûre du dispositif d'aides, au format YYYY-MM-DD."
    )