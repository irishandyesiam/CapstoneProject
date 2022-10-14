from unittest.util import _MAX_LENGTH
from django.db import models

# Create your models here.
class Recipe(models.Model):
    name = models.TextField()
    ingredients = models.TextField()
    instructions = models.TextField()
    time = models.CharField(max_length=255)
    servings = models.IntegerField()
    image = models.CharField(max_length=2048)
