from typing import Any

from django.db.models import Q, QuerySet
from django.db import transaction

from referentiel.models import (
    Demarche,
    Organisme,
    Porteur,
    Programme,
    Territoire,
    BaseJuridique,
)
from ..models.base import RawDemarche

from ..models.schema_dispositif_aide import RawDemarcheSchemaDispositifAide, COG_PAYS
from ._base import BaseIntegrationAdapter


class SchemaDispositifAideIntegrationAdapter(BaseIntegrationAdapter):
    @staticmethod
    def _split_by_pipe_and_clean(value: str) -> set[str]:
        return set([w.strip() for w in value.split("|") if w.strip() != ""])

    def _find_programmes(self, raw_programmes: str) -> QuerySet[Programme]:
        raw_programmes = self._split_by_pipe_and_clean(raw_programmes)
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

    def _find_cibles(self, raw_cibles: str) -> Demarche.Cible | int:
        raw_cibles = self._split_by_pipe_and_clean(raw_cibles)
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
        raw_categories_entreprise: str,
    ) -> Demarche.CategorieEntreprise | int:
        raw_categories_entreprise = self._split_by_pipe_and_clean(
            raw_categories_entreprise
        )
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

    def _find_types_aides(self, raw_types_aides: str) -> Demarche.Type | int:
        raw_types = self._split_by_pipe_and_clean(raw_types_aides)
        types_aides = 0
        missing = set()
        for raw_type in raw_types:
            try:
                types_aides |= Demarche.Type[raw_type.upper()]
            except ValueError:
                missing.add(raw_type)
        if missing:
            self.errors.append(
                f"Certains types d’aides n’ont pas été trouvés dans le référentiel : {missing}"
            )
        return types_aides

    def _find_territoires(self, raw_territoires: str) -> QuerySet[Territoire]:
        raw_territoires = self._split_by_pipe_and_clean(raw_territoires).difference(
            {COG_PAYS}
        )
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

    @transaction.atomic
    def create_demarche(self, raw_d: RawDemarcheSchemaDispositifAide) -> Demarche:
        d = Demarche()
        d.code = f"{raw_d.source}-{raw_d.id_externe}"
        d.titre = raw_d.titre
        d.promesse = raw_d.promesse
        d.description = raw_d.description
        d.eligibilite = raw_d.eligibilite
        d.types_aides = self._find_types_aides(raw_d.types_aides)
        d.url_source = raw_d.url_source
        d.cibles = self._find_cibles(raw_d.cibles)
        d.date_ouverture = raw_d.date_ouverture
        d.date_cloture = raw_d.date_cloture
        d.eligibilite_annees_existence_minimal = (
            raw_d.eligibilite_annees_existence_minimal
        )
        d.eligibilite_effectif_minimal = raw_d.eligibilite_effectif_minimal
        d.eligibilite_effectif_maximal = raw_d.eligibilite_effectif_maximal
        d.eligibilite_categorie_taille_entreprise = self._find_categories_entreprise(
            raw_d.eligibilite_categorie_taille_entreprise
        )
        d.ciblage_secteur_activite = list(
            self._split_by_pipe_and_clean(raw_d.ciblage_secteur_activite)
        )
        d.ciblage_naf = list(self._split_by_pipe_and_clean(raw_d.ciblage_naf))
        d.ciblage_naf_exclusions = list(
            self._split_by_pipe_and_clean(raw_d.ciblage_naf_exclusions)
        )
        d.eligibilite_forme_juridique = list(
            self._split_by_pipe_and_clean(raw_d.eligibilite_forme_juridique)
        )
        d.eligibilite_forme_juridique_exclusions = list(
            self._split_by_pipe_and_clean(raw_d.eligibilite_forme_juridique_exclusions)
        )
        d.save()
        Porteur.objects.bulk_create(self._build_porteurs(raw_d.porteurs, d))
        BaseJuridique.objects.bulk_create(
            self._build_base_juridique(raw_d.base_juridique, d)
        )
        d.programmes_parents.set(self._find_programmes(raw_d.programmes_parents))
        # todo referents_internes
        d.eligibilite_geographique.set(
            self._find_territoires(raw_d.eligibilite_geographique)
        )
        d.eligibilite_geographique_exclusions.set(
            self._find_territoires(raw_d.eligibilite_geographique_exclusions)
        )
        raw_d.demarche = d
        raw_d.status = RawDemarcheSchemaDispositifAide.Status.DONE
        raw_d.save(update_status=False)
        return d

    def update(self, demarche: Demarche, raw_demarche: RawDemarche):
        pass
