from django.urls import path
from . import views

urlpatterns = [
    path('<int:user_id>/', views.favorites_list),
    path('<int:user_id>/comment/', views.favorites_detail),
]