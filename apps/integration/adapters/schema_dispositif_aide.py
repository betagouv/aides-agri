from django.db import transaction

from referentiel.models import (
    Demarche,
    Porteur,
    BaseJuridique,
)
from ..models.base import RawData

from ..models.schema_dispositif_aide import RawDataSchemaDispositifAide, COG_PAYS
from ._base import BaseDemarcheAdapter


def _split_by_pipe_and_clean(value: str) -> set[str]:
    return set([w.strip() for w in value.split("|") if w.strip() != ""])


class SchemaDispositifAideDemarcheAdapter(BaseDemarcheAdapter):
    @transaction.atomic
    def create_demarche(self, raw_d: RawDataSchemaDispositifAide) -> Demarche:
        d = Demarche()
        d.code = f"{raw_d.source}-{raw_d.id_externe}"
        d.titre = raw_d.titre
        d.promesse = raw_d.promesse
        d.description = raw_d.description
        d.eligibilite = raw_d.eligibilite
        d.types_aides = self._find_types_aides(
            _split_by_pipe_and_clean(raw_d.types_aides)
        )
        d.url_source = raw_d.url_source
        d.cibles = self._find_cibles(_split_by_pipe_and_clean(raw_d.cibles))
        d.date_ouverture = raw_d.date_ouverture
        d.date_cloture = raw_d.date_cloture
        d.eligibilite_annees_existence_minimal = (
            raw_d.eligibilite_annees_existence_minimal
        )
        d.eligibilite_effectif_minimal = raw_d.eligibilite_effectif_minimal
        d.eligibilite_effectif_maximal = raw_d.eligibilite_effectif_maximal
        d.eligibilite_categorie_taille_entreprise = self._find_categories_entreprise(
            _split_by_pipe_and_clean(raw_d.eligibilite_categorie_taille_entreprise)
        )
        d.ciblage_secteur_activite = list(
            _split_by_pipe_and_clean(raw_d.ciblage_secteur_activite)
        )
        d.ciblage_naf = list(_split_by_pipe_and_clean(raw_d.ciblage_naf))
        d.ciblage_naf_exclusions = list(
            _split_by_pipe_and_clean(raw_d.ciblage_naf_exclusions)
        )
        d.eligibilite_forme_juridique = list(
            _split_by_pipe_and_clean(raw_d.eligibilite_forme_juridique)
        )
        d.eligibilite_forme_juridique_exclusions = list(
            _split_by_pipe_and_clean(raw_d.eligibilite_forme_juridique_exclusions)
        )
        d.save()
        Porteur.objects.bulk_create(self._build_porteurs(raw_d.porteurs, d))
        BaseJuridique.objects.bulk_create(
            self._build_base_juridique(raw_d.base_juridique, d)
        )
        d.programmes_parents.set(
            self._find_programmes(_split_by_pipe_and_clean(raw_d.programmes_parents))
        )
        # todo referents_internes
        d.eligibilite_geographique.set(
            self._find_territoires(
                _split_by_pipe_and_clean(raw_d.eligibilite_geographique).difference(
                    {COG_PAYS}
                )
            )
        )
        d.eligibilite_geographique_exclusions.set(
            self._find_territoires(
                _split_by_pipe_and_clean(
                    raw_d.eligibilite_geographique_exclusions
                ).difference({COG_PAYS})
            )
        )
        raw_d.demarche = d
        raw_d.status = RawDataSchemaDispositifAide.Status.DONE
        raw_d.save(update_status=False)
        return d

    def update(self, demarche: Demarche, raw_data: RawData):
        pass
