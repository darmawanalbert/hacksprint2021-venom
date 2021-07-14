from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from restapi import views, third_party_views

urlpatterns = [
    path('movies/', views.Movies.as_view()),
    path('musics/', views.Musics.as_view()),
    path('users/', views.Users.as_view()),
    path('test/', views.Test.as_view()),
    path('tmdb/', third_party_views.TMDBView.as_view()),
    path('genius/', third_party_views.Genius.as_view()),
    path('mood/', views.Mood.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)