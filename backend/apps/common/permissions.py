from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAuthorOrReadOnly(BasePermission):
    """
    Решаем что можно делать:
    - чтение всем
    - создание авторизованным
    - изменение/удаление только автору или админу
    """

    def has_permission(self, request, view):
        # Чтение — всем
        if request.method in SAFE_METHODS:
            return True

        # Создание — только авторизованным
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Чтение — всем
        if request.method in SAFE_METHODS:
            return True

        # Изменение/удаление — только автору или админу
        return obj.author == request.user or request.user.is_superuser
