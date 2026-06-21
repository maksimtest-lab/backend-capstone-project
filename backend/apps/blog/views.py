from django.db.models import F
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from apps.common.permissions import IsAuthorOrReadOnly

from .models import BlogPost, BlogCategory, BlogTag
from .serializers import (
    BlogPostSerializer,
    BlogPostWriteSerializer,
    BlogCategorySerializer,
    BlogTagSerializer,
)


@extend_schema_view(
    list=extend_schema(summary="Список блог-постов", tags=["Blog"]),
    retrieve=extend_schema(summary="Получить блог-пост", tags=["Blog"]),
    create=extend_schema(summary="Создать блог-пост", tags=["Blog"]),
    update=extend_schema(summary="Обновить блог-пост", tags=["Blog"]),
    partial_update=extend_schema(summary="Частично обновить блог-пост", tags=["Blog"]),
    destroy=extend_schema(summary="Удалить блог-пост", tags=["Blog"]),
)
class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.filter(status="published")
    lookup_field = "slug"
    lookup_url_kwarg = "slug"

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "content"]
    ordering_fields = ["created_at", "views"]

    permission_classes = [IsAuthorOrReadOnly]

    def get_serializer_class(self):
        if self.action in ["create", "update", "partial_update"]:
            return BlogPostWriteSerializer
        return BlogPostSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        # Инкремент просмотров
        BlogPost.objects.filter(pk=instance.pk).update(views=F("views") + 1)
        instance.refresh_from_db()

        return super().retrieve(request, *args, **kwargs)

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
