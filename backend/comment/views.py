from rest_framework.decorators import api_view, permission_classes
from .serializers import CommentSerializer
from .models import Comment
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status;

# Create your views here.
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