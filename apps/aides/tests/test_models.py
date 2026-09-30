import pytest
from pytest_factoryboy import LazyFixture

from aides.models import Aide, Organisme


@pytest.mark.django_db
class TestOrganisme:
    @pytest.mark.parametrize("organisme_2__parent", [LazyFixture("organisme")])
    def test_get_child_for_departement_negative(
        self, organisme_2, zone_geographique_departement_13
    ):
        # GIVEN two Organisme object (parent and child)
        assert Organisme.objects.count() == 2
        assert (
            Organisme.objects.filter(parent__isnull=False).first().parent
            == Organisme.objects.filter(parent=None).first()
        )
        parent = organisme_2.parent

        # WHEN searching the child for a given departement, none is found
        assert (
            parent.get_child_for_departement(zone_geographique_departement_13) is None
        )

    @pytest.mark.parametrize(
        "organisme_with_departement__parent", [LazyFixture("organisme")]
    )
    def test_get_child_for_departement_positive(
        self, organisme_with_departement, zone_geographique_departement_13
    ):
        # GIVEN two Organisme object (parent and child)
        assert Organisme.objects.count() == 2
        assert (
            Organisme.objects.filter(parent__isnull=False).first().parent
            == Organisme.objects.filter(parent=None).first()
        )
        parent = organisme_with_departement.parent

        # WHEN searching the child for a given departement, none is found
        assert (
            parent.get_child_for_departement(zone_geographique_departement_13)
            == organisme_with_departement
        )


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

    @pytest.mark.parametrize("aide__status", [Aide.Status.CANDIDATE])
    def test_aide_candidate_can_not_be_published(self, aide):
        # GIVEN an unpublished but validated Aide
        assert not aide.is_published
        assert not aide.is_complete
        assert aide.status == Aide.Status.CANDIDATE

        # THEN its parent can be published
        assert not aide.can_be_published()

    @pytest.mark.parametrize("aide__status", [Aide.Status.REVIEW_EXPERT])
    def test_aide_draft_can_be_published(self, aide):
        # GIVEN an unpublished but validated Aide
        assert not aide.is_published
        assert not aide.is_complete
        assert aide.status == Aide.Status.REVIEW_EXPERT

        # THEN its parent can be published
        assert aide.can_be_published()

    @pytest.mark.parametrize("aide__status", [Aide.Status.VALIDATED])
    def test_aide_validated_can_be_published(self, aide):
        # GIVEN an unpublished but validated Aide
        assert not aide.is_published
        assert aide.is_complete

        # THEN its parent can be published
        assert aide.can_be_published()

    def test_aide_published_with_parent_can_be_published(
        self, aide_published_with_parent
    ):
        # GIVEN a published Aide with a parent that has no other child
        assert aide_published_with_parent.is_published
        assert aide_published_with_parent.is_complete
        assert aide_published_with_parent.parent is not None
        assert aide_published_with_parent.parent.children.count() == 1

        # THEN its parent can be published
        assert aide_published_with_parent.parent.can_be_published()

    @pytest.mark.parametrize("aide_published_minimal__parent", [LazyFixture("aide")])
    def test_aide_published_minimal_with_parent_can_not_be_published(
        self, aide_published_minimal
    ):
        # GIVEN a published Aide with a parent that has no other child
        assert aide_published_minimal.is_published
        assert not aide_published_minimal.is_complete
        assert aide_published_minimal.parent is not None
        assert aide_published_minimal.parent.children.count() == 1

        # THEN its parent can be published
        assert not aide_published_minimal.parent.can_be_published()


@pytest.mark.django_db
class TestSpecificiteLocale:
    @pytest.mark.parametrize(
        "specificite_locale__aide,specificite_locale__organisme,expected_is_departemental,expected_is_regional",
        [
            [
                LazyFixture("aide"),
                LazyFixture("organisme_with_departement"),
                True,
                False,
            ],
            [LazyFixture("aide"), LazyFixture("organisme_with_region"), False, True],
            [LazyFixture("aide"), LazyFixture("organisme"), False, False],
        ],
    )
    def test_is_departemental_is_regional(
        self, specificite_locale, expected_is_departemental, expected_is_regional
    ):
        assert specificite_locale.is_departemental == expected_is_departemental
        assert specificite_locale.is_regional == expected_is_regional
