# Generated by Django 3.2.5 on 2021-07-14 08:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restapi', '0002_auto_20210714_0406'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='movie_id',
            field=models.CharField(blank=True, default='', max_length=20),
        ),
    ]