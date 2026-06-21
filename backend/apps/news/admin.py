from django.utils.html import format_html
from django.contrib import admin
from .models import NewsArticle, NewsCategory


@admin.register(NewsCategory)
class NewsCategoryAdmin(admin.ModelAdmin):
    list_display = ("title", "slug")
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title",)


@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "status", "published_at", "cover_preview")
    list_filter = ("status", "category")
    search_fields = ("title", "content", "source")
    prepopulated_fields = {"slug": ("title",)}
    autocomplete_fields = ("category",)
    date_hierarchy = "published_at"
    exclude = ("author",)

    def cover_preview(self, obj):
        if obj.cover_image:
            return format_html(
                '<img src="{}" style="width: 100px; height: auto; border-radius: 4px;" />',
                obj.cover_image.url
            )
        return "—"

    cover_preview.short_description = "Обложка"

    def has_change_permission(self, request, obj=None):
        # Админ может всё
        if request.user.is_superuser:
            return True

        # Если объект не передан — разрешаем (чтобы список показывался)
        if obj is None:
            return True

        # Разрешаем менять только свои
        return obj.author == request.user

    def has_delete_permission(self, request, obj=None):
        # Админ может всё
        if request.user.is_superuser:
            return True

        if obj is None:
            return True

        return obj.author == request.user

    def save_model(self, request, obj, form, change):
        if not obj.pk or not obj.author:
            obj.author = request.user
        super().save_model(request, obj, form, change)
