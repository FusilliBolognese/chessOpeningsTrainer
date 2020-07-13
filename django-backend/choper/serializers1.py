from django.contrib.auth.models import User
from rest_framework import serializers
from choper.models import ChessOpeningTree, ChessOpeningTraining
import chess
import chess.pgn
import io
from collections import OrderedDict


class AsymetricRelatedField(serializers.PrimaryKeyRelatedField):

    # en lecture, je veux l'objet complet, pas juste l'id
    def to_representation(self, value):
        # le self.serializer_class.serializer_class est redondant
        # mais obligatoire
        return self.serializer_class.serializer_class(value).data

    # petite astuce perso et pas obligatoire pour permettre de taper moins
    # de code: lui faire prendre le queryset du model du serializer
    # automatiquement. Je suis lazy
    def get_queryset(self):
        if self.queryset:
            return self.queryset
        return self.serializer_class.serializer_class.Meta.model.objects.all()

    # Get choices est utilisé par l'autodoc DRF et s'attend à ce que
    # to_representation() retourne un ID ce qui fait tout planter. On
    # réécrit le truc pour utiliser item.pk au lieu de to_representation()
    def get_choices(self, cutoff=None):
        queryset = self.get_queryset()
        if queryset is None:
            return {}

        if cutoff is not None:
            queryset = queryset[:cutoff]

        return OrderedDict([
            (
                item.pk,
                self.display_value(item)
            )
            for item in queryset
        ])

    # DRF saute certaines validations quand il n'y a que l'id, et comme ce
    # n'est pas le cas ici, tout plante. On désactive ça.
    def use_pk_only_optimization(self):
        return False

    # Un petit constructeur pour générer le field depuis un serializer. lazy,
    # lazy, lazy...
    @classmethod
    def from_serializer(cls, serializer, name=None, args=(), kwargs={}):
        if name is None:
            name = f"{serializer.__class__.__name__}AsymetricAutoField"

        return type(name, (cls,), {"serializer_class": serializer})(*args, **kwargs)


class ChessOpeningTreeLightSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChessOpeningTree
        fields = ('id', 'eco_code', 'opening_name')


class ChessOpeningTreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChessOpeningTree
        fields = ('id', 'eco_code', 'opening_name', 'pgn_text')


class ChessOpeningTrainingLightSerializer(serializers.ModelSerializer):
    opening_tree = ChessOpeningTreeLightSerializer(
        many=False, read_only=False)

    class Meta:
        model = ChessOpeningTraining
        fields = ('id', 'date_created', 'date_lastmodified', 'variant',
                  'is_chess360', 'opening_tree')


class ChessOpeningTrainingSerializer(serializers.ModelSerializer):

    opening_tree = ChessOpeningTreeLightSerializer(read_only=True)
    opening_tree_id = serializers.PrimaryKeyRelatedField(
        source='opening_tree',  queryset=ChessOpeningTree.objects.all(), )

    class Meta:
        model = ChessOpeningTraining
        fields = ('id', 'date_created', 'date_lastmodified',
                  'variant', 'is_chess360', 'uci_text', 'opening_tree', 'opening_tree_id')

    def to_representation(self, instance):
        """
        returns next fields from data base model :
            date_created -> can't be modified
            date_lastmodified -> auto update
            variant -> can't be modified is a game is in progress
            is_chess360 -> can't be modified is a game is in progress
            opening_tree -> can't be modified is a game is in progress
            uci_text
        returns next fields from calculation interpreted from uci_text :
            move_number
            pgn_text
            turn
            fen
            legal_moves
        """

        ret = super().to_representation(instance)

        """
            generate the chess game with the sequence of moves :
            1. push the uci moves in the stack of the board
            2. build the game with the defined board
        """
        board = chess.Board()
        uci_text = ret['uci_text']
        # print("uci text :", uci_text)
        if uci_text and (len(uci_text.strip()) > 0):
            uci_moves = uci_text.split()
            # print("uci_moves :", uci_moves)
            for uci_move in uci_moves:
                board.push_uci(uci_move)
        game = chess.pgn.Game.from_board(board)

        """ generate some current elements, depending of the moves stack :
            - the pgn representation of the game
            - the current turn white or black
            - the move number
            - the current FEN representation of the board
        """
        pgn_exporter = chess.pgn.StringExporter(
            headers=False, variations=False, comments=False)
        ret['pgn_text'] = game.accept(pgn_exporter)
        ret['turn'] = ("b", "w")[board.turn]
        ret['move_number'] = board.fullmove_number
        ret['fen'] = board.fen()

        """
            generate the legal moves :
            - use then LegalMoveGenerator facility
        """
        legal_moves = chess.LegalMoveGenerator(board)
        builder = []
        for move in legal_moves:
            builder.append(board.uci(move))
        ret['legal_moves'] = builder

        print('ChessOpeningTrainingSerializer.to_representation : ', ret)
        return ret

    def to_internal_value(self, data):
        """
            date_created -> can't be modified
            date_lastmodified -> auto update
            variant -> can't be modified is a game is in progress
            is_chess360 -> can't be modified is a game is in progress
            opening_tree -> can't be modified is a game is in progress
            uci_text
        """
        ret = super().to_internal_value(data)
        print('ChessOpeningTrainingSerializer.to_internal_value : ', ret)
        # ret is an OrderedDict
        # see https://docs.python.org/3.8/library/collections.html#collections.OrderedDict
        # score = int(ret['score'])
        # score = score + 1
        # ret['score'] = str(score)
        # print('to_internal_value : ', ret)
        return ret
