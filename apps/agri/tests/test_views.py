import pytest
from django.http.request import QueryDict
from django.urls import reverse


@pytest.mark.django_db
def test_home(client, theme):
    # WHEN requesting home page
    url = reverse("agri:home")
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200


@pytest.mark.django_db
def test_step_2(client, sujet):
    # WHEN requesting step 2
    querydict = QueryDict(mutable=True)
    querydict.update({"theme": sujet.themes.first().pk})
    url = reverse("agri:step-2") + "?" + querydict.urlencode()
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200


@pytest.mark.django_db
def test_step_2_allow_internal_redirection(client, sujet):
    # WHEN requesting step 2
    querydict = QueryDict(mutable=True)
    querydict.update({"theme": sujet.themes.first().pk, "next": reverse("agri:step-5")})
    url = reverse("agri:step-2") + "?" + querydict.urlencode()
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200
    assert (
        f'<form id="form" action="{reverse("agri:step-5")}"'
        in response.content.decode("utf-8")
    )


@pytest.mark.django_db
def test_step_2_disallow_open_redirection(client, sujet):
    # WHEN requesting step 2
    querydict = QueryDict(mutable=True)
    querydict.update({"theme": sujet.themes.first().pk, "next": "https://beta.gouv.fr"})
    url = reverse("agri:step-2") + "?" + querydict.urlencode()
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200
    assert (
        '<form id="form" action="https://beta.gouv.fr"'
        not in response.content.decode("utf-8")
    )


@pytest.mark.django_db
def test_step_4(client, sujet, zone_geographique_commune_75001):
    # WHEN requesting step 4 with that Siret
    querydict = QueryDict(mutable=True)
    querydict.update({"theme": sujet.themes.first().pk})
    querydict.setlist("sujets", [sujet.pk])
    url = reverse("agri:step-4") + "?" + querydict.urlencode()
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200


@pytest.mark.django_db
def test_search_commune(client, zone_geographique_commune_75001):
    # GIVEN a Commune ZoneGeographique
    assert zone_geographique_commune_75001.is_commune

    # WHEN requesting search company with that Siret
    querydict = QueryDict(mutable=True)
    querydict.update({"q": zone_geographique_commune_75001.code})
    url = reverse("agri:search-commune") + "?" + querydict.urlencode()
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200


@pytest.mark.django_db
def test_step_5(client, sujet, zone_geographique_commune_75001):
    # WHEN requesting step 5
    querydict = QueryDict(mutable=True)
    querydict.update(
        {
            "theme": sujet.themes.first().pk,
            "commune": zone_geographique_commune_75001.code,
        }
    )
    querydict.setlist("sujets", [sujet.pk])
    url = reverse("agri:step-5") + "?" + querydict.urlencode()
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200


@pytest.mark.django_db
def test_step_5_with_no_etablissement(client, sujet):
    # GIVEN no etablissement
    # WHEN requesting step 5
    querydict = QueryDict(mutable=True)
    querydict.update({"theme": sujet.themes.first().pk})
    querydict.setlist("sujets", [sujet.pk])
    url = reverse("agri:step-5") + "?" + querydict.urlencode()
    response = client.get(url)

    # THEN it's a 200
    assert response.status_code == 200


@pytest.mark.django_db
def test_results(
    client,
    theme,
    sujet,
    type_aide_conseil,
    zone_geographique_commune_75001,
    zone_geographique_departement_75,
):
    # WHEN requesting results
    querydict = QueryDict(mutable=True)
    querydict.update(
        {
            "theme": sujet.themes.first().pk,
            "commune": zone_geographique_commune_75001.code,
            "tranche_effectif_salarie": "0109",
        }
    )
    querydict.setlist("sujets", [sujet.pk])
    url = reverse("agri:results") + "?" + querydict.urlencode()
    response = client.get(url)
    assert response.status_code == 200
