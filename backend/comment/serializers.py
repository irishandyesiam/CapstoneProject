from rest_framework import serializers;
from .models import Comment;

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'user', 'recipe', 'text', 'user_id', 'recipe_id']
        depth = 1

    recipe_id = serializers.IntegerField(write_only=True)