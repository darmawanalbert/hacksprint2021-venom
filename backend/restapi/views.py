from django.shortcuts import render
from restapi.models import Music, Movie
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from django.forms.models import model_to_dict

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from restapi.emotion.voting import get_emotion

import uuid
import json

class Test(APIView):
    def get(self, request, format=None):
        return Response({'message':'API is running'}, status=status.HTTP_200_OK)

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

    def get_filter_by_genre(self, movies, filters):
        r_movie = []
        for movie in movies:
            for genre in movie['genre']:
                if genre.lower() in filters:
                    r_movie.append(movie)
        return r_movie
    
    def get_filter_by_mood(self, movies, filters):
        r_movie = []
        for movie in movies:
            for filter in filters:
                if movie['moods'][filter] == "on":
                    r_movie.append(movie)
        return r_movie

    def get_query_number(self, number):
        try:
            number = int(number)
        except Exception:
            number = 1
        
        return number

    def get(self, request, format=None):

        id = request.GET.get('id', None)
        page = self.get_query_number(request.GET.get('page', None))

        offset = 10
        bottom_limit = page * offset - offset
        if bottom_limit < 0:
            bottom_limit = 0

        upper_limit = bottom_limit + offset
        
        if id == None:
            movies = Movie.objects.values().order_by('-created')

            if request.GET.get('genres', None) != None:
                filters = request.GET.get('genres', None)
                movies = self.get_filter_by_genre(movies, filters.lower().split(","))
            
            if request.GET.get('moods', None) != None:
                filters = request.GET.get('moods', None)
                movies = self.get_filter_by_mood(movies, filters.lower().split(","))

            movies = movies[bottom_limit:upper_limit]

            previous_page = page - 1
            if previous_page < 0:
                previous_page = 0

            response = {
                'status' : status.HTTP_200_OK,
                'count_all': len(movies),
                'next_page': '?=page' + str(page + 1),
                'previous_page' : '?=page' + str(previous_page),
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

    def get_filter_by_genre(self, musics, filters):
        r_music = []
        for music in musics:
            for genre in music['genre']:
                if genre.lower() in filters:
                    r_music.append(music)
        return r_music
    
    def get_filter_by_mood(self, musics, filters):
        r_music = []
        for music in musics:
            for filter in filters:
                if musics['moods'][filter] == "on":
                    r_music.append(musics)
        return r_music

    def get_query_number(self, number):
        try:
            number = int(number)
        except Exception:
            number = 1
        
        return number

    def get(self, request, format=None):

        id = request.GET.get('id', None)
        page = self.get_query_number(request.GET.get('page', None))

        offset = 10
        bottom_limit = page * offset - offset
        if bottom_limit < 0:
            bottom_limit = 0

        upper_limit = bottom_limit + offset

        if id == None:

            musics = Music.objects.values().order_by('-created')

            if request.GET.get('genres', None) != None:
                filters = request.GET.get('genres', None)
                musics = self.get_filter_by_genre(musics, filters.lower().split(","))
            
            if request.GET.get('moods', None) != None:
                filters = request.GET.get('moods', None)
                musics = self.get_filter_by_mood(musics, filters.lower().split(","))

            musics = musics[bottom_limit:upper_limit]

            previous_page = page - 1
            if previous_page < 0:
                previous_page = 0

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


class Mood(APIView):

    def bad_request_message(self, message):
        return Response({'status': status.HTTP_400_BAD_REQUEST, 'message':message}, status=status.HTTP_400_BAD_REQUEST)
        
    def post(self, request, format=None):
        try:

            # print('request:', json.dumps(request.data))

            platform = request.data.get('platform',None)
            image_base_data = request.data.get('imageData',None)
            audio_base_data = request.data.get('audioData',None)
            
            # print('audio:', audio_base_data)

            if platform == None or platform not in ['android','ios']:
                return self.bad_request_message(f'platform invalid')
            elif image_base_data == None:
                return self.bad_request_message(f'image_base_data invalid')
            elif audio_base_data == None:
                return self.bad_request_message(f'audio_base_data invalid')
            else:
                mood = get_emotion(image_base_data.encode('ascii'), audio_base_data.encode('ascii'), platform)
                response = {'status' : status.HTTP_200_OK, 'result' : { 'mood' : mood }}

                # print('response:', json.dumps(response))

                return Response(response, status=status.HTTP_200_OK)

        except Exception as err:
            print(err)
            return Response({'status' : status.HTTP_500_INTERNAL_SERVER_ERROR,'message':'internal error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
