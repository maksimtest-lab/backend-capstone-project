from django.db.models import F
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from apps.common.permissions import IsAuthorOrReadOnly

from .models import NewsArticle, NewsCategory
from .serializers import (
    NewsArticleSerializer,
    NewsArticleWriteSerializer,
    NewsCategorySerializer,
)

@extend_schema_view(
    list=extend_schema(summary="Список новостей", tags=["News"]),
    retrieve=extend_schema(summary="Получить новость", tags=["News"]),
    create=extend_schema(summary="Создать новость", tags=["News"]),
    update=extend_schema(summary="Обновить новость", tags=["News"]),
    partial_update=extend_schema(summary="Частично обновить новость", tags=["News"]),
    destroy=extend_schema(summary="Удалить новость", tags=["News"]),
)
class NewsArticleViewSet(viewsets.ModelViewSet):
    queryset = NewsArticle.objects.filter(status="published")
    lookup_field = "slug"
    lookup_url_kwarg = "slug"

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "content", "source"]
    ordering_fields = ["published_at", "views"]

    permission_classes = [IsAuthorOrReadOnly]

    def get_serializer_class(self):
        if self.action in ["create", "update", "partial_update"]:
            return NewsArticleWriteSerializer
        return NewsArticleSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        # Инкремент просмотров
        NewsArticle.objects.filter(pk=instance.pk).update(views=F("views") + 1)
        instance.refresh_from_db()

        return super().retrieve(request, *args, **kwargs)

@extend_schema(tags=["News Categories"])
class NewsCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NewsCategory.objects.all()
    serializer_class = NewsCategorySerializer

    lookup_field = "slug"
    lookup_url_kwarg = "slug"