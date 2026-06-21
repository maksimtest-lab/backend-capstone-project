from rest_framework import serializers
from easy_thumbnails.files import get_thumbnailer
from .models import BlogPost, BlogCategory, BlogTag


class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = "__all__"


class BlogTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogTag
        fields = "__all__"


class BlogPostSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()
    cover_image = serializers.SerializerMethodField()
    category = BlogCategorySerializer()
    tags = BlogTagSerializer(many=True)

    class Meta:
        model = BlogPost
        fields = "__all__"

    def get_thumbnail(self, obj):
        if not obj.cover_image:
            return None
        return get_thumbnailer(obj.cover_image)["small"].url


    def get_cover_image(self, obj):
        if obj.cover_image:
            return get_thumbnailer(obj.cover_image)["large"].url
            # return obj.cover_image.url  # относительный путь, без http://127.0.0.1:8000
        return None


class BlogPostWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = [
            "title",
            "slug",
            "content",
            "cover_image",
            "category",
            "tags",
            "status",
        ]