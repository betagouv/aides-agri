from aides.models import Aide, Organisme, ZoneGeographique

from .base import BaseAideAdapter
from ..constants import REGION_OCCITANIE_NOM
from ..models.region_occitanie import RawAideRegionOccitanie


class RawAideRegionOccitanieAdapter(BaseAideAdapter):
    def perform_create(self, raw_aide: RawAideRegionOccitanie) -> Aide:
        aide = Aide.objects.create(
            url_descriptif=raw_aide.url_source,
            nom=raw_aide.titre,
            organisme=Organisme.objects.get(nom=REGION_OCCITANIE_NOM),
            couverture_geographique=Aide.CouvertureGeographique.REGIONAL,
            integration_method=Aide.IntegrationMethod.PARTNERSHIP,
            status=Aide.Status.CHOSEN,
        )
        aide.zones_geographiques.add(
            ZoneGeographique.objects.regions().get(nom="Occitanie")
        )
        return aide

    def perform_update(self, raw_aide: RawAideRegionOccitanie):
        aide = raw_aide.aide
        aide.save()
