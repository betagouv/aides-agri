from django.db import transaction
from reversion.models import Version

from aides.models import Aide

from ..models.base import RawAide


class BaseAideAdapter:
    def __init__(self):
        self.errors = []

    def perform_create(self, raw_aide: RawAide) -> Aide:
        raise NotImplementedError()

    def perform_update(self, raw_aide: RawAide):
        raise NotImplementedError()

    def _mark_integrated(self, raw_aide: RawAide):
        raw_aide.status = RawAide.Status.DONE
        raw_aide.integrated_version = Version.objects.get_for_object(raw_aide).first()
        raw_aide.save()

    @transaction.atomic
    def create(self, raw_aide: RawAide):
        raw_aide.aide = self.perform_create(raw_aide)
        self.perform_update(raw_aide)
        self._mark_integrated(raw_aide)

    @transaction.atomic
    def update(self, raw_aide: RawAide):
        self.perform_update(raw_aide)
        self._mark_integrated(raw_aide)
