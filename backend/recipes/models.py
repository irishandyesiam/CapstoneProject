from django.db import models
from authentication.models import User;

class Recipe(models.Model):
    name = models.TextField()
    ingredients = models.TextField()
    instructions = models.TextField()
    time = models.CharField(max_length=255, null=True)
    servings = models.IntegerField(null=True)
    image = models.CharField(max_length=2048)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
  