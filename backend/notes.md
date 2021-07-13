# Spec Doc
```
GET http://localhost:8080/api/movies/?page=0

Response:


HTTP 200 OK
Allow: GET, POST, PUT, DELETE, HEAD, OPTIONS
Content-Type: application/json
Vary: Accept

{
    "status": 200,
    "count_all": 11,
    "next_page": "?=page1",
    "previous_page": "?=page0",
    "data": [
        {
            "id": "c7b1af94-63c6-4a80-a532-441002b6ffc0",
            "created": "2021-07-12T23:21:10.725000Z",
            "updated": "2021-07-12T23:21:10.725000Z",
            "title": "Loki - Arnaldo Baptista",
            "director_name": "",
            "cast": [],
            "published_year": 2008,
            "released_date": "2008-10-17",
            "overview": "Loki brings the trajectory of Arnaldo Baptista from childhood, passing through the most successful phase as leader of the Mutantes, marriage to singer Rita Lee and then separation. He also goes through the depression that devastated his life after the group ended and that led him to attempt suicide, his solo career, rapprochement with his brother and member of the Mutantes, Sérgio Dias, culminating in the band's return in 2006.",
            "vote_average": "6.9",
            "duration": 120,
            "movie_cover": "",
            "genre": [
                "Documentary",
                "Music"
            ],
            "netflix_link": "",
            "youtube_link": "",
            "poster_cover": "https://image.tmdb.org/t/p/w370_and_h556_multi_faces/cYl39kCMjP37e39CbJqxWHvf1ez.jpg",
            "backdrop_cover": "https://image.tmdb.org/t/p/w370_and_h556_multi_faces/1ZNLJkYSfRcPconjUYa5pReoLH9.jpg",
            "moods": {
                "anger": "off",
                "contempt": "off",
                "disgust": "off",
                "fear": "on",
                "happiness": "off",
                "sadness": "off",
                "surprise": "on"
            }
        },
        {
            "id": "789652d0-f5ad-46b0-8a40-e13486cbeafd",
            "created": "2021-07-12T23:07:43.499000Z",
            "updated": "2021-07-12T23:07:43.499000Z",
            "title": "Jurassic Park",
            "director_name": "",
            "cast": [],
            "published_year": 1993,
            "released_date": "1993-06-11",
            "overview": "A wealthy entrepreneur secretly creates a theme park featuring living dinosaurs drawn from prehistoric DNA. Before opening day, he invites a team of experts and his two eager grandchildren to experience the park and help calm anxious investors. However, the park is anything but amusing as the security systems go off-line and the dinosaurs escape.",
            "vote_average": "7.9",
            "duration": 127,
            "movie_cover": "",
            "genre": [
                "Adventure",
                "Science Fiction"
            ],
            "netflix_link": "",
            "youtube_link": "",
            "poster_cover": "https://image.tmdb.org/t/p/w370_and_h556_multi_faces/9i3plLl89DHMz7mahksDaAo7HIS.jpg",
            "backdrop_cover": "https://image.tmdb.org/t/p/w370_and_h556_multi_faces/9kqA5fe1V2yqCBudUMUTmXbyy3Y.jpg",
            "moods": {
                "anger": "off",
                "contempt": "off",
                "disgust": "off",
                "fear": "on",
                "happiness": "on",
                "sadness": "off",
                "surprise": "on"
            }
        },
        {
            "id": "aa1093f2-7b38-450e-9ba0-afc50bf7fa55",
            "created": "2021-07-12T23:07:26.518000Z",
            "updated": "2021-07-12T23:07:26.518000Z",
            "title": "Wrong Turn",
            "director_name": "",
            "cast": [],
            "published_year": 2021,
            "released_date": "2021-01-26",
            "overview": "Jen and a group of friends set out to hike the Appalachian Trail. Despite warnings to stick to the trail, the hikers stray off course—and cross into land inhabited by The Foundation, a hidden community of mountain dwellers who use deadly means to protect their way of life.",
            "vote_average": "6.1",
            "duration": 110,
            "movie_cover": "",
            "genre": [
                "Horror",
                "Thriller"
            ],
            "netflix_link": "",
            "youtube_link": "",
            "poster_cover": "https://image.tmdb.org/t/p/w370_and_h556_multi_faces/4U1SBHmwHkNA0eHZ2n1CuiC1K1g.jpg",
            "backdrop_cover": "https://image.tmdb.org/t/p/w370_and_h556_multi_faces/6XVqVAMOsKL5C26pHesiAawuGYW.jpg",
            "moods": {
                "anger": "on",
                "contempt": "off",
                "disgust": "off",
                "fear": "on",
                "happiness": "off",
                "sadness": "off",
                "surprise": "on"
            }
        },
        {
            "id": "ae338c9d-5641-46b1-b354-53ea932bace6",
            "created": "2021-07-12T23:07:02.422000Z",
            "updated": "2021-07-12T23:07:02.422000Z",
            "title": "Bram Stoker's Dracula",
            "director_name": "",
            "cast": [],
            "published_year": 1992,
            "released_date": "1992-11-13",
            "overview": "When Dracula leaves the captive Jonathan Harker and Transylvania for London in search of Mina Harker, the reincarnation of Dracula's long-dead wife Elisabeta, obsessed vampire hunter Dr. Van Helsing sets out to end the madness.",
            "vote_average": "7.4",
            "duration": 128,
            "movie_cover": "",
            "genre": [
                "Romance",
                "Horror"
            ],
            "netflix_link": "",
            "youtube_link": "",
            "poster_cover": "https://image.tmdb.org/t/p/w370_and_h556_multi_faces/n39glC4GkBeCbwdenES8ZBodim8.jpg",
            "backdrop_cover": "https://image.tmdb.org/t/p/w370_and_h556_multi_faces/1ZVsHrPyogvUMJEuuB9eCkHSwaR.jpg",
            "moods": {
                "anger": "on",
                "contempt": "off",
                "disgust": "off",
                "fear": "on",
                "happiness": "off",
                "sadness": "off",
                "surprise": "on"
            }
        },
        {
            "id": "e197586c-de97-4a16-938c-006b11224c61",
            "created": "2021-07-12T23:06:40.568000Z",
            "updated": "2021-07-12T23:06:40.568000Z",
            "title": "Saving Private Ryan",
            "director_name": "",
            "cast": [],
            "published_year": 1998,
            "released_date": "1998-07-24",
            "overview": "As U.S. troops storm the beaches of Normandy, three brothers lie dead on the battlefield, with a fourth trapped behind enemy lines. Ranger captain John Miller and seven men are tasked with penetrating German-held territory and bringing the boy home.",
            "vote_average": "8.2",
            "duration": 169,
            "movie_cover": "",
            "genre": [
                "Drama",
                "History",
                "War"
            ],
            "netflix_link": "",
            "youtube_link": "",
            "poster_cover": "https://image.tmdb.org/t/p/w370_and_h556_multi_faces/1wY4psJ5NVEhCuOYROwLH2XExM2.jpg",
            "backdrop_cover": "https://image.tmdb.org/t/p/w370_and_h556_multi_faces/hjQp148VjWF4KjzhsD90OCMr11h.jpg",
            "moods": {
                "anger": "off",
                "contempt": "off",
                "disgust": "off",
                "fear": "on",
                "happiness": "on",
                "sadness": "off",
                "surprise": "on"
            }
        }
    ]
}



```

## noted
ssh wildananugrah@34.129.126.51

docker run --name mongo -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password -p 27017:27017 -d mongo

1. Ngirim image sama audio dapet mood nya doang
2. Query movies, preference optional, mood mandatory
3. musics, preference optional, mood mandatory