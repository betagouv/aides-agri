import pytest

from aides import grist
from aides.models import Theme, Sujet, Operateur, ZoneGeographique, Aide


@pytest.mark.django_db
def test_load_themes(monkeypatch, theme):
    # GIVEN we have one Theme
    assert Theme.objects.count() == 1
    existing = Theme.objects.first()
    assert existing.pk == theme.pk
    assert existing.nom != "Super thème"

    # GIVEN the Grist API returns some Themes
    def mock_list_records(*args, **kwargs):
        return 200, [
            {"id": theme.pk, "Nom": "Super thème"},
            {"id": 2, "Nom": "Super second thème"},
        ]

    monkeypatch.setattr(grist.gristapi, "list_records", mock_list_records)

    # WHEN loading Themes
    grist.load_themes()

    # THEN we have 2 Themes
    # the existing one has been renamed
    assert Theme.objects.count() == 2
    assert set(Theme.objects.values_list("pk", flat=True)) == {theme.pk, 2}
    existing.refresh_from_db()
    assert existing.nom == "Super thème"
    assert Theme.objects.get(pk=2).nom == "Super second thème"


@pytest.mark.django_db
def test_load_sujets(monkeypatch, theme, theme_2, sujet):
    # GIVEN we have one Sujet
    assert Sujet.objects.count() == 1
    existing = Sujet.objects.first()
    assert existing.pk == sujet.pk
    assert existing.nom != "Super sujet"
    assert not existing.themes.exists()

    # GIVEN the Grist API returns some Themes
    def mock_list_records(*args, **kwargs):
        return 200, [
            {"id": sujet.pk, "Nom": "Super sujet", "Themes": ["L1", theme.external_id]},
            {
                "id": 2,
                "Nom": "Super second sujet",
                "Themes": ["L2", theme.external_id, theme_2.external_id],
            },
        ]

    monkeypatch.setattr(grist.gristapi, "list_records", mock_list_records)

    # WHEN loading Sujets
    grist.load_sujets()

    # THEN we have 2 Sujets
    # the existing one has been renamed
    # and themes have been linked
    assert Sujet.objects.count() == 2
    assert set(Sujet.objects.values_list("pk", flat=True)) == {sujet.pk, 2}
    existing.refresh_from_db()
    assert existing.nom == "Super sujet"
    assert set(existing.themes.all()) == {theme}
    second = Sujet.objects.get(pk=2)
    assert second.nom == "Super second sujet"
    assert set(second.themes.all()) == {theme, theme_2}


@pytest.mark.django_db
def test_load_zones_geographiques(monkeypatch, zone_geographique):
    # GIVEN we have one ZoneGeographique
    assert ZoneGeographique.objects.count() == 1
    existing = ZoneGeographique.objects.first()
    assert existing.pk == zone_geographique.pk
    assert existing.nom != "Super région"

    # GIVEN the Grist API returns some Operateurs
    def mock_list_records(*args, **kwargs):
        return 200, [
            {
                "id": zone_geographique.pk,
                "Numero": "",
                "Type": ZoneGeographique.Type.REGION,
                "Nom": "Super région",
                "Parent": None,
                "EPCI": None,
                "Code_postal": "",
            },
            {
                "id": 2,
                "Numero": "13",
                "Type": ZoneGeographique.Type.DEPARTEMENT,
                "Nom": "Super département",
                "Parent": zone_geographique.pk,
                "EPCI": None,
                "Code_postal": "",
            },
            {
                "id": 3,
                "Numero": "",
                "Type": ZoneGeographique.Type.CC,
                "Nom": "Super communauté de communes",
                "Parent": None,
                "EPCI": None,
                "Code_postal": "",
            },
            {
                "id": 4,
                "Numero": "13038",
                "Type": ZoneGeographique.Type.COMMUNE,
                "Nom": "Super commune",
                "Parent": 2,
                "EPCI": 3,
                "Code_postal": "13990",
            },
        ]

    monkeypatch.setattr(grist.gristapi, "list_records", mock_list_records)

    # WHEN loading ZoneGeographique
    grist.load_zones_geographiques()

    # THEN we have 2 ZoneGeographique
    # the existing one has been renamed
    assert ZoneGeographique.objects.count() == 4
    assert set(ZoneGeographique.objects.values_list("pk", flat=True)) == {
        zone_geographique.pk,
        2,
        3,
        4,
    }
    existing.refresh_from_db()
    assert existing.nom == "Super région"
    second = ZoneGeographique.objects.get(pk=2)
    assert second.nom == "Super département"
    assert second.parent == existing
    third = ZoneGeographique.objects.get(pk=3)
    assert third.nom == "Super communauté de communes"
    fourth = ZoneGeographique.objects.get(pk=4)
    assert fourth.nom == "Super commune"
    assert fourth.parent == second
    assert fourth.epci == third


