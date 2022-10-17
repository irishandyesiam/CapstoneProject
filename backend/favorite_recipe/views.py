from rest_framework.decorators import api_view, permission_classes;
from rest_framework.response import Response;
from .serializer import FavoriteSerializer;
from .models import Favorite;
from rest_framework.permissions import IsAuthenticated;
from rest_framework import status;


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def favorites_list(request, user_id):
    if request.method == 'GET':
        user_list = Favorite.objects.filter(user_id=user_id)
        serializer = FavoriteSerializer(user_list, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = FavoriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user = request.user)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)