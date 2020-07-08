from django.contrib.auth.models import User
from rest_framework import serializers
from choper.models import ChessOpeningTree, ChessOpeningTraining
import chess
import chess.pgn
import io
from collections import OrderedDict


class ChessOpeningTreeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChessOpeningTree
        fields = '__all__'


class ChessOpeningTrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChessOpeningTraining
        fields = '__all__'

    def to_representation(self, instance):
        """
        returns next fields from data base model :
            date_created -> can't be modified
            date_lastmodified -> auto update
            variant -> can't be modified is a game is in progress
            is_chess360 -> can't be modified is a game is in progress
            opening_tree -> can't be modified is a game is in progress
            uci_text
            score -> auto increment on every move
        returns next fields from calculation interpreted from uci_text :
            move_number
            pgn_text
            turn
            fen
            legal_moves
        """

        ret = super().to_representation(instance)

        board = chess.Board()

        """
            generate the chess game with the sequence of moves :
            1. push the uci moves in the stack of the board
            2. build the game with the defined board
        """
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
        # print('to_representation : ', ret)
        return ret

    def to_internal_value(self, data):
        """
            date_created -> can't be modified
            date_lastmodified -> auto update
            variant -> can't be modified is a game is in progress
            is_chess360 -> can't be modified is a game is in progress
            opening_tree -> can't be modified is a game is in progress
            uci_text
            score -> auto increment on every move
        """
        ret = super().to_internal_value(data)

        # ret is an OrderedDict
        # see https://docs.python.org/3.8/library/collections.html#collections.OrderedDict
        score = int(ret['score'])
        #print('score : ', score)
        score = score + 1
        ret['score'] = str(score)
        #print('to_internal_value : ', ret)
        return ret


"""
class ChessMoveSerializer(serializers.BaseSerializer):
    number = serializers.IntegerField()  # 1 à n
    side = serializers.CharField()  # w ou b
    fromSquare = serializers.IntegerField()  # from 0 to 63
    toSquare = serializers.IntegerField()  # from 0 to 63
    promotionType = serializers.CharField()  # q, b, n, r
"""
