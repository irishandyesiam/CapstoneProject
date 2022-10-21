from django.urls import path
from . import views

urlpatterns = [
    path('', views.mealplans_list),
]