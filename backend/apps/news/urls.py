from rest_framework.routers import DefaultRouter
from .views import NewsArticleViewSet, NewsCategoryViewSet

router = DefaultRouter()
router.register("articles", NewsArticleViewSet)
router.register("categories", NewsCategoryViewSet)

urlpatterns = router.urls
