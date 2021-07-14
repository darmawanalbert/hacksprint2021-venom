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

USER root
RUN sed -i "s/httpredir.debian.org/debian.uchicago.edu/" /etc/apt/sources.list && \
    apt-get update
RUN apt-get install -y ffmpeg

CMD python manage.py runserver 0.0.0.0:8080
