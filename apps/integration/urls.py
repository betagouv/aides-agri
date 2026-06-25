from rest_framework import routers

from .views import RawDataSchemaDispositifAideViewSet


router = routers.SimpleRouter()
router.register(r"schema_dispositif_aide", RawDataSchemaDispositifAideViewSet)

urlpatterns = router.urls
