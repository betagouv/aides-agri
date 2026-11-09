from django_auto_admin_fieldsets.admin import AutoFieldsetsMixin
from django.contrib import admin


from ..models.franceagrimer import RawAideFranceAgriMer
from ._base import RawAideAdmin


@admin.register(RawAideFranceAgriMer)
class RawAideFranceAgriMerAdmin(AutoFieldsetsMixin, RawAideAdmin):
    list_display = ("__str__", "status")
    list_filter = ("status", "source")
