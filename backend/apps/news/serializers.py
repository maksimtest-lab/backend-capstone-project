from rest_framework import serializers
from easy_thumbnails.files import get_thumbnailer
from .models import NewsArticle, NewsCategory


class NewsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsCategory
        fields = "__all__"


class NewsArticleSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField()
    category = NewsCategorySerializer()
    thumbnail = serializers.SerializerMethodField()
    cover_image = serializers.SerializerMethodField()

    class Meta:
        model = NewsArticle
        fields = "__all__"


    def get_thumbnail(self, obj):
        if obj.cover_image:
            return get_thumbnailer(obj.cover_image)["small"].url
        return None


    def get_cover_image(self, obj):
        if obj.cover_image:
            return get_thumbnailer(obj.cover_image)["large"].url
            return obj.cover_image.url  # относительный путь, без http://127.0.0.1:8000
        return None