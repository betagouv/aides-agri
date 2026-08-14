import pytest

from django.contrib.messages import get_messages
from django.contrib.messages.constants import SUCCESS, ERROR
from django.test.utils import override_settings
from django.urls import reverse
from django_tasks import default_task_backend

from aides.models import Aide, Theme

from agri.models import Alerte


@pytest.mark.django_db
def test_home(
    client,
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
    zone_geographique_departement_13,
    zone_geographique_departement_40,
    aide_unpublished_dept_13_type_1_sujet_urgence_filiere_1,
    aide_published_nationale_type_1_sujet_non_urgence_no_filiere,
    aide_published_dept_13_type_1_sujet_urgence_filiere_1,
    aide_published_region_paca_type_2_sujet_non_urgence_filiere_2,
    aide_published_region_na_type_2_sujet_non_urgence_no_filiere,
):
    # GIVEN
    # 4 published Aides
    assert Aide.objects.official_published_count() == 4
    # 1 on a Sujet associated to an "urgence" Theme
    assert Theme.objects.published().get(pk=theme_published_urgence.pk).aides_count == 1
    # 3 on a Sujet associated to a "non-urgence" Theme
    assert Theme.objects.published().get(pk=theme_published.pk).aides_count == 3

    # WHEN requesting home page
    url = reverse("agri:home")
    response = client.get(url)

    # THEN:
    # it's a 200
    assert response.status_code == 200
    # it doesn't hold a "besoins" section
    assert 'id="besoins"' not in response.text
    # it holds a Form
    assert "form" in response.context_data
    form = response.context_data["form"]
    # Form field departement holds everything needed to select a departement (but no regions)
    assert set(form.declared_fields.keys()) == {"departement", "profil"}
    assert form.declared_fields["departement"].choices == [
        ("", "Sélectionnez un département"),
        ("13", "13 Bouches-du-Rhône"),
        ("40", "40 Landes"),
    ]
    # everything needed to select filieres is also there
    assert "filieres_options" in response.context_data
    assert response.context_data["filieres_options"] == [
        (filiere_ok_1.pk, filiere_ok_1.nom, filiere_ok_1.nom),
        (filiere_ok_2.pk, filiere_ok_2.nom, filiere_ok_2.nom),
        (
            filiere_published_no_aides.pk,
            filiere_published_no_aides.nom,
            filiere_published_no_aides.nom,
        ),
    ]
    # Themes and Sujets are grouped as Besoins
    assert "besoins" in response.context_data
    assert list(response.context_data["besoins"]) == [
        theme_published,
        sujet_urgence_published,
    ]
    # Stats are OK
    assert "stats_aides_count" in response.context_data
    assert response.context_data["stats_aides_count"] == 4


@pytest.mark.django_db
def test_home_besoins(
    client,
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
    zone_geographique_departement_13,
    zone_geographique_departement_40,
    aide_unpublished_dept_13_type_1_sujet_urgence_filiere_1,
    aide_published_nationale_type_1_sujet_non_urgence_no_filiere,
    aide_published_dept_13_type_1_sujet_urgence_filiere_1,
    aide_published_region_paca_type_2_sujet_non_urgence_filiere_2,
    aide_published_region_na_type_2_sujet_non_urgence_no_filiere,
):
    # GIVEN
    # 4 published Aides
    assert Aide.objects.official_published_count() == 4
    # 1 on a Sujet associated to an "urgence" Theme
    assert Theme.objects.published().get(pk=theme_published_urgence.pk).aides_count == 1
    # 3 on a Sujet associated to a "non-urgence" Theme
    assert Theme.objects.published().get(pk=theme_published.pk).aides_count == 3

    # WHEN requesting home page
    url = reverse(
        "agri:home", query={"departement": "13", "filieres": [filiere_ok_1.pk]}
    )
    response = client.get(url)

    # THEN:
    # it's a 200
    assert response.status_code == 200
    # it holds a "besoins" section
    assert 'id="besoins"' in response.text
    # it show an urgence Sujet
    assert "urgent_sujets" in response.context_data
    assert list(response.context_data["urgent_sujets"]) == [sujet_urgence_published]
    # it show a non-urgence Theme
    assert "themes" in response.context_data
    assert list(response.context_data["themes"]) == [theme_published]
    # Themes and Sujets are grouped as Besoins
    assert "besoins" in response.context_data
    assert list(response.context_data["besoins"]) == [
        theme_published,
        sujet_urgence_published,
    ]
    # Stats are OK
    assert "stats_aides_count" in response.context_data
    assert response.context_data["stats_aides_count"] == 4


