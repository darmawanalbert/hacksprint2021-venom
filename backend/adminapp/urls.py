from django.urls import path
from . import views, movieViews, musicViews

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.login, name='login'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('movies/', movieViews.index, name='movie'),
    path('musics/',musicViews.index, name='music'),
    path('logout/', views.logout, name='movie'),
    path('roll/',views.musicgenerator, name='musicgen')
]