# Generated by Django 3.0.6 on 2020-06-21 17:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('choper', '0005_auto_20200620_2131'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chessopeningtest',
            old_name='opening',
            new_name='opening_tree',
        ),
        migrations.RenameField(
            model_name='chessopeningtest',
            old_name='pgn',
            new_name='pgn_text',
        ),
        migrations.RenameField(
            model_name='chessopeningtree',
            old_name='pgn',
            new_name='pgn_text',
        ),
    ]
