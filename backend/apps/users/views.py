from drf_spectacular.utils import extend_schema
from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer

User = get_user_model()


@extend_schema(
    tags=["Users"],
    summary="Регистрация нового пользователя",
    description="Создаёт нового пользователя по email, username и password.",
    responses={201: RegisterSerializer},
)
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]
