from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from choper.models import ChessOpeningTree, ChessOpeningTest


class ChessOpeningTreeSerializer(ModelSerializer):
    class Meta:
        model = ChessOpeningTree
        fields = '__all__'


class ChessOpeningTestSerializer(ModelSerializer):
    class Meta:
        model = ChessOpeningTest
        fields = '__all__'
