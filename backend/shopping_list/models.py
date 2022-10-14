from django.db import models;
from user.models import User;

# Create your models here.
class ShoppingList(models.Model):
    user_name = models.ForeignKey(User, on_delete=models.CASCADE)
    items = models.CharField(max_length=255)