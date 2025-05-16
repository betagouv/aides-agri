import pytest

from aides.grist import (
    ThemeLoader,
    SujetLoader,
    TypeLoader,
    OrganismeLoader,
    ZoneGeographiqueLoader,
    AideLoader,
)
from aides.models import Theme, Sujet, Type, Organisme, ZoneGeographique, Aide


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
            {
                "id": theme.pk,
                "Libelle": "Super thème",
                "Libelle_court": "Super",
                "Biscuit2": "ouais ouais",
                "Urgence": True,
            },
            {
                "id": 2,
                "Libelle": "Super second thème",
                "Libelle_court": "Super second",
                "Biscuit2": "ouais ouais second",
                "Urgence": False,
            },
        ]

    loader = ThemeLoader()
    monkeypatch.setattr(loader.gristapi, "list_records", mock_list_records)

    # WHEN loading Themes
    loader.load()

    # THEN we have 2 Themes
    # the existing one has been renamed
    assert Theme.objects.count() == 2
    assert set(Theme.objects.values_list("pk", flat=True)) == {theme.pk, 2}
    existing.refresh_from_db()
    assert existing.nom == "Super thème"
    assert existing.urgence is True
    new = Theme.objects.get(pk=2)
    assert new.nom == "Super second thème"
    assert new.urgence is False


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
            {
                "id": sujet.pk,
                "Libelle": "Super sujet",
                "Libelle_court": "Super",
                "Themes": ["L1", theme.external_id],
            },
            {
                "id": 2,
                "Libelle": "Super second sujet",
                "Libelle_court": "Super second",
                "Themes": ["L2", theme.external_id, theme_2.external_id],
            },
        ]

    loader = SujetLoader()
    monkeypatch.setattr(loader.gristapi, "list_records", mock_list_records)

    # WHEN loading Sujets
    loader.load()

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
def test_load_types(monkeypatch, type_aide):
    # GIVEN we have one Type
    assert Type.objects.count() == 1
    existing = Type.objects.first()
    assert existing.pk == type_aide.pk
    assert existing.nom != "Super type"

    # GIVEN the Grist API returns some Types
    def mock_list_records(*args, **kwargs):
        return 200, [
            {
                "id": type_aide.pk,
                "Type_aide": "Super type",
                "Description": "Super description pour un super type !",
            },
            {
                "id": 2,
                "Type_aide": "Super second type",
                "Description": "Super description pour un super second type !",
            },
        ]

    loader = TypeLoader()
    monkeypatch.setattr(loader.gristapi, "list_records", mock_list_records)

    # WHEN loading Themes
    loader.load()

    # THEN we have 2 Themes
    # the existing one has been renamed
    assert Type.objects.count() == 2
    assert set(Type.objects.values_list("pk", flat=True)) == {type_aide.pk, 2}
    existing.refresh_from_db()
    assert existing.nom == "Super type"
    assert Type.objects.get(pk=2).nom == "Super second type"


@pytest.mark.django_db
def test_load_zones_geographiques(monkeypatch, zone_geographique):
    # GIVEN we have one ZoneGeographique
    assert ZoneGeographique.objects.count() == 1
    existing = ZoneGeographique.objects.first()
    assert existing.pk == zone_geographique.pk
    assert existing.nom != "Super région"

    # GIVEN the Grist API returns some Zones Geographiques
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

    loader = ZoneGeographiqueLoader()
    monkeypatch.setattr(loader.gristapi, "list_records", mock_list_records)

    # WHEN loading ZoneGeographique
    loader.load()

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
def test_load_organismes(monkeypatch, organisme, zone_geographique):
    # GIVEN we have one Organisme
    assert Organisme.objects.count() == 1
    existing = Organisme.objects.first()
    assert existing.pk == organisme.pk
    assert existing.nom != "Super opérateur"

    # GIVEN the Grist API returns some Organismes
    def mock_list_records(*args, **kwargs):
        return 200, [
            {
                "id": organisme.pk,
                "Nom": "Super organisme",
                "Zones_geographiques": ["L1", zone_geographique.external_id],
                "Logo": None,
            },
            {
                "id": 2,
                "Nom": "Super second organisme",
                "Zones_geographiques": ["L1", zone_geographique.external_id],
                "Logo": None,
            },
        ]

    def mock_list_attachments(*args, **kwargs):
        return 200, []

    loader = OrganismeLoader()
    monkeypatch.setattr(loader.gristapi, "list_records", mock_list_records)
    monkeypatch.setattr(loader.gristapi, "list_attachments", mock_list_attachments)

    # WHEN loading Organismes
    loader.load()

    # THEN we have 2 Organismes
    # the existing one has been renamed
    assert Organisme.objects.count() == 2
    assert set(Organisme.objects.values_list("pk", flat=True)) == {organisme.pk, 2}
    existing.refresh_from_db()
    assert existing.nom == "Super organisme"
    assert Organisme.objects.get(pk=2).nom == "Super second organisme"


@pytest.mark.django_db
def test_load_aides(
    monkeypatch, theme, sujet, type_aide, organisme, zone_geographique, aide
):
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
                "id_aide": "super-porteur-super-aide",
                "nom_aide": "Super aide",
                "types_aide": ["L1", 1],
                "porteur_aide": 1,
                "porteurs_autres": ["L0"],
                "zone_geographique": ["L1", 1],
                "thematique_aide": ["L1", 1],
                "promesse": "",
                "description": "",
                "taux_subvention_commentaire": "",
                "condition_eligibilite": "",
                "min_effectif": None,
                "max_effectif": 10,
                "url_descriptif": "https://beta.gouv.fr",
                "url_demarche": "https://beta.gouv.fr",
                "date_ouverture": 1742425200,
                "date_cloture": 1742425200,
            },
            {
                "id": 2,
                "id_aide": "super-porteur-super-seconde-aide",
                "nom_aide": "Super seconde aide",
                "types_aide": ["L1", 1],
                "porteur_aide": 1,
                "porteurs_autres": ["L0"],
                "zone_geographique": ["L1", 1],
                "thematique_aide": ["L1", 1],
                "promesse": "",
                "description": "",
                "taux_subvention_commentaire": "",
                "condition_eligibilite": "",
                "min_effectif": None,
                "max_effectif": 10,
                "url_descriptif": "https://beta.gouv.fr",
                "url_demarche": "https://beta.gouv.fr",
                "date_ouverture": 1742425200,
                "date_cloture": 1742425200,
            },
        ]

    loader = AideLoader()
    monkeypatch.setattr(loader.gristapi, "list_records", mock_list_records)

    # WHEN loading Aides
    loader.load()

    # THEN we have 2 Aides
    # the existing one has been renamed
    # and themes have been linked
    assert Aide.objects.count() == 2
    assert set(Aide.objects.values_list("pk", flat=True)) == {aide.pk, 2}
    existing.refresh_from_db()
    assert existing.nom == "Super aide"
    second = Aide.objects.get(pk=2)
    assert second.nom == "Super seconde aide"
    assert second.date_debut.isoformat() == "2025-03-20"
