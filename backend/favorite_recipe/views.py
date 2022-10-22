
from rest_framework.decorators import api_view, permission_classes;
from rest_framework.response import Response;
from .serializer import FavoriteSerializer;
from .models import Favorite;
from rest_framework.permissions import IsAuthenticated;
from rest_framework import status



@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def favorites_list(request):
    if request.method == 'GET':
        user_list = Favorite.objects.filter(user_id=request.user.id)
        serializer = FavoriteSerializer(user_list, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = FavoriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user = request.user)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST', 'DELETE', 'PATCH'])
@permission_classes([IsAuthenticated])
def favorites_detail(request, user_id):
    comment = Favorite.objects.get(user_id=user_id)
    if request.method == 'GET':
        try:
            serializer = FavoriteSerializer(comment)
            return Response(serializer.data)
        except Favorite.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    elif request.method == 'POST':
        serializer = FavoriteSerializer(comment, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    elif request.method == 'DELETE':
        comment.delete()
        return Response(serializer.data)
    elif request.method == 'PATCH':
        comment.rating == 0
        serializer = FavoriteSerializer(comment, data=request.data, partial = True)
        serializer.is_valid() == True
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
