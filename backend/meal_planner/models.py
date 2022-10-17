from django.db import models
from authentication.models import User
from favorite_recipe.models import Favorite

# Create your models here.
class MealPlan(models.Model):
    recipe = models.ForeignKey(Favorite, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    day_week = models.CharField(max_length = 255)
