import uuid
from django.db import models
from django.contrib.auth import get_user_model
from apps.common.utils import unique_slugify
from .category import BlogCategory
from .tag import BlogTag

User = get_user_model()


class BlogPost(models.Model):
    STATUS_CHOICES = (
        ("draft", "Черновик"),
        ("published", "Опубликовано"),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(User, verbose_name="Автор", on_delete=models.CASCADE, related_name="blog_posts", blank=True, null=True)
    title = models.CharField("Заголовок", max_length=255)
    slug = models.SlugField("Слаг", unique=True)
    content = models.TextField("Текст")
    cover_image = models.ImageField("Обложка", upload_to="blog/covers/", blank=True, null=True)

    category = models.ForeignKey(
        BlogCategory, verbose_name="Раздел", on_delete=models.SET_NULL, null=True, related_name="posts"
    )
    tags = models.ManyToManyField(BlogTag, verbose_name="Метки", blank=True, related_name="posts")

    status = models.CharField("Статус", max_length=10, choices=STATUS_CHOICES, default="draft")
    created_at = models.DateTimeField("Дата создания", auto_now_add=True)
    updated_at = models.DateTimeField("Дата обновления", auto_now=True)

    views = models.PositiveIntegerField("Просмотры", default=0)

    class Meta:
        verbose_name = "Запись в блоге"
        verbose_name_plural = "Записи в блоге"
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = unique_slugify(self, self.title)
        super().save(*args, **kwargs)
