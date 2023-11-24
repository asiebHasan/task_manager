from rest_framework import status, viewsets, permissions
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from django.utils import timezone

from .permissions import IsTaskOwner
from .serializers import UserSerializer, TaskSerializer
from .models import Task
# Create your views here.

class UserRegistrationAPIView(CreateAPIView):
    authentication_classes = ()
    permission_classes = ()

    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        user = serializer.instance
        token, created = Token.objects.get_or_create(user=user)
        data = serializer.data
        data['token'] = token.key

        headers =self.get_success_headers(serializer.data)
        return Response(data, status=status.HTTP_201_CREATED, headers=headers)
    
class CustomObtainAuthToken(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if username is None or password is None:
            return Response({'error': 'Please provide both username and password'},
                            status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(username=username, password=password)
        
        if not user:
            return Response({'error': 'Invalid Credentials'},
                            status=status.HTTP_404_NOT_FOUND)
        
        token, _ = Token.objects.get_or_create(user=user)
        
        user_info = {
            'id': user.id, 
            'username': user.username,
            'email': user.email,
            'token':token.key
        }
        
        return Response(user_info)
    
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated, IsTaskOwner]

    def perform_create(self, serializer):
        # Set the user field to the authenticated user
        serializer.save(user=self.request.auth.user)
    
    def perform_update(self, serializer):
        serializer.save(update_at=timezone.now())
    
    def perform_destroy(self, instance):
        instance.status = Task.Status.DELETED
        instance.save()

    def get_queryset(self):
        user = self.request.auth.user if self.request.auth else None
        return Task.objects.filter(user=user)