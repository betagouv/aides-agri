from rest_framework import routers

from .views import RawDemarcheSchemaDispositifAideViewSet


router = routers.SimpleRouter()
router.register(r"schema_dispositif_aide", RawDemarcheSchemaDispositifAideViewSet)

urlpatterns = router.urls
