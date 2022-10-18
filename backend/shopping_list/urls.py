from django.urls import path;
from . import views

urlpatterns = [
    path('<int:user_id>/', views.shopping_list),
    path('<int:pk>/edit_item/', views.edit_item),
]