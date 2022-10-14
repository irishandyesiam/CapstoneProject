
from django.db import models;
from user.models import User;

# Create your models here.
class Favorite(models.Model):
    user_name = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.CharField(max_length=255)
    rating = models.IntegerField()
    comments = models.TextField()
