import pytest
from pytest_factoryboy import LazyFixture

from aides.models import Aide


@pytest.mark.django_db
class TestAide:
    @pytest.mark.parametrize(
        "organisme__nom,aide__nom,aide__organisme",
        [["Organisme de test", "Super aide de test", LazyFixture("organisme")]],
    )
    def test_compute_slug_on_save(self, organisme, aide):
        # GIVEN an Aide with a given name that results in a predictable slug
        assert aide.slug == "organisme-de-test-super-aide-de-test"

        # WHEN changing the nom and saving
        aide.nom = "Nouveau nom"
        aide.save()

        # THEN the slug has been changed
        assert aide.slug == "organisme-de-test-nouveau-nom"

    @pytest.mark.parametrize(
        "organisme__nom,aide__nom,aide__organisme,aide__organisme_instructeur",
        [
            [
                "Organisme instructeur de test",
                "Super aide de test",
                None,
                LazyFixture("organisme"),
            ]
        ],
    )
    def test_compute_slug_on_save_with_organisme_instructeur(self, organisme, aide):
        # GIVEN an Aide with a given name that results in a predictable slug
        assert aide.slug == "organisme-instructeur-de-test-super-aide-de-test"

        # WHEN changing the nom and saving
        aide.nom = "Nouveau nom"
        aide.save()

        # THEN the slug has been changed
        assert aide.slug == "organisme-instructeur-de-test-nouveau-nom"

    @pytest.mark.parametrize(
        "organisme__nom,organisme_2__nom,aide__nom,aide__organisme,aide__organisme_instructeur",
        [
            [
                "Organisme de test",
                "Organisme instructeur de test",
                "Super aide de test",
                LazyFixture("organisme"),
                None,
            ]
        ],
    )
    def test_compute_slug_on_save_with_both_organismes(
        self, organisme, organisme_2, aide
    ):
        # GIVEN an Aide with a given name that results in a predictable slug
        assert aide.slug == "organisme-de-test-super-aide-de-test"

        # WHEN changing the nom and saving
        aide.nom = "Nouveau nom"
        aide.organisme_instructeur = organisme_2
        aide.save()

        # THEN the slug has been changed
        assert aide.slug == "organisme-instructeur-de-test-nouveau-nom"

    @pytest.mark.parametrize(
        "organisme__nom,organisme_2__nom,aide__nom,aide__organisme,aide__organisme_instructeur",
        [
            [
                "Organisme de test",
                "Organisme instructeur de test",
                "Super aide de test",
                LazyFixture("organisme"),
                LazyFixture("organisme_2"),
            ]
        ],
    )
    def test_compute_slug_on_save_with_both_organismes_but_instructeur_removed(
        self, organisme, organisme_2, aide
    ):
        # GIVEN an Aide with a given name that results in a predictable slug
        assert aide.slug == "organisme-instructeur-de-test-super-aide-de-test"

        # WHEN changing the nom and saving
        aide.nom = "Nouveau nom"
        aide.organisme_instructeur = None
        aide.save()

        # THEN the slug has been changed
        assert aide.slug == "organisme-de-test-nouveau-nom"

    @pytest.mark.parametrize(
        "organisme__is_masa,type_aide__score_priorite_aides,theme__is_prioritaire,sujet__with_given_theme,aide__organisme,aide__with_given_type,aide__with_given_sujet,aide__importance,aide__urgence,aide__enveloppe_globale,aide__demande_du_pourvoyeur,aide__taille_cible_potentielle,aide__is_meconnue,aide__is_filiere_sous_representee,aide__is_territoire_en_deploiement,expected",
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
                True,
                587.5,
            ],
        ],
    )
    def test_compute_priority(self, organisme, type_aide, theme, sujet, aide, expected):
        # GIVEN an Aide with some characteristics
        # WHEN it's saved into DB
        aide.save()
        # THEN its priority is computed and saved to the expected value
        assert aide.priority == expected

    @pytest.mark.parametrize(
        "aide_published__organisme_instructeur,organisme__with_illustration,organisme_2__with_illustration",
        [[LazyFixture("organisme_2"), True, True]],
    )
    def test_get_organisme_instructeur_illustration_for_departement(
        self,
        aide_published,
        zone_geographique_departement_13,
        organisme,
        organisme_2,
    ):
        aide = aide_published
        assert (
            aide.get_organisme_illustration_for_departement(
                zone_geographique_departement_13
            )
            == f"/aides/illustrations-organisme/{organisme_2.pk}.png"
        )

    @pytest.mark.parametrize(
        "aide_published__organisme_instructeur,organisme__with_illustration,organisme_2__with_illustration",
        [[None, True, True]],
    )
    def test_get_organisme_illustration_for_departement(
        self,
        aide_published,
        zone_geographique_departement_13,
        organisme,
        organisme_2,
    ):
        aide = aide_published
        assert (
            aide.get_organisme_illustration_for_departement(
                zone_geographique_departement_13
            )
            == f"/aides/illustrations-organisme/{organisme.pk}.png"
        )
