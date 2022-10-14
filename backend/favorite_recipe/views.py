from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import FavoriteSerializer
from .models import Favorite


@api_view(['GET'])
def favorites_list(request):
    if request.method == 'GET':
        favorites = Favorite.objects.all()
    serializer = FavoriteSerializer(favorites, many=True)
    return Response(serializer.data)