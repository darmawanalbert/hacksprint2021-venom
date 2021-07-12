from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.shortcuts import redirect
from rest_framework import status

# Create your views here.
def index(request):

    if request.method == 'GET':
        return render(request,"adminapp/index.html")
    elif request.method == 'POST':
        username = request.data.get('username','')
        password = request.data.get('password','')

        print("username:", username, " password:", password)

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
    response = None
    if request.method == 'GET':
        response = redirect('')
    elif request.method == 'POST':
        print(request.POST)
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

def dashboard(request):
    if request.method == 'GET':
        return render(request,"adminapp/dashboard.html")

