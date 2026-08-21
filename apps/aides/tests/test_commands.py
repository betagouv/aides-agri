import pytest
from django.core.management import call_command

from aides.management.commands import aides_update_ddt_from_service_public_api
from aides.models import Aide


@pytest.mark.parametrize(
    "aide_published__url_descriptif",
    ["https://aides-agri.beta.gouv.fr/thisurlwillnevermatch"],
)
@pytest.mark.django_db
def test_unpublish_aides_having_invalid_link(aide_published):
    # GIVEN a published Aide with a url_descriptif returning 404
    assert aide_published.is_published
    assert Aide.objects.published().count() == 1

    # WHEN
    call_command("aides_unpublish_aides_having_invalid_link")

    # THEN
    assert not Aide.objects.published().exists()


class TestUpdateDDTFromServicePublic:
    def test_extract_adresse(self):
        # GIVEN a result from "annuaire du service public" API
        d = {
            "adresse": '[{"type_adresse": "Adresse", "complement1": "", "complement2": "", "numero_voie": "6 place de la Pyrotechnie", "service_distribution": "CS 20001", "code_postal": "18000", "nom_commune": "Bourges", "pays": "France", "continent": "Europe", "longitude": "2.418915", "latitude": "47.07679"}, {"type_adresse": "Adresse postale", "complement1": "", "complement2": "", "numero_voie": "6 place de la Pyrotechnie", "service_distribution": "CS 20001", "code_postal": "18019", "nom_commune": "Bourges Cedex", "pays": "France", "continent": "Europe", "longitude": "2.418915", "latitude": "47.07679"}]'
        }

        # WHEN extracting the adresse
        adresse = aides_update_ddt_from_service_public_api.extract_adresse(d)

        # THEN it's correctly formatted
        assert adresse == "6 place de la Pyrotechnie\n18000 Bourges"

    def test_extract_horaires(self):
        # GIVEN a result from "annuaire du service public" API
        d = {
            "plage_ouverture": '[{"nom_jour_debut": "Lundi", "nom_jour_fin": "Jeudi", "valeur_heure_debut_1": "08:30:00", "valeur_heure_fin_1": "12:00:00", "valeur_heure_debut_2": "13:30:00", "valeur_heure_fin_2": "17:00:00", "commentaire": ""}, {"nom_jour_debut": "Vendredi", "nom_jour_fin": "Vendredi", "valeur_heure_debut_1": "08:30:00", "valeur_heure_fin_1": "12:00:00", "valeur_heure_debut_2": "13:30:00", "valeur_heure_fin_2": "16:00:00", "commentaire": ""}]'
        }

        # WHEN extracting the adresse
        adresse = aides_update_ddt_from_service_public_api.extract_horaires(d)

        # THEN it's correctly formatted
        assert (
            adresse
            == "Du lundi au jeudi : de 08h30 à 12h00 et de 13h30 à 17h00\nLe vendredi : de 08h30 à 12h00 et de 13h30 à 16h00"
        )
