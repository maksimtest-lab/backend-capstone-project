"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.contrib import admin
from django.urls import path, include
from django.utils.safestring import mark_safe
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from drf_spectacular.utils import extend_schema
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)

from apps.users.jwt_views import (
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
)


admin.site.site_header = "Spaceso"
admin.site.site_title = "Spaceso Admin"
admin.site.index_title = mark_safe("&nbsp;")


urlpatterns = [
    path('admin/', admin.site.urls),

    # схема OpenAPI
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),

    # Swagger UI
    path(
        "api/schema/swagger/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),

    # ReDoc
    path(
        "api/schema/redoc/",
        SpectacularRedocView.as_view(url_name="schema"),
        name="redoc",
    ),

    # JWT
    # path(
    #     "api/v1/auth/token/",
    #     extend_schema(
    #         tags=["Auth"],
    #         summary="Получить JWT токен",
    #         description="Возвращает access и refresh токены.",
    #     )(TokenObtainPairView.as_view()),
    #     name="token_obtain_pair",
    # ),
    # path(
    #     "api/v1/auth/token/refresh/",
    #     extend_schema(
    #         tags=["Auth"],
    #         summary="Обновить JWT токен",
    #         description="Обновляет access токен по refresh токену.",
    #     )(TokenRefreshView.as_view()),
    #     name="token_refresh",
    # ),
    path("api/v1/auth/token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/v1/auth/token/refresh/", CustomTokenRefreshView.as_view(), name="token_refresh"),

    # Users API
    path("api/v1/users/", include("apps.users.urls")),
]

urlpatterns += [
    path("api/v1/blog/", include("apps.blog.urls")),
    path("api/v1/news/", include("apps.news.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
