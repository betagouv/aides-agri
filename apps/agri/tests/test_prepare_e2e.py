import pytest
from django.core.management import call_command


@pytest.mark.django_db
def test_dumpdata_for_e2e_testing(
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
):
    call_command("dumpdata", "aides", output="aides.json")
