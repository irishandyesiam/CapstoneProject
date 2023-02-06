from rest_framework import serializers
from .models import Recipe

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'name', 'ingredients', 'instructions', 'time', 'servings', 'image','user_id', 'favorite' ]
        depth = 1

   