from rest_framework import serializers
from .models import Ingredient

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['id', 'ingredient_name', 'quantity', 'unit', 'recipe_id' ]
        depth = 1