from django.contrib import admin
from django.contrib.auth.models import Group as AuthGroup
from .models import User, Group


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "email", "is_staff")


# Удаляем встроенную группу из админки
admin.site.unregister(AuthGroup)

# Регистрируем свою
@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ("name", "description")
