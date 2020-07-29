from django.contrib.auth.models import User
from rest_framework import serializers
from choper.models import ChessOpeningTree, ChessOpeningTraining
import chess
import chess.pgn
import io
from collections import OrderedDict


class ChessOpeningTreeLightSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    eco_code = serializers.CharField()
    opening_name = serializers.CharField()


class ChessOpeningTreeSerializer(ChessOpeningTreeLightSerializer):
    pgn_text = serializers.CharField()

    def create(self, validated_data):
        return ChessOpeningTree.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.eco_code = validated_data.get('eco_code', instance.eco_code)
        instance.opening_name = validated_data.get(
            'opening_name', instance.opening_name)
        instance.pgn_text = validated_data.get('pgn_text', instance.pgn_text)
        instance.save()
        return instance


class ChessOpeningTrainingLightSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    date_created = serializers.DateTimeField(read_only=True)
    date_lastmodified = serializers.DateTimeField(read_only=True)
    opening_tree_id = serializers.PrimaryKeyRelatedField(
        source='opening_tree',  queryset=ChessOpeningTree.objects.all(), )
    variant = serializers.CharField(max_length=50, default='chess')
    is_chess360 = serializers.BooleanField(default=False)
    opening_tree = ChessOpeningTreeLightSerializer(
        required=False, read_only=True)


class ChessOpeningTrainingSerializer(ChessOpeningTrainingLightSerializer):
    uci_text = serializers.CharField(allow_blank=True, allow_null=True)

    def getBoardFromUCI(self, uci_text):
        board = chess.Board()
        if uci_text and (len(uci_text.strip()) > 0):
            uci_moves = uci_text.split()
            for uci_move in uci_moves:
                board.push_uci(uci_move)
        return board

    def create(self, validated_data):
        return ChessOpeningTraining.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """ opening_tree_id, variant, is_chess360
            -> are not able to be updated
            -> so, this data are not validated """
        instance.uci_text = validated_data.get('uci_text', instance.uci_text)

        """ get pgn and opening game with line variations """
        opening = ChessOpeningTree.objects.get(pk=instance.opening_tree_id)
        serializer = ChessOpeningTreeSerializer(opening)
        opening_pgn = io.StringIO(serializer.data['pgn_text'])
        opening_tree = chess.pgn.read_game(opening_pgn)
        opening_board = opening_tree.board()
        print('**** OPENING TREE ****\n', opening_tree)
        print('**** OPENING BOARD ****\n', opening_board)
        print('**** OPENING VARIATIONS ****\n', opening_board)
        for move in opening_tree.mainline_moves:
            print(move)

        """ get board and training game : only one mainline """
        training_board = self.getBoardFromUCI(instance.uci_text)
        training = chess.pgn.Game.from_board(training_board)
        training_board = training.board()
        print('**** TRAINING GAME ****\n', training)
        print('**** TRAINING BOARD ****\n', training_board)

        for move_number, training_move in enumerate(training_board.move_stack):
            print(move_number, training_move)

        instance.save()
        return instance

    def to_representation(self, instance):
        """
        returns next fields from data base model :
            date_created -> can't be modified
            date_lastmodified -> auto update
            variant -> can't be updated
            is_chess360 -> can't be updated
            opening_tree -> can't be updated
            uci_text -> can be updated
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
        board = self.getBoardFromUCI(ret['uci_text'])
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
