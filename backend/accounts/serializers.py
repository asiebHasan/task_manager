from rest_framework import serializers, viewsets, permissions
from rest_framework.validators import UniqueValidator
from django.contrib.auth.hashers import make_password
from .models import CustomUser, Task


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[
                                   UniqueValidator(queryset=CustomUser.objects.all())])
    username = serializers.CharField(max_length=32, validators=[
                                     UniqueValidator(queryset=CustomUser.objects.all())])
    password = serializers.CharField(min_length=6, 
                                     max_length=100, write_only=True)
    confirm_password = serializers.CharField(min_length=6, 
                                     max_length=100, write_only=True)

    class Meta:
        model = CustomUser
        fields = ("id", "username", "email", "password", "confirm_password", "date_joined")

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('confirm_password'):
            raise serializers.ValidationError("Password don't match.")
        return attrs
        
    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email'],
            password = make_password(validated_data['password'])
        )
        user.save()
        return user


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['user']
    
    
    def validate_due_date(self, value):
        import datetime
        from django.utils import timezone
        from dateutil.parser import parse
        
        if isinstance(value, datetime.datetime):
            due_date = value
        else:
            # Convert the due date string to a datetime object
            try:
                due_date = parse(value)
            except ValueError:
                raise serializers.ValidationError("Invalid date format")

        if due_date <= timezone.now():
            raise serializers.ValidationError("Due date must be in the future")
        return due_date