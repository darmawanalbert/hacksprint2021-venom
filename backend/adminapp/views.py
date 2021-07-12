from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.shortcuts import redirect
from rest_framework import status
from restapi.models import Movie, Music
import uuid

# Create your views here.
def index(request):
    
    if request.method == 'GET':
        return render(request,"adminapp/index.html")
    elif request.method == 'POST':
        username = request.data.get('username','')
        password = request.data.get('password','')

        if authenticate(username=username,password=password) != None:
            user = User.objects.filter(username=username).values()
            response = {
                'status' : status.HTTP_200_OK,
                'data' : user
            }
            response = redirect('/redirect-success/')

        else:
            response = {
                'status': status.HTTP_401_UNAUTHORIZED,
                'data': {}
            }
            response = redirect('/app/')
        return response

def login(request):
    if request.method == 'GET':
        response = redirect('')
    elif request.method == 'POST':
        username = request.POST.get('username','')
        password = request.POST.get('password','')

        print("username:", username, " password:", password)

        if authenticate(username=username,password=password) != None:
            user = User.objects.filter(username=username).values()
            request.session['is_login'] = True
            request.session['user_id'] = user[0]['id']
            response = redirect('/admin/dashboard/')
        else:
            response = redirect('/')
    else:
        response = redirect('/')
    return response

def logout(request):

    print("is_login",request.session['is_login'], " user_id: ", request.session['user_id'])

    del request.session['is_login']
    del request.session['user_id']
    return redirect('/')


def dashboard(request):
    if request.method == 'GET':

        if 'is_login' in request.session and request.session['is_login'] != None:
            movies = Movie.objects.values()
            musics = Music.objects.values()
            context = {
                'movies': movies,
                'musics': musics
            }
            return render(request,"adminapp/dashboard.html", context=context)
        else: 
            return redirect('/')

def musicgenerator(request):
    id = uuid.uuid4()
    music = Music(
        id = id,
        title = "Never Gonna Give You Up",
        artist_name = "Rick Astley",
        album_name = "Whenever You Need Somebody",
        published_year = 1987,
        duration = 3,
        album_cover = "http://link.com",
        genre = "rick roll",
        spotify_link = "http://link.com",
        youtube_link = "http://link.com",
        soundcloud_link = "http://link.com"
        )
    music.save()
    return HttpResponse("RickRolled")