from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet

from choper.models import ChessOpeningTree, ChessOpeningTest
from choper.serializers import ChessOpeningTreeSerializer, ChessOpeningTestSerializer


class ChessOpeningTreeViewSet(ModelViewSet):
    queryset = ChessOpeningTree.objects.all()
    serializer_class = ChessOpeningTreeSerializer


class ChessOpeningTestViewSet(ModelViewSet):
    queryset = ChessOpeningTest.objects.all()
    serializer_class = ChessOpeningTestSerializer
