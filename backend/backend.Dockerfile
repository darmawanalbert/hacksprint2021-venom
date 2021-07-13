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
RUN apt-get install ppa-purge
RUN ppa-purge ppa:mc3man/trusty-media  # ignore warning if not found
RUN add-apt-repository ppa:mc3man/trusty-media
RUN apt-get update
RUN apt-get dist-upgrade
RUN apt-get --assume-yes install ffmpeg

CMD python manage.py runserver 0.0.0.0:8080
