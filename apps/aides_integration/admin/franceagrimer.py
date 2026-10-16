from admin_extra_buttons.api import ExtraButtonsMixin
from django_auto_admin_fieldsets.admin import AutoFieldsetsMixin
from django.contrib import admin


from ..models.franceagrimer import RawAideFranceAgriMer
from ._base import RawAideAdmin


@admin.register(RawAideFranceAgriMer)
class RawDataFranceAgriMerAdmin(AutoFieldsetsMixin, ExtraButtonsMixin, RawAideAdmin):
    list_display = ("__str__", "status")
    list_filter = ("status", "source")
