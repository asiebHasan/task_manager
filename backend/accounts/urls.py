from django.urls import path, include
from .views import UserRegistrationAPIView, CustomObtainAuthToken, TaskViewSet
from rest_framework.authtoken import views
from rest_framework.routers import DefaultRouter

app_name = 'accounts'

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('register/', UserRegistrationAPIView.as_view(), name='register'),
    path('login/', CustomObtainAuthToken.as_view(), name='login'),
    path('', include(router.urls)),
]
