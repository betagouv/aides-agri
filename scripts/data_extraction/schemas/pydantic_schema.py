from typing import List, Literal
from datetime import datetime
from pydantic import BaseModel, Field, HttpUrl

class Porteur(BaseModel):
    nom: str = Field(..., description="Nom de l'acteur impliqué.")
    roles: List[Literal["diffuseur", "financeur", "instructeur"]] = Field(
        ...,
        description="Rôles joués par ce porteur dans le dispositif"
    )


class DispositifAide(BaseModel):
    titre: str = Field(
        ...,
        title="Titre",
        description="Titre court, nom commercial du dispositif.",
        max_length=100,
        examples=["Accélérateur décarbonation"]
    )

    description: str = Field(
        ...,
        title="Description",
        description="Description juridique et exacte du dispositif mis en place.",
        max_length=5000,
        examples=[
            "Le Futsal fait l'objet aujourd'hui d'un véritable plan de développement à la FFF..."
        ]
    )

    eligibilite: List[str] = Field(
        ...,
        title="Critères d’éligibilité",
        description="Liste des critères d’éligibilité permettant à quelqu'un de bénéficier du dispositif d'aides.",
        examples=[["assistance", "PME industrielles"]]
    )

    types_aides: List[
        Literal[
            "assistance",
            "avantage fiscal",
            "conseil",
            "étude",
            "financement",
            "formation",
            "information",
            "prêt"
        ]
    ] = Field(
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
        """,
        examples=[["financement", "formation"]]
    )

    porteurs: List[Porteur] = Field(
        ...,
        title="Porteurs",
        description="Liste des acteurs impliqués dans la mise en œuvre du dispositif et leurs rôles.",
        examples=[
            [{"nom": "ADEME", "roles": ["instructeur"]},
             {"nom": "BPIFRANCE (BPIFRANCE)", "roles": ["financeur"]}]
        ]
    )

    programmes_parents: str | None = Field(
        None,
        title="Programmes parents et régime d'aides",
        description="Programmes parents et régimes d'aides auxquels appartient le dispositif.",
        examples=["Fonds Chaleur|Fonds vert 2024"]
    )

    url_source: HttpUrl | None = Field(
        None,
        title="URL Source",
        description="Lien permettant d'obtenir plus d'informations sur le dispositif.",
        examples=["https://agirpourlatransition.ademe.fr/entreprises/aides-financieres/2023/audit-energetique-industrie"]
    )

    cibles: List[str] = Field(
        ...,
        title="Bénéficiaires",
        description="Catégories de bénéficiaires ciblés par le dispositif.",
        examples=[["professionnels", "associations"]]
    )

    eligibilite_geographique: str = Field(
        ...,
        title="Couverture géographique de l’aide",
        description="Couverture géographique du dispositif."
    )

    eligibilite_geographique_exclusions: str | None = Field(
        None,
        title="Couverture géographique de l’aide - exclusions",
        description="Aires géographiques exclues du dispositif. 5 caractères maximum.",
        max_length=5
    )

    date_ouverture: datetime | None = Field(
        None,
        title="Date d’ouverture",
        description="Date d'ouverture du dispositif d'aides.",
        examples=["2025-10-15T15:00:00Z"]
    )

    date_cloture: datetime | None = Field(
        None,
        title="Date de fin",
        description="Date de clôture du dispositif d'aides.",
        examples=["2025-10-15T15:00:00Z"]
    )

    date_mise_a_jour: datetime = Field(
        ...,
        title="Date de dernière mise à jour",
        description="Dernière date de mise à jour de l’aide dans les données.",
        examples=["2025-10-15T15:00:00Z"]
    )

