import pytest
from django.core.management import call_command

from aides.management.commands import (
    aides_update_ddt_from_service_public_api,
    aides_alert_organismes_without_logo,
)
from aides.models import ZoneGeographique


@pytest.mark.django_db
def test_load_zones_geographiques(requests_mock, zone_geographique_departement_13):
    # GIVEN 2 ZoneGeographique objects in DB
    assert ZoneGeographique.objects.count() == 2
    assert ZoneGeographique.objects.departements().count() == 1
    assert (
        ZoneGeographique.objects.departements()
        .first()
        .nom.startswith("Zone Geographique ")
    )
    assert ZoneGeographique.objects.regions().count() == 1
    assert (
        ZoneGeographique.objects.regions().first().nom.startswith("Zone Geographique ")
    )
    assert (
        ZoneGeographique.objects.departements().first().parent
        == ZoneGeographique.objects.regions().first()
    )

    # WHEN running load_zones_geographiques
    requests_mock.get(
        "https://geo.api.gouv.fr/regions",
        text="""[{"nom":"Île-de-France","code":"11"},{"nom":"Provence-Alpes-Côte d'Azur","code":"93"}]""",
    )
    requests_mock.get(
        "https://geo.api.gouv.fr/departements",
        text="""[{"nom":"Bouches-du-Rhône","code":"13","codeRegion":"93"},{"nom":"Paris","code":"75","codeRegion":"11"}]""",
    )
    requests_mock.get(
        "https://geo.api.gouv.fr/epcis",
        text="""[{"nom":"CC Vallée des Baux-Alpilles (CC VBA)","code":"241300375","codesDepartements":["13"],"codesRegions":["93"],"population":27706}]""",
    )
    requests_mock.get(
        "https://geo.api.gouv.fr/communes",
        text="""[{"nom":"Fontvieille","code":"13038","codeDepartement":"13","siren":"211300389","codeEpci":"241300375","codeRegion":"93","codesPostaux":["13990"],"population":3571}]""",
    )
    for code in range(975, 1000):
        requests_mock.get(f"https://geo.api.gouv.fr/regions/{code}", status_code=404)
    call_command("aides_load_zones_geographiques")

    # THEN ZoneGeographique objects have been created
    assert ZoneGeographique.objects.count() == 6
    assert ZoneGeographique.objects.departements().count() == 2
    assert ZoneGeographique.objects.regions().count() == 2
    assert ZoneGeographique.objects.communes().count() == 1
    assert (
        ZoneGeographique.objects.departements().order_by("pk").first().nom
        == "Bouches-du-Rhône"
    )
    assert (
        ZoneGeographique.objects.regions().order_by("pk").first().nom
        == "Provence-Alpes-Côte d'Azur"
    )


@pytest.mark.django_db
def test_set_organisme_illustration(organisme):
    # GIVEN an Organisme with no illustration
    assert not organisme.has_illustration

    # WHEN calling the command
    call_command("aides_set_organisme_illustration", organisme.pk, __file__)

    # THEN the Organisme now has an illustration
    organisme.refresh_from_db()
    assert organisme.has_illustration


@pytest.mark.django_db
def test_alert_organismes_without_logo(aide_published, mocker, settings):
    organisme = aide_published.organisme
    # GIVEN an Organisme with no illustration
    assert not organisme.has_illustration

    # WHEN calling the command
    spy = mocker.spy(aides_alert_organismes_without_logo, "send_mail")
    call_command("aides_alert_organismes_without_logo")

    # THEN an e-mail has been sent to aides managers
    assert spy.call_count == 1
    assert spy.call_args[0][3] == settings.AIDES_MANAGERS


@pytest.mark.django_db
def test_alert_organismes_without_logo_negative(organisme, mocker, settings):
    # GIVEN an Organisme with no illustration but no published Aide
    assert not organisme.has_illustration
    assert not organisme.aides.exists()

    # WHEN calling the command
    spy = mocker.spy(aides_alert_organismes_without_logo, "send_mail")
    call_command("aides_alert_organismes_without_logo")

    # THEN no e-mail has been sent to aides managers
    assert spy.call_count == 0


