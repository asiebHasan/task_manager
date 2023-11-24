from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username


class Task(models.Model):
    class Status(models.TextChoices):
        COMPLETED = 'COMPLETED'
        PENDING = 'PENDING'
        DELETED = 'DELETED'

    user = models.ForeignKey(
        CustomUser, related_name="user", on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    descriptions = models.TextField()
    status = models.CharField(max_length=255, choices=Status.choices)
    due_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now=True)
    update_at = models.DateTimeField(auto_now=True)
