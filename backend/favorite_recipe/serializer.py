from rest_framework import serializers
from .models import Favorite

class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ['id', 'user', 'recipe', 'rating', 'comments', 'user_id']
        depth = 1

    user_id = serializers.IntegerField(write_only=True)