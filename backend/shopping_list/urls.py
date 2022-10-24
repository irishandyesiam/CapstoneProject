from django.urls import path;
from . import views

urlpatterns = [
    path('', views.shopping_list),
    path('edit_item/<int:pk>/', views.edit_item),
]