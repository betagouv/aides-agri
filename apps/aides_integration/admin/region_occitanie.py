from django_auto_admin_fieldsets.admin import AutoFieldsetsMixin
from django.contrib import admin


from ..adapters.region_occitanie import RawAideRegionOccitanieAdapter
from ..models.region_occitanie import RawAideRegionOccitanie
from ._base import RawAideAdmin


@admin.register(RawAideRegionOccitanie)
class RawAideRegionOccitanieAdmin(AutoFieldsetsMixin, RawAideAdmin):
    list_display = ("__str__", "status")
    list_filter = ("status", "source")
    exclude = RawAideAdmin.exclude + ("hash",)
    aide_adapter = RawAideRegionOccitanieAdapter
