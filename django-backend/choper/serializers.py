from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from choper.models import ChessOpening, ChessGame


class ChessOpeningSerializer(ModelSerializer):
    class Meta:
        model = ChessOpening
        fields = '__all__'


class ChessGameSerializer(ModelSerializer):
    class Meta:
        model = ChessGame
        fields = '__all__'

