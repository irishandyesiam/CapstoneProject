from django.db import models
from authentication.models import User;
from recipes.models import Recipe;

# Create your models here.
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, null=True)
    text = models.CharField(max_length=2000)