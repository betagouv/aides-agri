from rest_framework import permissions, viewsets

from .models import RawDemarcheSchemaAide
from .serializers import RawDemarcheSchemaAideSerializer


__all__ = ["RawDemarcheSchemaAideViewSet"]


class RawDemarcheSchemaAideViewSet(viewsets.ModelViewSet):
    queryset = RawDemarcheSchemaAide.objects.all()
    serializer_class = RawDemarcheSchemaAideSerializer
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
