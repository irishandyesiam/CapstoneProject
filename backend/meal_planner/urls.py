from django.urls import path
from . import views

urlpatterns = [
    path('', views.meal_planner_list),
]