from django.contrib.auth.base_user import AbstractBaseUser
from rest_framework import fields, serializers
import reversion


class RawAideSerializer(serializers.ModelSerializer):
    def __init__(
        self, data=fields.empty, source_user: AbstractBaseUser = None, **kwargs
    ):
        if not source_user:
            raise ValueError("RawAideSerializer requires a source_user kwarg")
        super().__init__(data=data, **kwargs)
        self.source_user = source_user

    def save(self, **kwargs):
        kwargs["source"] = self.source_user.get_username().upper()
        with reversion.create_revision():
            reversion.set_user(self.source_user)
            super().save(**kwargs)
