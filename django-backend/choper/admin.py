from django.contrib import admin

# Register your models here.
from choper.models import ChessOpeningTree, ChessOpeningTest

admin.site.register(ChessOpeningTree)
admin.site.register(ChessOpeningTest)
