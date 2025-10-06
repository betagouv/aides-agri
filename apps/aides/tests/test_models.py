import pytest
from pytest_factoryboy import LazyFixture

from aides.models import Aide


@pytest.mark.django_db
class TestAide:
    @pytest.mark.parametrize(
        "organisme__is_masa,type_aide__score_priorite_aides,theme__is_prioritaire,sujet__with_given_theme,aide__organisme,aide__with_given_type,aide__with_given_sujet,aide__importance,aide__urgence,aide__enveloppe_globale,aide__demande_du_pourvoyeur,aide__taille_cible_potentielle,aide__is_meconnue,aide__is_filiere_sous_representee,expected",
        [
            [
                True,
                10,
                True,
                LazyFixture("theme"),
                LazyFixture("organisme"),
                LazyFixture("type_aide"),
                LazyFixture("sujet"),
                Aide.Importance.BRULANT,
                Aide.Urgence.HIGH,
                10_000_000,
                True,
                5000,
                True,
                True,
                557.5,
            ],
        ],
    )
    def test_compute_priority(self, organisme, type_aide, theme, sujet, aide, expected):
        # GIVEN an Aide with some characteristics
        # WHEN it's saved into DB
        # THEN its priority is computed and saved to the expected value
        assert aide.priority == expected
