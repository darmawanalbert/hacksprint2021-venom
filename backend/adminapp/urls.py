from django.urls import path
from . import views, movieViews

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.login, name='login'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('movies/', movieViews.index, name='movie'),
]