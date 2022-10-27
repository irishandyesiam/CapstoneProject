from rest_framework.permissions import IsAuthenticated;
from rest_framework.decorators import api_view, permission_classes;
from rest_framework.response import Response;
from rest_framework import status;
from .serializers import ShoppingListSerializer;
from .models import ShoppingList;
from django.shortcuts import get_object_or_404;

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def shopping_list(request):
    if request.method == 'GET':
        user_list = ShoppingList.objects.filter(user_id=request.user.id)
        serializer = ShoppingListSerializer(user_list, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ShoppingListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user = request.user)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def edit_item(request, pk):
    item = get_object_or_404(ShoppingList.objects.filter(pk=pk))
    if request.method == 'DELETE':
        item.delete()
        return Response(status)