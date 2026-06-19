from dataclasses import dataclass
from enum import StrEnum

from django.db.models import Model


class ImpactMatrix(StrEnum):
    USABLE = "Le produit est-il utilisable ?"
    USED = "Le produit est-il utilisé ?"
    USEFUL = "Le produit est-il utile ?"


@dataclass
class Metric:
    name: str
    description: str
    source: str
    kind: ImpactMatrix
    unit: str
    model: type[Model]


_registry = set()


def register(metric: Metric):
    _registry.add(metric)


def get_metrics():
    return _registry


__all__ = ["ImpactMatrix", "Metric", "register", "get_metrics"]
