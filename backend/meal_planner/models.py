from email.policy import default
from django.db import models
from authentication.models import User
from recipes.models import Recipe

# MealPlan: schedule meals per day of week.
# Want to add type of meal (breakfast, lunch, dinner, snack)
# Been having issues migrating new attributes to DB, may have to create new model

class MealPlan(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    day_week = models.CharField(max_length = 255, null=True)
