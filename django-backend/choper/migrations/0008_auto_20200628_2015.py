# Generated by Django 3.0.6 on 2020-06-28 20:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('choper', '0007_auto_20200622_2015'),
    ]

    operations = [
        migrations.AddField(
            model_name='chessopeningtraining',
            name='fen',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='chessopeningtraining',
            name='last_san_move',
            field=models.TextField(blank=True, null=True),
        ),
    ]
