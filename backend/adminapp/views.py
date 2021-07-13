from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.shortcuts import redirect
from rest_framework import status
from restapi.models import Movie
from django.db.models import Q

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

def get_query_number(number):
    try:
        number = int(number)
    except Exception:
        number = 1
    
    return number

def get_movies(request):
    page = get_query_number(request.GET.get('movie_page', None))

    offset = 5
    bottom_limit = page * offset - offset
    if bottom_limit < 0:
        bottom_limit = 0
    upper_limit = bottom_limit + 5
    username = get_user(request).username
    movies = Movie.objects.values().filter(Q(created_by=username) | Q(updated_by=username)).order_by('-created')

    previous_page = page - 1
    if previous_page < 0:
        previous_page = 0
        page = 1

    return movies[bottom_limit:upper_limit], page + 1

def get_user(request):
    user_id = int(request.session['user_id'])
    return User.objects.get(id=user_id)


def dashboard(request):
    if request.method == 'GET':

        if 'is_login' in request.session and request.session['is_login'] != None:
            
            username = get_user(request)

            movies, movie_next_page = get_movies(request)

            movie_previous_page = movie_next_page - 2
            if movie_previous_page < 0:
                movie_previous_page = 0

            context = {
                'movies': movies,
                'movie_next_page' : movie_next_page,
                'movie_previous_page': movie_previous_page,
                'username': username
            }
            return render(request,"adminapp/dashboard.html", context=context)
        else: 
            return redirect('/')

