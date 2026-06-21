from django.db import models
import uuid


class BlogCategory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField("Заголовок", max_length=120, unique=True)
    slug = models.SlugField("Слаг", unique=True)

    class Meta:
        verbose_name = "Раздел блога"
        verbose_name_plural = "Разделы блога"

    def __str__(self):
        return self.title
