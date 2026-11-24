import reversion

from ..models.franceagrimer import RawAideFranceAgriMer
from ..serializers.franceagrimer import RawAideFranceAgriMerSerializer
from ._base import RawAideViewSet

__all__ = ["RawAideFranceAgriMerViewSet"]


class RawAideFranceAgriMerViewSet(RawAideViewSet):
    queryset = RawAideFranceAgriMer.objects.all()
    serializer_class = RawAideFranceAgriMerSerializer
    lookup_field = RawAideFranceAgriMer.id_externe.field.name

    def update(self, request, *args, **kwargs):
        self.create(request, *args, **kwargs)

    def perform_destroy(self, instance: RawAideFranceAgriMer):
        with reversion.create_revision():
            reversion.set_user(self.request.user)
            instance.status = RawAideFranceAgriMer.Status.DELETED
            instance.save()
