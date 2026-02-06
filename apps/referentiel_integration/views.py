from rest_framework import permissions, viewsets

from .models import DispositifSchemaAide
from .serializers import DispositifSchemaAideSerializer


__all__ = ["DispositifSchemaAideViewSet"]


class DispositifSchemaAideViewSet(viewsets.ModelViewSet):
    queryset = DispositifSchemaAide.objects.all()
    serializer_class = DispositifSchemaAideSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        permissions.DjangoModelPermissions,
    ]

    def perform_create(self, serializer):
        serializer.save(source=self.request.user.username.upper())
