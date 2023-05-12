from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import IngredientSerializer
from .models import Ingredient
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404

# Request for Recipe ingredients per FK in model.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ingredientDetailsByFK(request, fk):
    try:
        ingredients = Ingredient.objects.get(recipe_id=fk)  # Replace "foreign_key" with the actual name of the foreign key field
        serializer = IngredientSerializer(ingredients, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Ingredient.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
