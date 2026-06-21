from django.contrib.auth.models import Group
from django.db import models


class Group(Group):
    description = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = "Группа"
        verbose_name_plural = "Группы"

    def __str__(self):
        return self.name