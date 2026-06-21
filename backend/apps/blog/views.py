from rest_framework import viewsets, filters
from .models import BlogPost, BlogCategory, BlogTag
from .serializers import (
    BlogPostSerializer,
    BlogCategorySerializer,
    BlogTagSerializer,
)


from drf_spectacular.utils import extend_schema, extend_schema_view

@extend_schema_view(
    list=extend_schema(summary="Список блог-постов", tags=["Blog"]),
    retrieve=extend_schema(summary="Получить блог-пост", tags=["Blog"]),
)
class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.filter(status="published")
    serializer_class = BlogPostSerializer

    lookup_field = "slug"
    lookup_url_kwarg = "slug"

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "content"]
    ordering_fields = ["created_at", "views"]

@extend_schema(tags=["Blog Categories"])
class BlogCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer

    lookup_field = "slug"
    lookup_url_kwarg = "slug"


@extend_schema(tags=["Blog Tags"])
class BlogTagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogTag.objects.all()
    serializer_class = BlogTagSerializer

    lookup_field = "slug"
    lookup_url_kwarg = "slug"
