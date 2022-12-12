
from rest_framework.decorators import api_view, permission_classes;
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def favorites_comment(request):
    if request.method == 'POST':
        serializer = FavoriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user = request.user)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def favorites_detail(request, pk): 
    favorite = get_object_or_404(Favorite, pk=pk)
    if request.method == 'GET':
        serializer = FavoriteSerializer(favorite)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        comment = get_object_or_404(Favorite, pk=pk)
        if request.method == 'PUT':
            serializer = FavoriteSerializer(comment, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)



