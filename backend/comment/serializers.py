from rest_framework import serializers;
from .models import Comment;

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'user', 'recipe', 'text']
        depth = 1