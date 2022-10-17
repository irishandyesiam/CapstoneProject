
from django.db import models;
from authentication.models import User;

# Create your models here.
class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    recipe = models.CharField(max_length=255)
    rating = models.IntegerField()
    comments = models.TextField()
