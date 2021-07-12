FROM python:3.8.2
ADD . /app
WORKDIR /app
RUN pip install -r requirements.txt
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home /app \
    app
USER app
EXPOSE 8000
CMD python manage.py runserver 0.0.0.0:8000
