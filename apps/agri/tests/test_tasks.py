import pytest

from aides.models import Aide, Theme

from agri import tasks


@pytest.fixture(autouse=True)
def use_real_tasks_backend(settings):
    settings.TASKS = {
        "default": {"BACKEND": "django_tasks.backends.immediate.ImmediateBackend"}
    }


@pytest.mark.django_db
def test_send_results_by_mail(
    theme_published_urgence,
    theme_published,
    theme_unpublished,
    sujet_urgence_published,
    sujet_urgence_unpublished,
    sujet_published,
    sujet_unpublished,
    filiere_ok_1,
    filiere_ok_2,
    filiere_published_no_aides,
    filiere_unpublished,
    type_aides_1,
    type_aides_2,
    type_aides_3,
    zone_geographique_departement_13,
    zone_geographique_departement_40,
    aide_unpublished_dept_13_type_1_sujet_urgence_filiere_1,
    aide_published_nationale_type_1_sujet_non_urgence_no_filiere,
    aide_published_nationale_type_1_sujet_non_urgence_no_filiere_ended,
    aide_published_nationale_type_1_sujet_non_urgence_filiere_1_ending_soon,
    aide_published_nationale_type_1_sujet_non_urgence_no_filiere_ending_later,
    aide_published_dept_13_type_1_sujet_urgence_filiere_1,
    aide_published_region_paca_type_2_sujet_non_urgence_filiere_2,
    aide_published_region_na_type_2_sujet_non_urgence_no_filiere,
    mocker,
):
    # GIVEN
    # 7 published Aides
    assert Aide.objects.official_published_count() == 7
    # 1 on a Sujet associated to an "urgence" Theme
    assert Theme.objects.published().get(pk=theme_published_urgence.pk).aides_count == 1
    # 6 on a Sujet associated to a "non-urgence" Theme
    assert Theme.objects.published().get(pk=theme_published.pk).aides_count == 6

    # WHEN enqueuing the send_results_by_mail task
    spy = mocker.spy(tasks, "send_mail")
    tasks.send_results_by_mail.enqueue(
        "name@domain.tld",
        "http://localhost",
        "13",
        [],
        [],
        [],
        [
            aide_published_dept_13_type_1_sujet_urgence_filiere_1.pk,
            aide_published_nationale_type_1_sujet_non_urgence_no_filiere.pk,
            aide_published_nationale_type_1_sujet_non_urgence_filiere_1_ending_soon.pk,
            aide_published_nationale_type_1_sujet_non_urgence_no_filiere_ending_later.pk,
            aide_published_region_paca_type_2_sujet_non_urgence_filiere_2.pk,
        ],
    )

    # THEN an e-mail is sent
    assert spy.call_count == 1
