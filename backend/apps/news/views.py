from rest_framework import viewsets, filters
from drf_spectacular.utils import extend_schema, extend_schema_view
from .models import NewsArticle, NewsCategory
from .serializers import NewsArticleSerializer, NewsCategorySerializer

@extend_schema_view(
    list=extend_schema(summary="Список новостей", tags=["News"]),
    retrieve=extend_schema(summary="Получить новость", tags=["News"]),
)
class NewsArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NewsArticle.objects.filter(status="published")
    serializer_class = NewsArticleSerializer

    lookup_field = "slug"
    lookup_url_kwarg = "slug"

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "content", "source"]
    ordering_fields = ["published_at", "views"]

@extend_schema(tags=["News Categories"])
class NewsCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NewsCategory.objects.all()
    serializer_class = NewsCategorySerializer

    lookup_field = "slug"
    lookup_url_kwarg = "slug"