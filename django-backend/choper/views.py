from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet

from choper.models import ChessOpeningTree, ChessOpeningTraining
from choper.serializers import ChessOpeningTreeSerializer, ChessOpeningTrainingSerializer
from choper.serializers import ChessOpeningTreeLightSerializer, ChessOpeningTrainingLightSerializer


class ChessOpeningTreeViewSet(ModelViewSet):
    queryset = ChessOpeningTree.objects.all()
    serializer_class = ChessOpeningTreeSerializer


class ChessOpeningTrainingViewSet(ModelViewSet):
    queryset = ChessOpeningTraining.objects.all()
    serializer_class = ChessOpeningTrainingSerializer
