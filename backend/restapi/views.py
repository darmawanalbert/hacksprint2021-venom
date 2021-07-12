from django.shortcuts import render
from restapi.models import Music, Movie
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from django.forms.models import model_to_dict

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

import uuid

class Users(APIView):
    
    def post(self, request, format=None):
        username = request.data.get('username','')
        password = request.data.get('password','')

        if authenticate(username=username,password=password) != None:
            user = User.objects.filter(username=username).values()
            response = {
                'status' : status.HTTP_200_OK,
                'data' : user[0]
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {
                'status': status.HTTP_401_UNAUTHORIZED,
                'data': {}
            }
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)

# Create your views here.
class Movies(APIView):
    def get(self, request, format=None):

        id = request.GET.get('id', None)

        if id == None:
            movies = Movie.objects.values()
            response = {
                'status' : status.HTTP_200_OK,
                'data' : movies
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            try:
                movie = Movie.objects.get(id=id)
                response = {
                    'status' : status.HTTP_200_OK,
                    'data' : model_to_dict(movie)
                }
                return Response(response, status=status.HTTP_200_OK)
            except Movie.DoesNotExist:
                raise Http404
    
    def post(self, request, format=None):
        movie = Movie(
            id=uuid.uuid4(),
            title=request.data.get("title",""),
            director_name=request.data.get("director_name",""),
            cast=request.data.get("cast",[]),
            published_year=request.data.get("published_year",0),
            duration=request.data.get("duration",0),
            movie_cover=request.data.get("movie_cover",""),
            genre=request.data.get("genre",[]),
            netflix_link=request.data.get("netflix_link",""),
            youtube_link=request.data.get("youtube_link",""))
        movie.save()
        response = {'status': status.HTTP_200_OK, 'data' : request.data }
        return Response(response, status=status.HTTP_200_OK)
    
    def delete(self, request, format=None):
        id = request.GET.get('id', None)
        try:
            movie = Movie.objects.get(id=id)
            movie.delete()
            response = {
                    'status' : status.HTTP_200_OK,
                    'data' : model_to_dict(movie)
                }
            return Response(response, status=status.HTTP_200_OK)
        except Movie.DoesNotExist:
            raise Http404

    def put(self, request, format=None):
        try:
            movie = Movie.objects.get(id=id)

            movie.title=request.data.get("title","")
            movie.director_name=request.data.get("director_name","")
            movie.cast=request.data.get("cast",[])
            movie.published_year=request.data.get("published_year",0)
            movie.duration=request.data.get("duration",0)
            movie.movie_cover=request.data.get("movie_cover","")
            movie.genre=request.data.get("genre",[])
            movie.netflix_link=request.data.get("netflix_link","")
            movie.youtube_link=request.data.get("youtube_link","")

            movie.save()

            response = {
                'status' : status.HTTP_200_OK,
                'data' : model_to_dict(movie)
            }
            return Response(response, status=status.HTTP_200_OK)
        except Movie.DoesNotExist:
            raise Http404

class Musics(APIView):
    def get(self, request, format=None):

        id = request.GET.get('id', None)

        if id == None:
            musics = Music.objects.values()
            response = {
                'status' : status.HTTP_200_OK,
                'data' : musics
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            try:
                music = Music.objects.get(id=id)
                response = {
                    'status' : status.HTTP_200_OK,
                    'data' : model_to_dict(music)
                }
                return Response(response, status=status.HTTP_200_OK)
            except Music.DoesNotExist:
                raise Http404
    
    def post(self, request, format=None):
        music = Music(
            id=uuid.uuid4(),
            title=request.data.get("title",""),
            artist_name=request.data.get("artist_name",""),
            album_name=request.data.get("album_name",0),
            published_year=request.data.get("published_year",0),
            duration=request.data.get("duration",0),
            album_cover=request.data.get("album_cover",""),
            genre=request.data.get("genre",[]),
            spotify_link=request.data.get("spotify_link",""),
            youtube_link=request.data.get("youtube_link",""),
            soundcloud_link=request.data.get("soundcloud_link",""))
        music.save()
        response = {'status': status.HTTP_200_OK, 'data' : request.data }
        return Response(response, status=status.HTTP_200_OK)

    def delete(self, request, format=None):
        id = request.GET.get('id', None)

        try:
            music = Music.objects.get(id=id)
            music.delete()
            response = {
                    'status' : status.HTTP_200_OK,
                    'data' : model_to_dict(music)
                }
            return Response(response, status=status.HTTP_200_OK)
        except Music.DoesNotExist:
            raise Http404

    def put(self, request, format=None):
        try:
            music = Music.objects.get(id=id)

            music.title=request.data.get("title","")
            music.artist_name=request.data.get("artist_name","")
            music.album_name=request.data.get("album_name",0)
            music.published_year=request.data.get("published_year",0)
            music.duration=request.data.get("duration",0),
            music.album_cover=request.data.get("album_cover","")
            music.genre=request.data.get("genre",[])
            music.spotify_link=request.data.get("spotify_link","")
            music.youtube_link=request.data.get("youtube_link","")
            music.soundcloud_link=request.data.get("soundcloud_link","")

            music.save()

            response = {
                'status' : status.HTTP_200_OK,
                'data' : model_to_dict(music)
            }
            return Response(response, status=status.HTTP_200_OK)
        except Movie.DoesNotExist:
            raise Http404
