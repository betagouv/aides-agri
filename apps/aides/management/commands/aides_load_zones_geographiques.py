import requests
from django.core.management.base import BaseCommand

from ...models import ZoneGeographique


class BaseLoader:
    entity_name = ""
    zone_geographique_type = None
    geoapi_entity = None

    def _upsert(self, code: str, row: dict) -> bool:
        _, is_new = ZoneGeographique.objects.update_or_create(
            type=self.zone_geographique_type,
            code=code,
            defaults={"nom": row["nom"]},
        )
        return is_new

    def _discover(self) -> list[dict]:
        r = requests.get(f"https://geo.api.gouv.fr/{self.geoapi_entity}")
        r.raise_for_status()
        return r.json()

    def load(self):
        print(f"Loading {self.entity_name}...")

        codes = set()
        count_new = 0
        for row in self._discover():
            code = row["code"]
            is_new = self._upsert(code, row)
            codes.add(code)
            if is_new:
                count_new += 1
        count = len(codes)

        print(
            f"{self.entity_name} loaded: {count}, including {count_new} new ones.".capitalize()
        )

        delete_qs = ZoneGeographique.objects.filter(
            type=self.zone_geographique_type
        ).exclude(code__in=codes)
        if delete_qs.exists():
            print(
                f"Deleting {self.entity_name} having following codes: {list(delete_qs.values_list('code', flat=True))}..."
            )
            count_deleted = delete_qs.delete()
            print(f"{self.entity_name} deleted: {count_deleted}.".capitalize())


class RegionsLoader(BaseLoader):
    entity_name = "Régions"
    zone_geographique_type = ZoneGeographique.Type.REGION
    geoapi_entity = "regions"


class DepartementsLoader(BaseLoader):
    entity_name = "Départements"
    zone_geographique_type = ZoneGeographique.Type.DEPARTEMENT
    geoapi_entity = "departements"

    def __init__(self):
        self.regions_ids_by_code = {
            zone.code: zone.pk
            for zone in ZoneGeographique.objects.filter(
                type=ZoneGeographique.Type.REGION
            )
        }

    def _upsert(self, code: str, row: dict) -> bool:
        _, is_new = ZoneGeographique.objects.update_or_create(
            type=self.zone_geographique_type,
            code=code,
            defaults={
                "nom": row["nom"],
                "parent_id": self.regions_ids_by_code[row["codeRegion"]],
            },
        )
        return is_new


class CollectivitesOutreMerLoader(BaseLoader):
    entity_name = "Collectivités d’outre-mer"
    zone_geographique_type = ZoneGeographique.Type.COM

    def _discover(self) -> list[dict]:
        coms = []
        for code in range(975, 1000):
            r = requests.get(f"https://geo.api.gouv.fr/regions/{code}")
            if r.status_code == 404:
                continue
            coms.append(r.json())
        return coms


class EpcisLoader(BaseLoader):
    entity_name = "EPCIs"
    zone_geographique_type = ZoneGeographique.Type.EPCI
    geoapi_entity = "epcis"


class CommunesLoader(BaseLoader):
    entity_name = "Communes"
    zone_geographique_type = ZoneGeographique.Type.COMMUNE
    geoapi_entity = "communes"

    def __init__(self):
        self.departements_ids_by_code = {
            zone.code: zone.pk
            for zone in ZoneGeographique.objects.filter(
                type=ZoneGeographique.Type.DEPARTEMENT
            )
        }
        self.coms_ids_by_code = {
            zone.code: zone.pk
            for zone in ZoneGeographique.objects.filter(type=ZoneGeographique.Type.COM)
        }
        self.epcis_ids_by_code = {
            zone.code: zone.pk
            for zone in ZoneGeographique.objects.filter(type=ZoneGeographique.Type.EPCI)
        }

    def _upsert(self, code: str, row: dict) -> bool:
        if row["codeDepartement"] in self.departements_ids_by_code:
            parent_id = self.departements_ids_by_code[row["codeDepartement"]]
        elif row["codeDepartement"] in self.coms_ids_by_code:
            parent_id = self.coms_ids_by_code[row["codeDepartement"]]
        else:
            raise ValueError(
                f"Commune {row['code']} impossible à rattacher à une collectivité territoriale."
            )

        _, is_new = ZoneGeographique.objects.get_or_create(
            type=ZoneGeographique.Type.COMMUNE,
            code=row["code"],
            nom=row["nom"],
            parent_id=parent_id,
            code_postal=row["codesPostaux"][0] if row["codesPostaux"] else "",
            epci_id=self.epcis_ids_by_code[row["codeEpci"]]
            if "codeEpci" in row
            else None,
        )
        return is_new


class Command(BaseCommand):
    def handle(self, *args, **options):
        RegionsLoader().load()
        DepartementsLoader().load()
        CollectivitesOutreMerLoader().load()
        EpcisLoader().load()
        CommunesLoader().load()
