from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import RecipeSerializer
from .models import Recipe
from rest_framework.permissions import IsAuthenticated
from rest_framework import status;


@api_view(['GET'])
def recipe_list(request):
    if request.method == 'GET':
        recipes = Recipe.objects.all()
    serializer = RecipeSerializer(recipes, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def addToRecipeList(request):
    if request.method == 'GET':
        user_list = Recipe.objects.filter(user_id=request.user.id)
        serializer = RecipeSerializer(user_list, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = RecipeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user = request.user)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
