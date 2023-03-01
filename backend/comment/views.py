from rest_framework.decorators import api_view, permission_classes
from .serializers import CommentSerializer
from .models import Comment
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status;
from django.shortcuts import get_object_or_404

# Getter for all comments by user
# POST by user for specific recipe
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def comments_list(request):
    if request.method == 'GET':
        user_list = Comment.objects.filter(user_id=request.user.id)
        serializer = CommentSerializer(user_list, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user = request.user)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Getter for all comment by pk -- HOW DO I GET IT TO TARGET FK??
# Delete should be added 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def comments_detail(request, pk): 
    comment = get_object_or_404(Comment, pk=pk)
    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_200_OK)