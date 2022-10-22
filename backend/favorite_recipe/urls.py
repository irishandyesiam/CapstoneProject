from django.urls import path
from . import views

urlpatterns = [
    path('', views.favorites_list),
    path('<int:user_id>/comment/', views.favorites_detail),
]