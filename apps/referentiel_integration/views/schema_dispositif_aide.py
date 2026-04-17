from rest_framework import permissions, viewsets

from ..models.schema_dispositif_aide import RawDemarcheSchemaDispositifAide
from ..serializers.schema_dispositif_aide import (
    RawDemarcheSchemaDispositifAideSerializer,
)


__all__ = ["RawDemarcheSchemaDispositifAideViewSet"]


class RawDemarcheSchemaDispositifAideViewSet(viewsets.ModelViewSet):
    queryset = RawDemarcheSchemaDispositifAide.objects.all()
    serializer_class = RawDemarcheSchemaDispositifAideSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        permissions.DjangoModelPermissions,
    ]

    def _get_source(self):
        return self.request.user.username.upper()

    def get_queryset(self):
        return self.queryset.filter(source=self._get_source())

    def get_serializer(self, *args, **kwargs):
        return super().get_serializer(*args, source=self._get_source(), **kwargs)

    def update(self, request, *args, **kwargs):
        self.create(request, *args, **kwargs)
