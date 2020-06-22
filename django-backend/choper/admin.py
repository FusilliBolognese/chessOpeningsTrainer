from django.contrib import admin

# Register your models here.
from choper.models import ChessOpeningTree, ChessOpeningTraining

admin.site.register(ChessOpeningTree)
admin.site.register(ChessOpeningTraining)
