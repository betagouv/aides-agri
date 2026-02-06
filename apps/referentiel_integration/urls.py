from rest_framework import routers

from .views import DispositifSchemaAideViewSet


router = routers.SimpleRouter()
router.register(r"dispositif_schema_aides", DispositifSchemaAideViewSet)

urlpatterns = router.urls
