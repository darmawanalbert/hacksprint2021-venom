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

        query = request.GET.get("query","")

        response = {}
        tmdb_response = self.search_movie({'api_key' : api_key, 'query' : query})
        genres = self.get_genres({ 'api_key' : api_key })

        if(len(tmdb_response['results']) > 0):
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



