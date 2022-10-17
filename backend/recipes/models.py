from django.db import models

class Recipe(models.Model):
    recipe_name = models.TextField()
    ingredients = models.TextField()
    instructions = models.TextField()
    time = models.CharField(max_length=255)
    servings = models.IntegerField()
    image = models.CharField(max_length=2048)

  