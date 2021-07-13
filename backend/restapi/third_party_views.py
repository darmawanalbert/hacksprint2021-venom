from django.shortcuts import render
from restapi.models import Music, Movie
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from django.forms.models import model_to_dict

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.conf import settings

import urllib
import requests
import uuid

class TMDBView(APIView):

    def search_movie(self, params):
        base_url = settings.TMDB_CONFIGS['base_url']
        url = base_url + "/search/movie?" + urllib.parse.urlencode(params)
        return requests.get(url).json()

    def get_genres(self, params):
        base_url = settings.TMDB_CONFIGS['base_url']
        url = base_url + "/genre/movie/list?" + urllib.parse.urlencode(params)
        return requests.get(url).json()['genres']
    
    def genre_map(self, genre_ids, genre_list):

        map = {}
        for genre_id in genre_ids:
            for genre in genre_list:
                if genre["id"] == genre_id:
                    map[genre_id] = genre["name"]
                    break
        return map
    
    def genre_names(self, genre_ids, genre_list):
        map = []
        for genre_id in genre_ids:
            for genre in genre_list:
                if genre["id"] == genre_id:
                    map.append(genre['name'])
                    break
        return map
    
    def get_detail(self, movie_id, params):
        base_url = settings.TMDB_CONFIGS['base_url']
        url = base_url + "/movie/" + str(movie_id) + "?" + urllib.parse.urlencode(params)
        return requests.get(url).json()

    def get_published_year(self, release_date):
        str_split = release_date.split("-")
        return str_split[0]

    def get_fullpath(self, image_str):
        if image_str != None:
            return 'https://image.tmdb.org/t/p/w370_and_h556_multi_faces' + str(image_str)
        else:
            return None

    def get(self, request, format=None):
        api_key = settings.TMDB_CONFIGS['api_key']

        query = request.GET.get("query",None)

        response = {}
        tmdb_response = self.search_movie({'api_key' : api_key, 'query' : query})
        genres = self.get_genres({ 'api_key' : api_key })

        if(query != None and len(tmdb_response['results']) > 0):
            response['movie'] = tmdb_response['results'][0]
            movie_detail = self.get_detail(response['movie']['id'], { 'api_key' : api_key })
            response['movie']['backdrop_fullpath'] = self.get_fullpath(response['movie']['backdrop_path'])
            response['movie']['poster_fullpath'] = self.get_fullpath(response['movie']['poster_path'])
            response['movie']['published_year'] = self.get_published_year(response['movie']['release_date'])
            genre_map = self.genre_map(response['movie']['genre_ids'], genres)
            response['movie']['runtime'] = movie_detail['runtime']
            response['movie']["genre_map"] = genre_map
            response['movie']["genre_names"] = self.genre_names(response['movie']['genre_ids'], genres)
            response['status'] = status.HTTP_200_OK
            return Response(response, status=status.HTTP_200_OK)
        else:
            response['movie'] = {}
            response['message'] = "You waistd your time. Re-type the title bro. :)"
            response['status'] = status.HTTP_404_NOT_FOUND
            return Response(response, status=status.HTTP_404_NOT_FOUND)

class Genius(APIView):
    def search_music(self, bearer_auth, params):
        base_url = settings.GENIUS_CONFIGS['base_url']
        url = base_url + "/search/?" + urllib.parse.urlencode(params)
        return requests.get(url, headers={"Authorization":f"Bearer {bearer_auth}"}).json()
    
    def get_detail_music(self, bearer_auth, music_id):
        base_url = settings.GENIUS_CONFIGS['base_url']
        url = base_url + "/songs/" + str(music_id)
        return requests.get(url, headers={"Authorization":f"Bearer {bearer_auth}"}).json()

    def get_media_link(self, medias, filter):
        result = {}
        for media in medias:
            if media['provider'] == filter:
                result['url'] = media['url']
                if 'native_uri' in media:
                   result['native_uri'] = media['native_uri']
                break
        return result

    def get(self, request, format=None):
        try:
            bearer_auth = settings.GENIUS_CONFIGS['bearer_auth']
            query = request.GET.get("query","")
            genius_response = self.search_music(bearer_auth, {'q' : query})
            genius_response_result = genius_response['response']['hits'][0]['result']

            music_id = genius_response_result['id']
            detail_music = self.get_detail_music(bearer_auth, music_id)

            detail = {}
            detail['title'] = detail_music['response']['song']['title']
            detail['artist_name'] = detail_music['response']['song']['album']['artist']['name']
            detail['album_name'] = detail_music['response']['song']['album']['full_title']
            detail['published_year'] = detail_music['response']['song']['release_date']
            detail['album_cover'] = detail_music['response']['song']['album']['cover_art_url']
            detail['spotify_link'] = self.get_media_link(detail_music['response']['song']['media'],'spotify')
            detail['youtube_link'] = self.get_media_link(detail_music['response']['song']['media'],'youtube')
            detail['soundcloud_link'] = self.get_media_link(detail_music['response']['song']['media'],'soundcloud')

            response = {
                'status': status.HTTP_200_OK,
                'response': detail
            }
            return Response(response, status=status.HTTP_200_OK)
        except Exception as err:
            print(err)
            return Response({'status' : status.HTTP_500_INTERNAL_SERVER_ERROR,'message':'internal error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

