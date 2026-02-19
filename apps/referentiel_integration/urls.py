from rest_framework import routers

from .views import RawDemarcheSchemaAideViewSet


router = routers.SimpleRouter()
router.register(r"schema_aides", RawDemarcheSchemaAideViewSet)

urlpatterns = router.urls
