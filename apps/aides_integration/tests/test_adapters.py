import pytest

from aides.models import Aide
from aides_integration.adapters.region_occitanie import RawAideRegionOccitanieAdapter
from aides_integration.models.region_occitanie import RawAideRegionOccitanie


@pytest.mark.django_db
def test_region_occitanie_adapter(
    raw_aide_region_occitanie,
    zone_geographique_region_occitanie,
    organisme_region_occitanie,
):
    # GIVEN no Aide in DB, and a RawAideRegionOccitanie waiting for integration
    assert not Aide.objects.exists()
    assert RawAideRegionOccitanie.objects.to_do().count() == 1

    # WHEN calling RawAideRegionOccitanieAdapter
    RawAideRegionOccitanieAdapter().create(raw_aide_region_occitanie)

    # THEN
    assert Aide.objects.count() == 1
    aide = Aide.objects.first()
    assert aide.nom == raw_aide_region_occitanie.titre
    assert set(aide.zones_geographiques.all()) == {zone_geographique_region_occitanie}
