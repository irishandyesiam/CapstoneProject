from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import MealPlanSerializer
from .models import MealPlan


@api_view(['GET'])
def meal_planner_list(request):
    if request.method == 'GET':
        meal_plans = MealPlan.objects.all()
    serializer = MealPlanSerializer(meal_plans, many=True)
    return Response(serializer.data)