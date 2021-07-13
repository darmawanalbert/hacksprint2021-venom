FROM python:3.9.5
ADD . /app
WORKDIR /app
RUN pip install -r requirements.txt
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home /app \
    app
USER app
EXPOSE 8080

RUN apt-get install ffmpeg

CMD python manage.py runserver 0.0.0.0:8080
