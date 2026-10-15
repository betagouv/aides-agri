from typing import Any

from django.db.models import QuerySet, Q

from aides.models import (
    Aide,
    BaseJuridique,
    Programme,
    Type,
    ZoneGeographique,
    Organisme,
)

from ..models.base import RawAide


class BaseAideAdapter:
    def __init__(self):
        self.errors = []

    def create(self, raw_aide: RawAide) -> Aide:
        raise NotImplementedError()

    def update(self, aide: Aide, raw_aide: RawAide):
        raise NotImplementedError()

    def _find_programmes(self, raw_programmes: set[str]) -> QuerySet[Programme]:
        if not raw_programmes:
            return Programme.objects.none()
        q_lookup = Q()
        for raw_programme in raw_programmes:
            q_lookup |= Q(nom__iexact=raw_programme)
        programmes = Programme.objects.filter(q_lookup)
        if programmes.count() != len(raw_programmes):
            missing = raw_programmes.difference(
                set(list(programmes.values_list("nom", flat=True)))
            )
            self.errors.append(f"Certains programmes n’ont pas été trouvés : {missing}")
        return programmes

    def _find_categories_entreprise(
        self,
        raw_categories_entreprise: set[str],
    ) -> set[Aide.CategorieEntreprise]:
        categories_entreprise = set()
        missing = set()
        for raw_categorie_entreprise in raw_categories_entreprise:
            try:
                categories_entreprise.add(
                    Aide.CategorieEntreprise[raw_categorie_entreprise.upper()]
                )
            except ValueError:
                missing.add(raw_categorie_entreprise)
        if missing:
            self.errors.append(
                f"Certaines catégories d’entreprises n’ont pas été trouvées : {missing}"
            )
        return categories_entreprise

    def _find_types_aides(self, raw_types_aides: set[str]) -> set[Type]:
        types_aides = set()
        missing = set()
        for raw_type_aides in raw_types_aides:
            try:
                types_aides.add(Type.objects.get(nom__iexact=raw_type_aides))
            except Type.DoesNotExist:
                missing.add(raw_type_aides)
        if missing:
            self.errors.append(
                f"Certains types d’aides n’ont pas été trouvés : {missing}"
            )
        return types_aides

    def _find_zones_geographiques(
        self, raw_zones_geographiques: set[str]
    ) -> QuerySet[ZoneGeographique]:
        if not raw_zones_geographiques:
            return ZoneGeographique.objects.none()
        q_lookup = Q()
        for raw_territoire in raw_zones_geographiques:
            q_lookup |= Q(code_cog__iexact=raw_territoire)
        zones_geographiques = ZoneGeographique.objects.filter(q_lookup)
        if zones_geographiques.count() != len(raw_zones_geographiques):
            missing = raw_zones_geographiques.difference(
                set(list(zones_geographiques.values_list("nom", flat=True)))
            )
            self.errors.append(
                f"Certaines zones géographiques n’ont pas été trouvées : {missing}"
            )
        return zones_geographiques

    def _find_organisme(self, raw_organisme_siren: str) -> Organisme | None:
        return Organisme.objects.filter(siren=raw_organisme_siren).first()

    def _find_bases_juridiques(
        self, raw_bases_juridiques: list[dict[str, Any]]
    ) -> list[BaseJuridique]:
        bases_juridiques = []
        missing = set()
        for raw_base_juridique in raw_bases_juridiques:
            try:
                bases_juridiques.append(
                    BaseJuridique.objects.get(url=raw_base_juridique["lien"])
                )
            except BaseJuridique.DoesNotExist:
                missing.add(raw_base_juridique)
        if missing:
            self.errors.append(
                f"Certaines bases juridiques n’ont pas été trouvées : {missing}."
            )
        return bases_juridiques
