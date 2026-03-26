from rest_framework import permissions, viewsets

from .models import DemarcheAgricole
from .serializers import DemarcheReadSerializer


class DemarcheViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DemarcheAgricole.objects.all()
    serializer_class = DemarcheReadSerializer
    permission_classes = [permissions.DjangoModelPermissions]
