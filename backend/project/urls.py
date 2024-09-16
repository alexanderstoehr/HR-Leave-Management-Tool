"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views     #JWT

# +++ SWAGGER
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
# ... SWAGGER

schema_view = get_schema_view(
   openapi.Info(
      title="Final Project Backend",
      default_version='v1',
      description="Description of your Django App",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="luka.cafuta.dev@gmail.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,     # Set to False restrict access to protected endpoints
   permission_classes=(permissions.AllowAny,),      # Permissions for docs access
)

urlpatterns = [
    path("admin/", admin.site.urls),

    # absence
    path('absences/', include('absenceRequests.urls')),

    # trainings
    path('trainings/', include('trainingRequests.urls')),

    # users
    path('users/', include('userProfile.urls')),

    # company
    path('companies/', include('companiesProfile.urls')),

    # department
    path('departments/', include('department.urls')),

    # time dependent variables
    path('timedepvar/', include('timeDependentVar.urls')),

    # CALCULATIONS
    path('kpi/', include('kpi.urls')),


    # +++ JWT
    # path('api/auth/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/auth/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/auth/token/verify/',  jwt_views.TokenVerifyView.as_view(), name='token_verify'),
    # ... JWT

    # +++ JWT
    path('auth/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/verify/',  jwt_views.TokenVerifyView.as_view(), name='token_verify'),
    # ... JWT

    # +++ SWAGGER
    path('backend/api/docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    # ... SWAGGER



]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
