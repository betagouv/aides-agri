import factory

from ..models import RawDataSchemaDispositifAide


class RawDataSchemaDispositifAideFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = RawDataSchemaDispositifAide

    titre = factory.Sequence(lambda n: f"Raw Demarche {n}")
    promesse = factory.Sequence(lambda n: f"Promesse {n}")
    description = factory.Sequence(lambda n: f"Description {n}")
    eligibilite = factory.Sequence(lambda n: f"Conditions d’éligibilité {n}")
    types_aides = ""
    porteurs = ""
    programmes_parents = ""
    referents_internes = ""
    url_source = ""
    cibles = ""
    eligibilite_geographique = ""
    eligibilite_geographique_exclusions = ""
    date_ouverture = None
    date_cloture = None
    date_mise_a_jour = None

    # schema étendu : entreprises
    base_juridique = []
    ciblage_secteur_activite = ""
    ciblage_naf = ""
    ciblage_naf_exclusions = ""
    eligibilite_effectif_minimal = None
    eligibilite_effectif_maximal = None
    eligibilite_annees_existence_minimal = None
    eligibilite_forme_juridique = ""
    eligibilite_forme_juridique_exclusions = ""
    eligibilite_categorie_taille_entreprise = ""
    chainage_paiement = ""


__all__ = [RawDataSchemaDispositifAideFactory]
