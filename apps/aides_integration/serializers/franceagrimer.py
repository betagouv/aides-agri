from django.contrib.auth.base_user import AbstractBaseUser
from rest_framework import serializers, fields

from ..models.franceagrimer import RawAideFranceAgriMer
from ._base import RawAideSerializer


class RawAideFranceAgriMerSerializer(RawAideSerializer):
    id = serializers.CharField(source="id_externe")

    class Meta:
        model = RawAideFranceAgriMer
        exclude = ("source", "status", "aide", "id_externe")

    def __init__(
        self, data=fields.empty, source_user: AbstractBaseUser = None, **kwargs
    ):
        super().__init__(data=data, source_user=source_user, **kwargs)
        if data is not fields.empty and self.is_valid():
            try:
                self.instance = RawAideFranceAgriMer.objects.get(
                    source=source_user.get_username().upper(),
                    id_externe=self.validated_data["id_externe"],
                )
            except RawAideFranceAgriMer.DoesNotExist:
                pass
