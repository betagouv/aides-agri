import pytest
from pytest_factoryboy import LazyFixture

from aides.models import Aide


@pytest.mark.django_db
class TestAide:
    @pytest.mark.parametrize(
        "organisme__is_masa,type_aide__score_priorite_aides,aide__organisme,aide__with_types,aide__importance,aide__urgence,aide__enveloppe_globale,aide__demande_du_pourvoyeur,aide__taille_cible_potentielle,expected",
        [
            [
                True,
                10,
                LazyFixture("organisme"),
                LazyFixture("type_aide"),
                Aide.Importance.BRULANT,
                Aide.Urgence.HIGH,
                10_000_000,
                True,
                5000,
                557.5,
            ]
        ],
    )
    def test_compute_priority(self, organisme, type_aide, aide, expected):
        # GIVEN an Aide with no priority
        assert aide.priority == 1

        # WHEN computing its priority
        aide.compute_priority()

        # THEN its priority is the one expected
        assert aide.priority == expected
