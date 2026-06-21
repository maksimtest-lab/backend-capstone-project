from drf_spectacular.utils import OpenApiExample, extend_schema_serializer
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


@extend_schema_serializer(
    examples=[
        OpenApiExample(
            "Пример регистрации",
            value={
                "username": "maksim",
                "email": "maksim@example.com",
                "password": "StrongPassword123",
            },
        )
    ]
)
class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "email", "password")

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            password=validated_data["password"],
        )

    def update(self, instance, validated_data):
        instance.username = validated_data.get("username", instance.username)
        instance.email = validated_data.get("email", instance.email)
        instance.set_password(validated_data.get("password", instance.password))
        instance.save()
        return instance