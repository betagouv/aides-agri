from typing import Any

from django.db.models import Q, QuerySet
from django.db import transaction

from referentiel.models import (
    DemarcheAgricole,
    Organisme,
    Porteur,
    Programme,
    Territoire,
)

from ..models import DispositifSchemaAide


def _find_programmes(raw_programmes: str) -> QuerySet[Programme]:
    raw_programmes = raw_programmes.split("|")
    q_lookup = Q()
    for raw_programme in raw_programmes:
        q_lookup |= Q(nom__iexact=raw_programme)
    programmes = Programme.objects.filter(q_lookup)
    if programmes.count() != len(raw_programmes):
        raise ValueError("Some programmes are missing")
    return programmes


def _find_cibles(raw_cibles: str) -> DemarcheAgricole.Cible | int:
    raw_cibles = raw_cibles.split("|")
    cibles = 0
    missing_raw_cibles = set()
    for raw_cible in raw_cibles:
        try:
            cibles |= DemarcheAgricole.Cible[raw_cible.upper()]
        except ValueError:
            missing_raw_cibles.add(raw_cible)
    if missing_raw_cibles:
        raise ValueError(f"Some cibles are missing: {missing_raw_cibles}")
    return cibles


def _find_types_aides(raw_types_aides: str) -> DemarcheAgricole.Type | int:
    raw_types = raw_types_aides.split("|")
    types_aides = 0
    missing_raw_types = set()
    for raw_type in raw_types:
        try:
            types_aides |= DemarcheAgricole.Type[raw_type.upper()]
        except ValueError:
            missing_raw_types.add(raw_type)
    if missing_raw_types:
        raise ValueError(f"Some types_aides are missing: {missing_raw_types}")
    return types_aides


def _find_territoires(raw_territoires: str) -> QuerySet[Territoire]:
    raw_territoires = raw_territoires.split("|")
    q_lookup = Q()
    for raw_territoire in raw_territoires:
        q_lookup |= Q(code_cog__iexact=raw_territoire)
    territoires = Territoire.objects.filter(q_lookup)
    if territoires.count() != len(raw_territoires):
        raise ValueError("Some zones géographiques are missing")
    return territoires


def _create_porteurs(
    raw_porteurs: list[dict[str, Any]], demarche: DemarcheAgricole
) -> list[Porteur]:
    to_create = []
    for raw_porteur in raw_porteurs:
        roles = 0
        for raw_role in raw_porteur["roles"]:
            roles |= Porteur.Role[raw_role.upper()]
        to_create.append(
            Porteur(
                demarche=demarche,
                organisme=Organisme.objects.get(nom=raw_porteur["nom"]),
                roles=roles,
            )
        )
    if len(to_create) != len(raw_porteurs):
        raise ValueError("Some porteurs could not be created")
    return Porteur.objects.bulk_create(to_create)


@transaction.atomic
def create_demarche_agricole(dispositif: DispositifSchemaAide):
    demarche = DemarcheAgricole()
    demarche.code = f"{dispositif.source}-{dispositif.id_externe}"
    demarche.url_source = dispositif.url_source
    demarche.titre = dispositif.titre
    demarche.promesse = dispositif.promesse
    demarche.description = dispositif.description
    demarche.eligibilite = dispositif.eligibilite
    demarche.date_ouverture = dispositif.date_ouverture
    demarche.date_cloture = dispositif.date_cloture
    demarche.save()
    demarche.types_aides = _find_types_aides(dispositif.types_aides)
    demarche.cibles = _find_cibles(dispositif.cibles)
    if dispositif.programmes_parents:
        demarche.programmes_parents.set(_find_programmes(dispositif.programmes_parents))
    if dispositif.eligibilite_geographique:
        demarche.eligibilite_geographique.set(
            _find_territoires(dispositif.eligibilite_geographique)
        )
    if dispositif.eligibilite_geographique_exclusions:
        demarche.eligibilite_geographique_exclusions.set(
            _find_territoires(dispositif.eligibilite_geographique_exclusions)
        )
    _create_porteurs(dispositif.porteurs, demarche)
    demarche.save()
