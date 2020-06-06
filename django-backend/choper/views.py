from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet

from choper.models import ChessOpening, ChessGame
from choper.serializers import ChessOpeningSerializer, ChessGameSerializer


class ChessOpeningViewSet(ModelViewSet):
    queryset = ChessOpening.objects.all()
    serializer_class = ChessOpeningSerializer


class ChessGameViewSet(ModelViewSet):
    queryset = ChessGame.objects.all()
    serializer_class = ChessGameSerializer
