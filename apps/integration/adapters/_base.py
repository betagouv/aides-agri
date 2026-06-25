from typing import Any

from django.db.models import QuerySet, Q

from aides.models import Aide
from referentiel.models import (
    Demarche,
    Organisme,
    Porteur,
    Programme,
    Territoire,
    BaseJuridique,
)

from ..models.base import RawData


class BaseDemarcheAdapter:
    def __init__(self):
        self.errors = []

    def integrate(self, raw_data: RawData) -> Demarche:
        raise NotImplementedError()

    def update(self, demarche: Demarche, raw_data: RawData):
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
            self.errors.append(
                f"Certains programmes n’ont pas été trouvés dans le référentiel : {missing}"
            )
        return programmes

    def _find_cibles(self, raw_cibles: set[str]) -> Demarche.Cible | int:
        cibles = 0
        missing = set()
        for raw_cible in raw_cibles:
            try:
                cibles |= Demarche.Cible[raw_cible.upper()]
            except ValueError:
                missing.add(raw_cible)
        if missing:
            self.errors.append(
                f"Certaines cibles n’ont pas été trouvées dans le référentiel : {missing}"
            )
        return cibles

    def _find_categories_entreprise(
        self,
        raw_categories_entreprise: set[str],
    ) -> Demarche.CategorieEntreprise | int:
        categories_entreprise = 0
        missing = set()
        for raw_categorie_entreprise in raw_categories_entreprise:
            try:
                categories_entreprise |= Demarche.Cible[
                    raw_categorie_entreprise.upper()
                ]
            except ValueError:
                missing.add(raw_categorie_entreprise)
        if missing:
            self.errors.append(
                f"Certaines catégories d’entreprises n’ont pas été trouvées dans le référentiel : {missing}"
            )
        return categories_entreprise

    def _find_types_aides(self, raw_types_aides: set[str]) -> Demarche.Type | int:
        types_aides = 0
        missing = set()
        for raw_type_aides in raw_types_aides:
            try:
                types_aides |= Demarche.Type[raw_type_aides.upper()]
            except ValueError:
                missing.add(raw_type_aides)
        if missing:
            self.errors.append(
                f"Certains types d’aides n’ont pas été trouvés dans le référentiel : {missing}"
            )
        return types_aides

    def _find_territoires(self, raw_territoires: set[str]) -> QuerySet[Territoire]:
        if not raw_territoires:
            return Territoire.objects.none()
        q_lookup = Q()
        for raw_territoire in raw_territoires:
            q_lookup |= Q(code_cog__iexact=raw_territoire)
        territoires = Territoire.objects.filter(q_lookup)
        if territoires.count() != len(raw_territoires):
            missing = raw_territoires.difference(
                set(list(territoires.values_list("nom", flat=True)))
            )
            self.errors.append(
                f"Certains territoires n’ont pas été trouvés dans le référentiel : {missing}"
            )
        return territoires

    def _build_porteurs(
        self, raw_porteurs: list[dict[str, Any]], demarche: Demarche
    ) -> list[Porteur]:
        porteurs = []
        for raw_porteur in raw_porteurs:
            roles = 0
            for raw_role in raw_porteur["roles"]:
                roles |= Porteur.Role[raw_role.upper()]
            try:
                porteurs.append(
                    Porteur(
                        demarche=demarche,
                        organisme=Organisme.objects.get(nom__iexact=raw_porteur["nom"]),
                        roles=roles,
                    )
                )
            except Organisme.DoesNotExist:
                self.errors.append(
                    f"Un organisme porteur n’a pas été trouvé dans le référentiel : {raw_porteur['nom']}"
                )
        if len(porteurs) != len(raw_porteurs):
            self.errors.append("Certains porteurs n’ont pas pu être créés.")
        return porteurs

    def _build_base_juridique(
        self, raw_bases_juridiques: list[dict[str, Any]], demarche: Demarche
    ) -> list[BaseJuridique]:
        base_juridique = []
        for raw_base_juridique in raw_bases_juridiques:
            base_juridique.append(
                BaseJuridique(
                    demarche=demarche,
                    libelle=raw_base_juridique["libelle"],
                    url=raw_base_juridique["lien"],
                )
            )
        if len(base_juridique) != len(raw_bases_juridiques):
            self.errors.append("Certaines bases juridiques n’ont pas pu être créées.")
        return base_juridique


class BaseAideAdapter:
    def __init__(self):
        self.errors = []

    def integrate(self, raw_data: RawData) -> Aide:
        raise NotImplementedError()

    def update(self, aide: Aide, raw_data: RawData):
        raise NotImplementedError()
