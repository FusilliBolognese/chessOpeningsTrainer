# Generated by Django 3.0.6 on 2020-07-05 20:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('choper', '0010_remove_chessopeningtraining_fen'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chessopeningtraining',
            name='pgn_text',
        ),
    ]