@pytest.mark.django_db
def test_publish_illustrations_from_db(organisme_with_departement, tmpdir, settings):
    settings.WEBROOT_PATH = tmpdir.strpath
    # GIVEN an Organisme having an illustration,
    # and an empty directory in which we create a structure
    organisme = organisme_with_departement
    assert organisme.has_illustration
    assert len(tmpdir.listdir()) == 0
    tmpdir.mkdir("aides")
    destdir = tmpdir.listdir()[0].mkdir("illustrations-organisme")

    # WHEN calling the command
    call_command("aides_publish_illustrations_from_db")

    # THEN the directory now holds a file named after the Organisme
    assert len(destdir.listdir()) == 1
    assert destdir.listdir()[0].basename == f"{organisme.pk}.png"


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

    @pytest.mark.django_db
    @pytest.mark.parametrize(
        "organisme__id_annuaire_service_public",
        ["07c5b0b3-fc70-480b-bb61-837238346172"],
    )
    def test_handle(self, requests_mock, organisme):
        # GIVEN an Organisme and a fake API response with 1 corresponding DDT
        assert organisme.siren == ""
        assert organisme.courriel == ""
        assert organisme.telephone == ""
        assert organisme.adresse == ""
        assert organisme.horaires == ""
        requests_mock.get(
            aides_update_ddt_from_service_public_api.URL,
            text="""{"total_count": 1, "results": [{"id": "07c5b0b3-fc70-480b-bb61-837238346172", "nom": "Direction d\u00e9partementale des territoires (DDT) - Ari\u00e8ge", "adresse": "[{\\"type_adresse\\": \\"Adresse\\", \\"complement1\\": \\"\\", \\"complement2\\": \\"\\", \\"numero_voie\\": \\"10 rue des Salenques\\", \\"service_distribution\\": \\"\\", \\"code_postal\\": \\"09000\\", \\"nom_commune\\": \\"Foix\\", \\"pays\\": \\"France\\", \\"continent\\": \\"Europe\\", \\"longitude\\": \\"1.60708\\", \\"latitude\\": \\"42.964\\"}, {\\"type_adresse\\": \\"Adresse postale\\", \\"complement1\\": \\"10 rue des Salenques\\", \\"complement2\\": \\"\\", \\"numero_voie\\": \\"\\", \\"service_distribution\\": \\"\\", \\"code_postal\\": \\"BP 10102\\", \\"nom_commune\\": \\"Foix Cedex\\", \\"pays\\": \\"France\\", \\"continent\\": \\"Europe\\", \\"longitude\\": \\"\\", \\"latitude\\": \\"\\"}]", "telephone": "[{\\"valeur\\": \\"05 61 02 47 00\\", \\"description\\": \\"\\"}]", "site_internet": "[{\\"libelle\\": \\"\\", \\"valeur\\": \\"https://www.ariege.gouv.fr/Services-de-l-Etat/Direction-departementale-des-territoires\\"}]", "adresse_courriel": "ddt@ariege.gouv.fr", "plage_ouverture": "[{\\"nom_jour_debut\\": \\"Lundi\\", \\"nom_jour_fin\\": \\"Vendredi\\", \\"valeur_heure_debut_1\\": \\"09:15:00\\", \\"valeur_heure_fin_1\\": \\"11:15:00\\", \\"valeur_heure_debut_2\\": \\"14:00:00\\", \\"valeur_heure_fin_2\\": \\"16:00:00\\", \\"commentaire\\": \\"\\"}]", "siren": "130011786"}]}""",
        )

        # WHEN calling the command
        call_command("aides_update_ddt_from_service_public_api")

        # THEN the Organisme has been updated
        organisme.refresh_from_db()
        assert organisme.siren == "130011786"
        assert organisme.courriel == "ddt@ariege.gouv.fr"
        assert organisme.telephone == "05 61 02 47 00"
        assert organisme.adresse == "10 rue des Salenques\n09000 Foix"
        assert (
            organisme.horaires
            == "Du lundi au vendredi : de 09h15 à 11h15 et de 14h00 à 16h00"
        )
