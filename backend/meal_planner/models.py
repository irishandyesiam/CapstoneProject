from ast import Delete
from django.db import models
from user.models import User
from recipes.models import Recipe

# Create your models here.
class Meal_Plan(models.Model):
    name = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    user_name = models.ForeignKey(User, on_delete=models.CASCADE)