from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.shortcuts import redirect
from rest_framework import status
from restapi.models import Movie
from django.forms.models import model_to_dict
import uuid

# Create your views here.
def split_by_comma(str):
    if str != "":
        return [x.strip() for x in str.split(',')]
    else:
        return []

def index(request):
    if request.method == 'GET':
        if request.GET.get("action", None) == None:
            context = { 'action': 'add' }
            return render(request,"adminapp/movie_add_or_update.html", context=context)
        elif request.GET.get("action", None) == "delete":
            id = request.GET.get("id", None)
            if id == None:
                return redirect("/admin/dashboard")
            else:
                movie = Movie.objects.get(id=id)
                movie.delete()
                return redirect("/admin/dashboard")
        elif request.GET.get("action", None) == "update":
            id = request.GET.get("id", None)
            movie = Movie.objects.get(id=id)
            context = { 'movie' : model_to_dict(movie), 'action': 'update' }
            return render(request,"adminapp/movie_add_or_update.html", context=context)

    elif request.method == 'POST':

        print("hello there!")

        anger = request.POST.get('anger','off')
        contempt = request.POST.get('contempt','off')
        disgust = request.POST.get('disgust','off')
        fear = request.POST.get('fear','off')
        happiness = request.POST.get('happiness','off')
        sadness = request.POST.get('sadness','off')
        surprise = request.POST.get('surprise','off')

        cast_str = request.POST.get("cast","")
        genre_str = request.POST.get("genre","")
        cast = split_by_comma(cast_str)
        genre = split_by_comma(genre_str)

        moods = {
            'anger' : anger,
            'contempt' : contempt,
            'disgust' : disgust,
            'fear' : fear,
            'happiness' : happiness,
            'sadness':  sadness,
            'surprise' : surprise
        }

        if request.POST.get("action","") == "add":
            id = uuid.uuid4()
            movie = Movie(
                id=id,
                title=request.POST.get("title",""),
                director_name=request.POST.get("director_name",""),
                cast=cast,
                published_year=request.POST.get("published_year",0),
                duration=request.POST.get("duration",0),
                poster_cover=request.POST.get("poster_cover",""),
                backdrop_cover=request.POST.get("backdrop_cover",""),
                genre=genre,
                netflix_link=request.POST.get("netflix_link",""),
                youtube_link=request.POST.get("youtube_link",""),
                moods=moods)
            movie.save()
            return redirect('/admin/movies?id=' + str(id) + '&action=update')
        elif request.POST.get("action","") == "update":
            id = request.POST.get("id", None)
            movie = Movie.objects.get(id=id)
            movie.title=request.POST.get("title","")
            movie.director_name=request.POST.get("director_name","")
            movie.cast=cast
            movie.published_year=request.POST.get("published_year",0)
            movie.duration=request.POST.get("duration",0)
            movie.poster_cover=request.POST.get("poster_cover","")
            movie.backdrop_cover=request.POST.get("backdrop_cover","")
            movie.genre=genre
            movie.netflix_link=request.POST.get("netflix_link","")
            movie.youtube_link=request.POST.get("youtube_link","")
            movie.moods = moods
            movie.save()
            return redirect('/admin/movies?id=' + id + '&action=update')