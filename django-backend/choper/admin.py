from django.contrib import admin

# Register your models here.
from choper.models import ChessOpening, ChessGame

admin.site.register(ChessOpening)
admin.site.register(ChessGame)
