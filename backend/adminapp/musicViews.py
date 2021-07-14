from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.shortcuts import redirect
from rest_framework import status
from restapi.models import Music
from django.forms.models import model_to_dict
from django.conf import settings
import uuid

# Create your views here.
def split_by_comma(str):
    if str != "":
        return [x.strip() for x in str.split(',')]
    else:
        return []

def get_user(request):
    user_id = int(request.session['user_id'])
    return User.objects.get(id=user_id)

def index(request):
    if request.method == 'GET':
        if request.GET.get("action", None) == None:
            context = { 'action': 'add',  'username': get_user(request), 'genres' : ",".join(settings.MUSIC_GENRES)  }
            return render(request,"adminapp/music_add_or_update.html", context=context)
        elif request.GET.get("action", None) == "delete":
            id = request.GET.get("id", None)
            if id == None:
                return redirect("/admin/dashboard")
            else:
                music = Music.objects.get(id=id)
                music.delete()
                return redirect("/admin/dashboard")
        elif request.GET.get("action", None) == "update":
            id = request.GET.get("id", None)
            music = Music.objects.get(id=id)
            context = { 'music' : model_to_dict(music), 'action': 'update',  'username': get_user(request), 'genres' : ",".join(settings.MUSIC_GENRES)  }
            return render(request,"adminapp/music_add_or_update.html", context=context)

    elif request.method == 'POST':
        
        anger = request.POST.get('anger','off')
        fear = request.POST.get('fear','off')
        happiness = request.POST.get('happiness','off')
        sadness = request.POST.get('sadness','off')

        genre_str = request.POST.get("genre","")
        
        genre = split_by_comma(genre_str)
        
        moods = {
            'anger' : anger,
            'fear' : fear,
            'happiness' : happiness,
            'sadness':  sadness
        }

        if request.POST.get("action","") == "add":
            id = uuid.uuid4()

            duration = 0
            if request.POST.get("duration",0) != '':
                duration = request.POST.get("duration",0)

            music = Music(
                id = id,
                title = request.POST.get("title",""),
                artist_name = request.POST.get("artist_name",""),
                album_name = request.POST.get("album_name",""),
                released_date = request.POST.get("released_date",""),
                duration = duration,
                album_cover = request.POST.get("album_cover",""),
                genre = genre,
                spotify_link = request.POST.get("spotify_link",""),
                youtube_link = request.POST.get("youtube_link",""),
                soundcloud_link = request.POST.get("soundcloud_link",""),
                genius_link = request.POST.get("genius_link",""),
                moods = moods,
                created_by=get_user(request).username
                )
            music.save()
            return redirect('/admin/dashboard')
        
        elif request.POST.get("action","") == "update":

            duration = 0
            if request.POST.get("duration",0) != '':
                duration = request.POST.get("duration",0)

            id = request.POST.get("id", None)
            music = Music.objects.get(id=id)
            music.title = request.POST.get("title","")
            music.artist_name = request.POST.get("artist_name","")
            music.album_name = request.POST.get("album_name","")
            music.released_date = request.POST.get("released_date",0)
            music.duration = duration
            music.album_cover = request.POST.get("album_cover","")
            music.genre = genre
            music.spotify_link = request.POST.get("spotify_link","")
            music.youtube_link = request.POST.get("youtube_link","")
            music.soundcloud_link = request.POST.get("soundcloud_link","")
            music.genius_link = request.POST.get("genius_link","")
            music.updated_by = get_user(request).username
            music.moods = moods
            music.save()
            return redirect('/admin/dashboard')
        