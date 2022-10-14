
from django.db import models
from user.models import User
from favorite_recipe.models import Favorite

# Create your models here.
class MealPlan(models.Model):
    recipe = models.ForeignKey(Favorite, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)