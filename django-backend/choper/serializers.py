from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from choper.models import ChessOpeningTree, ChessOpeningTraining


class ChessOpeningTreeSerializer(ModelSerializer):
    class Meta:
        model = ChessOpeningTree
        fields = '__all__'


class ChessOpeningTrainingSerializer(ModelSerializer):
    class Meta:
        model = ChessOpeningTraining
        fields = '__all__'
