from rest_framework import routers

from .views import RawAideFranceAgriMerViewSet


app_name = "aides_integration"
router = routers.SimpleRouter()
router.register(r"franceagrimer", RawAideFranceAgriMerViewSet)

urlpatterns = router.urls
