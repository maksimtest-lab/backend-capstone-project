from django.db import models
import uuid


class NewsCategory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField("Заголовок", max_length=120, unique=True)
    slug = models.SlugField("Слаг", unique=True)

    class Meta:
        verbose_name = "Раздел новости"
        verbose_name_plural = "Разделы новостей"

    def __str__(self):
        return self.title
