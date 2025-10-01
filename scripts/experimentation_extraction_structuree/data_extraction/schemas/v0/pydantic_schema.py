from typing import List, Literal, Set
from datetime import datetime
from pydantic import BaseModel, Field

class Porteur(BaseModel):
    nom: str = Field(..., description="Nom de l'acteur impliqué.")
    roles: List[Literal["diffuseur", "financeur", "instructeur"]] = Field(
        ...,
        description="Rôle(s) joué(s) par ce porteur dans le dispositif. Attention : La liste de rôles ne doit pas contenir 2 fois la même catégorie."
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

    eligibilite: List[str] | None = Field(
        ...,
        title="Critères d’éligibilité",
        description="Ensemble des critères à remplir pour qu’une personne physique ou morale soit considéré comme recevable dans le cadre du dispositif. Ces conditions peuvent concerner le porteur du projet, les caractéristiques techniques de l’équipement, les délais de réalisation, ou encore l’usage prévu des installations.",
        examples=[
                    "Le porteur du projet doit être, soit un club affilié à la F.F.F., soit une collectivité locale en collaboration avec un club support affilié à la F.F.F",
                    "Le terrain doit être conforme au cahier des charges technique fédéral relatif à la réalisation d'un terrain de Futsal extérieur – Edition avril 2017",
                    "La date de commencement des travaux ne doit pas être antérieure de plus de 3 mois à celle du dépôt du dossier au District d'appartenance",
                    "L'équipement projeté doit être situé obligatoirement au sein d'un complexe sportif utilisé par le club support dont au moins une installation est classée au niveau 6 minimum ou adossé à un gymnase classé futsal 4 minimum équipé de deux vestiaires de minimum chacun 14 m2, douches et sanitaires avec un accès direct piétons",
                    "Le porteur de projet doit impérativement présenter un projet d'utilisation des installations envisagées dans le respect des attentes de la F.F.F.",
                    "Le maître d'ouvrage doit réaliser son opération dans un délai de 24 mois à compter de la date d'attribution de la subvention par le Bureau Exécutif de la Ligue du Football Amateur"
                ]
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
        ] | None
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
          Attention : La liste ne doit pas contenir 2 fois la même catégorie.
        """,
        examples=[["financement", "formation"]]
    )

    porteurs: List[Porteur] | None = Field(
        ...,
        title="Porteurs",
        description="Liste des acteurs impliqués dans la mise en œuvre du dispositif et leurs rôles.",
        examples=[
            [{"nom": "ADEME", "roles": ["instructeur"]},
             {"nom": "BPIFRANCE (BPIFRANCE)", "roles": ["financeur"]}]
        ]
    )

    programmes_parents: str | None = Field(
        ...,
        title="Programmes parents et régime d'aides",
        description="Programmes parents et régimes d'aides auxquels appartient le dispositif.",
        examples=[
            "Fonds Chaleur",
            "Fonds vert 2024"
        ]
    )

    url_source: str | None = Field(
        ...,
        title="URL Source",
        description="Lien permettant d'obtenir plus d'informations sur le dispositif.",
        examples=["https://agirpourlatransition.ademe.fr/entreprises/aides-financieres/2023/audit-energetique-industrie"]
    )

    cibles: List[str] = Field(
        ...,
        title="Bénéficiaires",
        description="Grandes catégories de bénéficiaires ciblés par le dispositif. Attention : La liste ne doit pas contenir 2 fois la même catégorie.",
        examples=[
            ["associations"],
            ["agriculteurs", "coopératives"]
        ]
    )

    eligibilite_geographique: str = Field(
        ...,
        title="Couverture géographique de l’aide",
        description="Couverture géographique du dispositif.",
        examples=[
            "région Auvergne Rhône-Alpes", 
            "département des Hautes-Alpes",
            "ville de Caen",
        ]
    )

    eligibilite_geographique_exclusions: str | None = Field(
        ...,
        title="Couverture géographique de l’aide - exclusions",
        description="Aires géographiques exclues du dispositif.",
        examples=[
            "région Auvergne Rhône-Alpes", 
            "département des Hautes-Alpes",
            "ville de Caen",
        ]
    )

    date_ouverture: str | None = Field(
        ...,
        title="Date d’ouverture",
        description="Date d'ouverture du dispositif d'aides.",
        examples=["2025-10-15T15:00:00Z"]
    )

    date_cloture: str | None = Field(
        ...,
        title="Date de fin",
        description="Date de clôture du dispositif d'aides.",
        examples=["2025-10-15T15:00:00Z"]
    )

    date_mise_a_jour: str | None = Field(
        ...,
        title="Date de dernière mise à jour",
        description="Dernière date de mise à jour de l’aide dans les données.",
        examples=["2025-10-15T15:00:00Z"]
    )

