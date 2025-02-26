fake_siret = "12345678901234"

fake_api_response_one_hit = """
{"results": [
    {"siren": "123456789",
      "nom_complet": "MON ENTREPRISE",
      "nom_raison_sociale": "MON ENTREPRISE",
      "sigle": null,
      "nombre_etablissements": 1,
      "nombre_etablissements_ouverts": 1,
      "activite_principale": "01.11Z",
      "categorie_entreprise": null,
      "caractere_employeur": null,
      "annee_categorie_entreprise": null,
      "date_creation": "2025-01-01",
      "date_fermeture": null,
      "date_mise_a_jour": "2025-01-01T00:00:00",
      "date_mise_a_jour_insee": "2025-01-01T00:00:00",
      "date_mise_a_jour_rne": "2025-01-01T00:00:00",
      "etat_administratif": "A",
      "nature_juridique": "5499",
      "section_activite_principale": "G",
      "tranche_effectif_salarie": null,
      "annee_tranche_effectif_salarie": null,
      "statut_diffusion": "O",
      "matching_etablissements": [
        {"activite_principale": "01.11Z",
          "ancien_siege": false,
          "annee_tranche_effectif_salarie": null,
          "adresse": "78 RUE DE VARENNE 75007 PARIS",
          "caractere_employeur": "O",
          "code_postal": "75007",
          "commune": "75001",
          "date_creation": "2025-01-01",
          "date_debut_activite": "2025-01-01",
          "date_fermeture": null,
          "epci": "123456789",
          "est_siege": true,
          "etat_administratif": "A",
          "geo_id": "",
          "latitude": "",
          "libelle_commune": "PARIS",
          "liste_enseignes": null,
          "liste_finess": null,
          "liste_id_bio": null,
          "liste_idcc": null,
          "liste_id_organisme_formation": null,
          "liste_rge": null,
          "liste_uai": null,
          "longitude": "",
          "nom_commercial": null,
          "region": "1",
          "siret": "12345678901234",
          "statut_diffusion_etablissement": "O",
          "tranche_effectif_salarie": null
        }
      ]
    }
  ],
  "total_results": 1,
  "page": 1,
  "per_page": 10,
  "total_pages": 1
}
"""


fake_api_response_no_hit = """
{"results":[],"total_results":0,"page":1,"per_page":10,"total_pages":0}
"""
