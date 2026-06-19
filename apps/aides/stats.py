import datetime

from stats.models import MetricEntry
from stats.registry import ImpactMatrix, Metric


aides_count = Metric(
    name="Nombre d’aides en ligne",
    description="C’est le nombre d’aides visibles sur le site Aides Agri à la fin de chaque mois."
    " Ce chiffre compte comme un seul dispositif les aides pilotées au niveau national mais déclinées au niveau local"
    " (par exemple, par les Directions Départementales du Territoire).",
    source="Interne",
    kind=ImpactMatrix.USABLE,
    unit="",
    model=MetricEntry,
)


def computes_aides_count_for_date(for_date: datetime.date):
