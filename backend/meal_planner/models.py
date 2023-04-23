from email.policy import default
from django.db import models
from authentication.models import User
from recipes.models import Recipe

# Create your models here.
class MealPlan(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    day_week = models.CharField(max_length = 255, null=True)
    meal_type = models.CharField(max_length=15, null=True)
