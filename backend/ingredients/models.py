from django.db import models
from recipes.models import Recipe

class Ingredient(models.Model):
    ingredient_name = models.CharField(max_length=255, null=True, blank=True)
    quantity = models.DecimalField(max_digits=6, decimal_places=3, default=0, null=True, blank=True)
    unit = models.CharField(max_length=20, default=0, null=True, blank=True)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, null=True, blank=True)