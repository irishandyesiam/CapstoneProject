from django.db import models;
from authentication.models import User;

# Create your models here.
class ShoppingList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    items = models.CharField(max_length=255)
    quantity = models.DecimalField(max_digits=6, decimal_places=3, default=0)
    unit = models.CharField(max_length=20, default=0)