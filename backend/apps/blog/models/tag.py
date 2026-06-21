from django.db import models
import uuid


class BlogTag(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField("Метка", max_length=50, unique=True)
    slug = models.SlugField("Слаг", unique=True)

    class Meta:
        verbose_name = "Метка блога"
        verbose_name_plural = "Метки блога"

    def __str__(self):
        return self.title
