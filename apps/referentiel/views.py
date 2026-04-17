from rest_framework import permissions, viewsets

from .models import Demarche
from .serializers import DemarcheReadSerializer


class DemarcheViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Demarche.objects.all()
    serializer_class = DemarcheReadSerializer
    permission_classes = [permissions.DjangoModelPermissions]
