from rest_framework import permissions
from rest_framework import viewsets


class RawAideViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
        permissions.DjangoModelPermissions,
    ]

    def get_serializer(self, *args, **kwargs):
        return super().get_serializer(*args, source_user=self.request.user, **kwargs)

    def get_queryset(self):
        return self.queryset.filter(source=self.request.user.get_username().upper())
