from typing import List, Literal
from pydantic import BaseModel, Field, ConfigDict

from data_extraction.schemas.v1.enums.porteurs_enum import PORTEURS_ENUM

class Porteur(BaseModel):

  nom: Literal[*PORTEURS_ENUM] = Field(..., description="Nom de l'acteur impliqué.")
  roles: List[Literal["diffuseur", "financeur", "instructeur"]] = Field(
      ...,
      description="""
      Rôle(s) joué(s) par ce porteur dans le dispositif. Un acteur peut avoir un comme plusieurs rôles. Voici une desscription qui caractérise chacun des rôles :
      Diffuseur : 
        Rôle : Le diffuseur est responsable de la communication et de la promotion du dispositif auprès des publics cibles.
        Fonction principale : Il assure que l'information sur l'aide est accessible, compréhensible et visible pour les bénéficiaires potentiels.
        Exemples de tâches :
        • Publication sur des sites institutionnels ou partenaires.
        • Organisation de campagnes d'information ou de sensibilisation.
        • Animation de webinaires ou d'événements de présentation.

        Instructeur :
          Rôle : Le financeur est l'acteur qui mobilise les ressources financières nécessaires à la mise en œuvre du dispositif.
          Fonction principale : Il porte le budget, définit les modalités de financement, et peut suivre l'utilisation des fonds.
          Exemples de tâches :
          • Attribution des enveloppes budgétaires.
          • Versement des aides aux bénéficiaires ou aux opérateurs.
          • Suivi de l’exécution budgétaire et des engagements.

        Financeur :
          Rôle : Le financeur est l'acteur qui mobilise les ressources financières nécessaires à la mise en œuvre du dispositif.
          Fonction principale : Il porte le budget, définit les modalités de financement, et peut suivre l'utilisation des fonds.
          Exemples de tâches :
          • Attribution des enveloppes budgétaires.
          • Versement des aides aux bénéficiaires ou aux opérateurs.
          • Suivi de l’exécution budgétaire et des engagements.
      """
  )

  model_config = ConfigDict(
    title="Porteur",
    json_schema_extra={
        "description": (
              """
              Un porteur est un acteur institutionnel ou opérationnel impliqué dans la mise en œuvre d’un dispositif d’aide, dont le rôle peut varier selon sa fonction dans le cycle de vie du dispositif. Les porteurs peuvent être classés selon leur contribution spécifique :
                - Le diffuseur assure la communication et la promotion du dispositif auprès des publics cibles.
                - Le financeur mobilise les ressources financières nécessaires et peut suivre leur utilisation.
                - L’instructeur est chargé de l’analyse des demandes, de l’évaluation de l’éligibilité et du suivi administratif des dossiers.
              Cette information est rarement spécifiée dans les documents, ne remplissez ce champ que si vous êtes certain de la réponse.
              """
        )
    }
)

class ListePorteurs(BaseModel):

  liste_porteurs: List[Porteur] | None = Field(
    ...,
    title="Liste des porteurs.",
    description="Liste des porteurs impliqués dans le dispositif d'aides.",
    examples=[
      {
        "porteurs": [
          {
            "nom": "AGENCE DE L'EAU ADOUR GARONNE",
            "rôle": ["diffuseur", "instructeur"]
          },
                    {
            "nom": "SOCIETE SAINT VINCENT DE PAUL- CONSEIL DEPARTEMENTAL DE LOT ET GARONNE",
            "rôle": ["diffuseur", "financeur"]
          }
        ]
      },

      {
        "porteurs": [
          {
            "nom": "AGENCE DE L'EAU RHIN MEUSE",
            "rôle": ["financeur"]
          }
        ]
      }
    ]
  )