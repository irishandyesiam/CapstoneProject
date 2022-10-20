from rest_framework import serializers
from .models import MealPlan

class MealPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealPlan
        fields = ['id', 'recipe', 'user', 'day_week', 'recipe_id']
        depth = 1

    recipe_id = serializers.IntegerField(write_only=True)