@pytest.mark.django_db
def test_load_operateurs(monkeypatch, operateur, zone_geographique):
    # GIVEN we have one Operateur
    assert Operateur.objects.count() == 1
    existing = Operateur.objects.first()
    assert existing.pk == operateur.pk
    assert existing.nom != "Super opérateur"

    # GIVEN the Grist API returns some Operateurs
    def mock_list_records(*args, **kwargs):
        return 200, [
            {
                "id": operateur.pk,
                "Nom": "Super opérateur",
                "Zones_geographiques": ["L1", zone_geographique.external_id],
            },
            {
                "id": 2,
                "Nom": "Super second opérateur",
                "Zones_geographiques": ["L1", zone_geographique.external_id],
            },
        ]

    monkeypatch.setattr(grist.gristapi, "list_records", mock_list_records)

    # WHEN loading Operateurs
    grist.load_operateurs()

    # THEN we have 2 Operateurs
    # the existing one has been renamed
    assert Operateur.objects.count() == 2
    assert set(Operateur.objects.values_list("pk", flat=True)) == {operateur.pk, 2}
    existing.refresh_from_db()
    assert existing.nom == "Super opérateur"
    assert Operateur.objects.get(pk=2).nom == "Super second opérateur"


@pytest.mark.django_db
def test_load_aides(monkeypatch, theme, sujet, operateur, zone_geographique, aide):
    # GIVEN we have one Aide
    assert Aide.objects.count() == 1
    existing = Aide.objects.first()
    assert existing.pk == aide.pk
    assert existing.nom != "Super aide"

    # GIVEN the Grist API returns some Themes
    def mock_list_records(*args, **kwargs):
        return 200, [
            {
                "id": aide.pk,
                "Nom": "Super aide",
                "Types_d_aide": [Aide.Type.FINANCEMENT],
                "Operateur_principal": 1,
                "Operateurs_autres": ["L0"],
                "Couverture_Geographique": Aide.CouvertureGeographique.NATIONAL,
                "Zones_geographiques": ["L1", 1],
                "Themes": ["L0"],
                "Sujets": ["L1", 1],
                "Promesse": "",
                "Description_Courte": "",
                "Description_longue": "",
                "min_effectif": None,
                "max_effectif": 10,
                "Lien_vers_le_descriptif_complet": "https://beta.gouv.fr",
                "Date_d_ouverture": "2025-01-01",
                "Date_de_cloture": "2025-12-31",
            },
            {
                "id": 2,
                "Nom": "Super seconde aide",
                "Types_d_aide": [Aide.Type.PRET],
                "Operateur_principal": 1,
                "Operateurs_autres": ["L0"],
                "Couverture_Geographique": Aide.CouvertureGeographique.REGIONAL,
                "Zones_geographiques": ["L1", 1],
                "Themes": ["L0"],
                "Sujets": ["L1", 1],
                "Promesse": "",
                "Description_Courte": "",
                "Description_longue": "",
                "min_effectif": None,
                "max_effectif": 10,
                "Lien_vers_le_descriptif_complet": "https://beta.gouv.fr",
                "Date_d_ouverture": None,
                "Date_de_cloture": None,
            },
        ]

    monkeypatch.setattr(grist.gristapi, "list_records", mock_list_records)

    # WHEN loading Aides
    grist.load_aides()

    # THEN we have 2 Aides
    # the existing one has been renamed
    # and themes have been linked
    assert Aide.objects.count() == 2
    assert set(Aide.objects.values_list("pk", flat=True)) == {aide.pk, 2}
    existing.refresh_from_db()
    assert existing.nom == "Super aide"
    second = Aide.objects.get(pk=2)
    assert second.nom == "Super seconde aide"
