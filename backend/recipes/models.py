from django.db import models
from authentication.models import User;

class Recipe(models.Model):
    name = models.TextField(max_length=2048)
    ingredients = models.TextField(max_length=2048)
    instructions = models.TextField(max_length=2048)
    time = models.CharField(max_length=255, null=True)
    servings = models.IntegerField(null=True)
    image = models.CharField(max_length=2048)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
  