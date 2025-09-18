JSON_SCHEMA = {
  "name": "Dispositif d'aide",
  "strict": True,
  "schema": {
    "type": "object",
    "properties": {
      "titre": {
        "type": "string",
        "title": "Titre",
        "description": "Titre court, nom commercial du dispositif.",
        "maxLength": 100,
        "example": "Accélérateur décarbonation"
      },
      "description": {
        "type": "string",
        "title": "Description",
        "description": "Description juridique et exacte du dispositif mis en place.",
        "maxLength": 5000,
        "example": "Le Futsal fait l'objet aujourd'hui d'un véritable plan de développement à la FFF..."
      },
      "eligibilite": {
        "type": "array",
        "items": { "type": "string" },
        "title": "Critères d’éligibilité",
        "description": """Liste des critères d’éligibilité permettant à quelqu'un de bénéficier du disposifif d'aides.""",
        "example": "assistance"
      },
      "types_aides": {
        "description": """
          Liste des critères d’éligibilité permettant à quelqu'un de bénéficier du disposifif d'aides. Chaque type d'aide appartient à une de ces catégories :
          - assistance : services de remplacement, cellule d'écoute. 
          - avantage fiscal : crédits d'impôt, réduction d'impôt et autres allégements
          - conseil : accompagnement, échange avec un expert, ingenieurie
          - étude : diagnostic, accompagnement, étude faisabilité
          - financement : subvention, co-financement, participation financière à votre projet
          - formation : montée en compétences pour le/la chef d'entreprise ou les salariés
          - information : légales, administratives
          - prêt : prêt, garantie par un acteur public
        """,
        "type": "array",
        "items": {
          "type": "string",
          "enum": [
            "assistance",
            "avantage fiscal",
            "conseil",
            "étude",
            "financement",
            "formation",
            "information",
            "prêt"
          ]
        },
        "example": "financement"
      },
      "porteurs": {
        "type": "array",
        "title": "Porteurs",
        "description": "Liste des acteurs impliqués dans la mise en oeuvre du dispositif ainsi que leurs rôles.",
        "items": {
          "type": "object",
          "properties": {
            "nom": { "type": "string" },
            "roles": {
              "type": "array",
              "items": {
                "type": "string",
                "enum": ["diffuseur", "financeur", "instructeur"]
              }
            }
          },
          "required": ["nom", "roles"]
        },
        "example": [
          { "nom": "ADEME", "roles": ["instructeur"] },
          { "nom": "BPIFRANCE (BPIFRANCE)", "roles": ["financeur"] }
        ]
      },
      "programmes_parents": {
        "type": "string",
        "title": "Programmes parents et régime d'aides",
        "description": "Programmes parents et régimes d'aides auxquels appartient le dispositif.",
        "example": "Fonds Chaleur|Fonds vert 2024"
      },
      "url_source": {
        "type": "string",
        "title": "URL Source",
        "description": "Lien permettant d'obtenir plus d'informations sur le dispositif.",
        "pattern": "^(https?://).+",
        "example": "https://agirpourlatransition.ademe.fr/entreprises/aides-financieres/2023/audit-energetique-industrie"
      },
      "cibles": {
        "type": "array",
        "items": { "type": "string" },
        "title": "Bénéficiaires",
        "description": "Catégories de bénéficiaires ciblés par le dispositif.",
        "example": ["professionnels", "associations"]
      },
      "eligibilite_geographique": {
        "type": "string",
        "title": "Couverture géographique de l’aide",
        "description": "Couverture géographique du dispositif."
      },
      "eligibilite_geographique_exclusions": {
        "type": "string",
        "title": "Couverture géographique de l’aide - exclusions",
        "description": "Aires géographiques exclues du dispositif. 5 caractères maximum."
      },
      "date_ouverture": {
        "type": "string",
        "format": "date-time",
        "title": "Date d’ouverture",
        "description": "Date d'ouverture du dispositif d'aides.",
        "example": "2025-10-15T15:00:00Z"
      },
      "date_cloture": {
        "type": "string",
        "format": "date-time",
        "title": "Date de fin",
        "description": "Date de clôture du dispositif d'aides.",
        "example": "2025-10-15T15:00:00Z"
      },
      "date_mise_a_jour": {
        "type": "string",
        "format": "date-time",
        "title": "Date de dernière mise à jour",
        "description": "Dernière date de mise à jour de l’aide dans les données.",
        "example": "2025-10-15T15:00:00Z"
      }
    },
    "required": [
      "titre",
      "description",
      "eligibilite",
      "types_aides",
      "porteurs",
      "cibles",
      "eligibilite_geographique",
      "date_mise_a_jour"
    ]
  }
}

