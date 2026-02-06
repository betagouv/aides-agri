from rest_framework import routers

from .views import DemarcheViewSet


router = routers.SimpleRouter()
router.register(r"demarches", DemarcheViewSet)

urlpatterns = router.urls
