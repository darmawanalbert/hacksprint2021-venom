from django.db import models

# Create your models here.
class Music(models.Model):
    id = models.CharField(max_length=100, blank=True, default='', primary_key=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    artist_name = models.CharField(max_length=100, blank=True, default='')
    album_name = models.CharField(max_length=100, blank=True, default='')
    published_year = models.IntegerField(blank=True, default=0)
    duration = models.IntegerField(blank=True, default=0)
    album_cover = models.TextField(blank=True, default='')
    genre = models.JSONField(default={})
    spotify_link = models.TextField(blank=True, default='')
    youtube_link = models.TextField(blank=True, default='')
    soundcloud_link = models.TextField(blank=True, default='')

    class Meta:
        ordering = ['created']

class Movie(models.Model):
    id = models.CharField(max_length=100, blank=True, default='', primary_key=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    director_name = models.CharField(max_length=100, blank=True, default='')
    cast = models.JSONField(default={})
    published_year = models.IntegerField(blank=True, default=0)
    duration = models.IntegerField(blank=True, default=0)
    movie_cover = models.TextField(blank=True, default='')
    genre = models.JSONField()
    netflix_link = models.TextField(blank=True, default='')
    youtube_link = models.TextField(blank=True, default='')

    class Meta:
        ordering = ['created']
