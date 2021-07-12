from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from restapi import views

urlpatterns = [
    path('movies/', views.Movies.as_view()),
    path('musics/', views.Musics.as_view()),
    path('users/', views.Users.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)