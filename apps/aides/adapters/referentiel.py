from referentiel.models import DemarcheAgricole

from ..models import Aide, Organisme, ZoneGeographique


def create_aide_from_demarche_agricole(demarche: DemarcheAgricole) -> Aide:
    aide = Aide.objects.create(
        status=Aide.Status.CHOSEN,
        nom=demarche.titre,
        promesse=demarche.promesse,
        description=demarche.description,
        organisme=Organisme.objects.get(
            nom__iexact=demarche.porteurs_aides.first().nom
        ),
    )
    aide.zones_geographiques.set(
        [
            ZoneGeographique.objects.get(type=t.type, code=t.code)
            for t in demarche.eligibilite_geographique.all()
        ]
    )
    return aide
