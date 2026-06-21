from rest_framework.routers import DefaultRouter
from .views import BlogPostViewSet, BlogCategoryViewSet, BlogTagViewSet

router = DefaultRouter()
router.register("posts", BlogPostViewSet)
router.register("categories", BlogCategoryViewSet)
router.register("tags", BlogTagViewSet)

urlpatterns = router.urls
