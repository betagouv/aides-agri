from referentiel.models import Demarche

from ..models.base import RawDemarche


class BaseIntegrationAdapter:
    def __init__(self):
        self.errors = []

    def integrate(self, raw_demarche: RawDemarche) -> Demarche:
        raise NotImplementedError()

    def update(self, demarche: Demarche, raw_demarche: RawDemarche):
        raise NotImplementedError()
