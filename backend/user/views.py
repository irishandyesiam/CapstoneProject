from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import UserSerializer
from .models import User


@api_view(['GET'])
def user_list(request):
    if request.method == 'GET':
        recipes = User.objects.all()
    serializer = UserSerializer(recipes, many=True)
    return Response(serializer.data)