@pytest.mark.django_db
def test_home_partial_besoins(
    client,
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
    # GIVEN
    # 7 published Aides
    assert Aide.objects.official_published_count() == 7
    # 1 on a Sujet associated to an "urgence" Theme
    assert Theme.objects.published().get(pk=theme_published_urgence.pk).aides_count == 1
    # 6 on a Sujet associated to a "non-urgence" Theme
    assert Theme.objects.published().get(pk=theme_published.pk).aides_count == 6

    # WHEN requesting home page
    url = reverse(
        "agri:home", query={"departement": "13", "filieres": [filiere_ok_1.pk]}
    )
    response = client.get(
        url, headers={"HX-Request": "true", "HX-Current-URL": "http://localhost/"}
    )

    # THEN:
    # it's a 200
    assert response.status_code == 200
    # it holds a "besoins" section
    assert 'id="besoins"' in response.text
    # it shows an urgence Sujet
    assert "urgent_sujets" in response.context_data
    assert list(response.context_data["urgent_sujets"]) == [sujet_urgence_published]
    # it shows a non-urgence Theme
    assert "themes" in response.context_data
    assert list(response.context_data["themes"]) == [theme_published]
    # Besoins and Stats are not present as this is the partial version
    assert "besoins" not in response.context_data
    assert "stats_aides_count" not in response.context_data


@pytest.mark.django_db
def test_results_no_filter(
    client,
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
    # GIVEN
    # 7 published Aides
    assert Aide.objects.official_published_count() == 7
    # 1 on a Sujet associated to an "urgence" Theme
    assert Theme.objects.published().get(pk=theme_published_urgence.pk).aides_count == 1
    # 6 on a Sujet associated to a "non-urgence" Theme
    assert Theme.objects.published().get(pk=theme_published.pk).aides_count == 6

    # WHEN requesting results page
    url = reverse("agri:results")
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200
    # context holds a counter of results
    assert "aides_count" in response.context_data
    # counter is 6 (7 published Aides - 1 ended)
    assert response.context_data["aides_count"] == 6
    # context holds a list of Aides aggregated by Types
    assert "aides" in response.context_data
    # List of Types
    assert list(response.context_data["aides"].keys()) == [
        type_aides_1,
        type_aides_2,
    ]
    # number of Aides by Type
    assert [
        len(aides_data_by_type["aides"])
        for aides_data_by_type in response.context_data["aides"].values()
    ] == [3, 2]
    assert response.context_data["aides"][type_aides_1]["count"] == 4


@pytest.mark.django_db
def test_results_filtered(
    client,
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
    # GIVEN
    # 7 published Aides
    assert Aide.objects.official_published_count() == 7
    # 1 on a Sujet associated to an "urgence" Theme
    assert Theme.objects.published().get(pk=theme_published_urgence.pk).aides_count == 1
    # 6 on a Sujet associated to a "non-urgence" Theme
    assert Theme.objects.published().get(pk=theme_published.pk).aides_count == 6
    # 1 on filiere_ok_2
    assert filiere_ok_2.aides.published().count() == 1

    # WHEN requesting results page filtered on a Departement
    url = reverse(
        "agri:results",
        query={
            "departement": zone_geographique_departement_13.code,
            "filieres": [filiere_ok_2.pk],
            "themes": [theme_published.pk],
        },
    )
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200
    # context holds a counter of results
    assert "aides_count" in response.context_data
    # counter is 3 (7 published Aides - 1 that ended - 1 on other ZoneGeographiques - 1 on other filieres - 1 on other besoins)
    assert response.context_data["aides_count"] == 3
    # context holds a list of Aides aggregated by Types
    assert "aides" in response.context_data
    # List of Types
    assert list(response.context_data["aides"].keys()) == [
        type_aides_1,
        type_aides_2,
    ]
    # number of Aides by Type
    assert [
        len(aides_data_by_type["aides"])
        for aides_data_by_type in response.context_data["aides"].values()
    ] == [2, 1]


@pytest.mark.django_db
@override_settings(
    TASKS={"default": {"BACKEND": "django_tasks.backends.dummy.DummyBackend"}}
)
def test_send_results_by_mail_no_filter(
    client,
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
    # GIVEN
    # 7 published Aides
    assert Aide.objects.official_published_count() == 7
    # 1 on a Sujet associated to an "urgence" Theme
    assert Theme.objects.published().get(pk=theme_published_urgence.pk).aides_count == 1
    # 6 on a Sujet associated to a "non-urgence" Theme
    assert Theme.objects.published().get(pk=theme_published.pk).aides_count == 6
    # no task enqueued
    assert len(default_task_backend.results) == 0

    # WHEN requesting the "send by e-mail" feature
    url = reverse("agri:send-results-by-mail")
    response = client.post(
        url, data={"email": "name@domain.tld"}, headers={"host": "localhost"}
    )

    # THEN
    # it's a 200
    assert response.status_code == 200
    assert "Succès de l’envoi" in response.text
    # 1 task enqueued
    assert len(default_task_backend.results) == 1
    assert default_task_backend.results[0].task.name == "send_results_by_mail"


@pytest.mark.django_db
@override_settings(
    TASKS={"default": {"BACKEND": "django_tasks.backends.dummy.DummyBackend"}}
)
def test_send_results_by_mail_invalid_mail(client):
    # GIVEN
    # no task enqueued
    assert len(default_task_backend.results) == 0

    # WHEN requesting the "send by e-mail" feature with an invalid e-mail address
    url = reverse("agri:send-results-by-mail")
    response = client.post(
        url, data={"email": "invalid_email"}, headers={"host": "localhost"}
    )

    # THEN the task is not enqueued and the form is displayed again with
    assert len(default_task_backend.results) == 0
    assert response.status_code == 200
    assert response.context["invalid_email"] is True
    assert response.context.template.name == "agri/modals/send_results_by_mail.html"


@pytest.mark.django_db
def test_create_alerte_view(
    client, filiere_ok_1, sujet_published, zone_geographique_departement_13
):
    # GIVEN no Alerte in DB
    assert not Alerte.objects.exists()

    # WHEN POSTing to create one
    url = reverse(
        "agri:alerte-create",
        query={
            "departement": "13",
            "filieres": [filiere_ok_1.pk],
            "sujets": [sujet_published.pk],
        },
    )
    response = client.post(
        url, data={"email": "name@domain.tld"}, headers={"host": "localhost"}
    )

    # THEN
    # it's a 200
    # and an Alerte has been created in DB
    assert response.status_code == 200
    assert 'class="fr-alert fr-alert--success"' in response.text
    assert Alerte.objects.count() == 1
    alerte = Alerte.objects.first()
    assert alerte.email == "name@domain.tld"
    assert alerte.departement == zone_geographique_departement_13
    assert set(alerte.sujets.all()) == {sujet_published}
    assert set(alerte.filieres.all()) == {filiere_ok_1}


@pytest.mark.django_db
def test_create_alerte_honeypot(client):
    # GIVEN no Alerte in DB
    assert not Alerte.objects.exists()

    # WHEN requesting the "create an Alerte" feature with the honeypot field filled-in
    url = reverse("agri:alerte-create")
    response = client.post(
        url,
        data={"email": "name@domain.tld", "complements": "coucou"},
        headers={"host": "localhost"},
    )

    # THEN still no Alerte in DB, and the form is displayed again with
    assert not Alerte.objects.exists()
    assert response.status_code == 400


@pytest.mark.django_db
def test_create_alerte_invalid_mail(client):
    # GIVEN no Alerte in DB
    assert not Alerte.objects.exists()

    # WHEN requesting the "create an Alerte" feature with an invalid e-mail address
    url = reverse("agri:alerte-create")
    response = client.post(
        url, data={"email": "invalid_email"}, headers={"host": "localhost"}
    )

    # THEN still no Alerte in DB, and the form is displayed again with
    assert not Alerte.objects.exists()
    assert response.status_code == 200
    assert response.context["invalid_email"] is True
    assert response.context.template.name == "agri/modals/create_alerte.html"


@pytest.mark.django_db
@pytest.mark.parametrize("alerte__email", ["name@domain.tld"])
def test_list_alertes_view_wrong_token(client, alerte):
    # GIVEN an Alerte
    assert Alerte.objects.count() == 1

    # WHEN listing Alertes for a different token
    url = reverse("agri:alerte-list", args=["tokenimpossible"])
    response = client.get(url)

    # THEN nothing shows
    assert response.status_code == 200
    assert not response.context["object_list"]


@pytest.mark.django_db
@pytest.mark.parametrize(
    "alerte__email,alerte_2__email", [["name@domain.tld", "name@domain.tld"]]
)
def test_list_alertes_view(client, alerte, alerte_2):
    # GIVEN 2 Alerte objects for the same e-mail address, with the same token
    assert Alerte.objects.count() == 2
    assert Alerte.objects.first().token == Alerte.objects.last().token

    # WHEN listing Alertes for the correct token
    url = reverse("agri:alerte-list", args=[Alerte.objects.first().token])
    response = client.get(url)

    # THEN the two shows
    assert response.status_code == 200
    assert set(response.context["object_list"]) == {alerte, alerte_2}


@pytest.mark.django_db
@pytest.mark.parametrize(
    "alerte__email,alerte_2__email", [["name@domain.tld", "name@domain.tld"]]
)
def test_delete_alerte_view(client, alerte, alerte_2):
    # GIVEN 2 Alerte objects for the same e-mail address, with the same token
    assert Alerte.objects.count() == 2
    assert Alerte.objects.first().token == Alerte.objects.last().token

    # WHEN POSTing to delete one of them
    url = reverse("agri:alerte-list", args=[Alerte.objects.first().token])
    response = client.post(url, data={"to_delete": [alerte.pk]})

    # THEN a redirection is done, and only one Alerte still exists
    assert Alerte.objects.count() == 1
    assert Alerte.objects.first() == alerte_2
    assert response.status_code == 302
    messages = get_messages(response.wsgi_request)
    assert len(messages) == 1
    assert [m.level == SUCCESS for m in messages]


@pytest.mark.django_db
@pytest.mark.parametrize("alerte__email", [["name@domain.tld"]])
def test_delete_alerte_view_delete_nothing(client, alerte):
    # GIVEN an Alerte object
    assert Alerte.objects.count() == 1

    # WHEN POSTing to delete none of them
    url = reverse("agri:alerte-list", args=[Alerte.objects.first().token])
    response = client.post(url)

    # THEN a redirection is done, no Alerte has been deleted, an error message is displayed
    assert Alerte.objects.count() == 1
    assert response.status_code == 302
    messages = get_messages(response.wsgi_request)
    assert len(messages) == 1
    assert [m.level == ERROR for m in messages]


@pytest.mark.django_db
@pytest.mark.parametrize(
    "alerte__email,alerte_2__email", [["name@domain.tld", "anothername@domain.tld"]]
)
def test_delete_alerte_view_cant_delete_someone_else_alerte(client, alerte, alerte_2):
    # GIVEN 2 Alerte objects having distinct e-mail addresses, thus distinct tokens
    assert Alerte.objects.count() == 2
    assert Alerte.objects.first().token != Alerte.objects.last().token

    # WHEN POSTing to delete one of them coming from the wrong token
    url = reverse("agri:alerte-list", args=[alerte.token])
    response = client.post(url, data={"to_delete": [alerte_2.pk]})

    # THEN a redirection is done, and only one Alerte still exists
    assert Alerte.objects.count() == 2
    assert response.status_code == 302
    messages = get_messages(response.wsgi_request)
    assert len(messages) == 1
    assert [m.level == ERROR for m in messages]
