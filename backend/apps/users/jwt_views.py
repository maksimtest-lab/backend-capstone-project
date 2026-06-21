from drf_spectacular.utils import extend_schema
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


@extend_schema(
    tags=["Auth"],
    summary="Получить JWT токен",
    description="Возвращает access и refresh токены.",
)
class CustomTokenObtainPairView(TokenObtainPairView):
    pass


@extend_schema(
    tags=["Auth"],
    summary="Обновить JWT токен",
    description="Обновляет access токен по refresh токену.",
)
class CustomTokenRefreshView(TokenRefreshView):
    pass
