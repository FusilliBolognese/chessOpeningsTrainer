from django.db import models
from chess import pgn

# Create your models here.


class ChessOpeningTree(models.Model):
    pgn_text = models.TextField()
    opening_name = models.CharField(max_length=255)
    eco_code = models.CharField(max_length=10, default='A00')

    def loadPgn(self):
        self.game = pgn.read_game(self.pgn_text)


COLORS = [
    ('w', 'blanc'),
    ('b', 'noir'),
]
VARIANTS = [
    ('chess', 'Standard'),
    ('suicide', 'Suicide'),
    ('giveaway', 'Giveaway'),
    ('antichess', 'Antichess'),
    ('atomic', 'Atomic'),
    ('kingofthehill', 'King of the Hill'),
    ('racingkings', 'Racing Kings'),
    ('horde', 'Horde'),
    ('3check', 'Three-check'),
    ('crazyhouse', 'Crazyhouse')
]


class ChessOpeningTraining(models.Model):
    date_created = models.DateTimeField(auto_now_add=True)
    date_lastmodified = models.DateTimeField(auto_now=True)
    variant = models.CharField(
        max_length=50, choices=VARIANTS, default='chess')
    is_chess360 = models.BooleanField(default=False)
    opening_tree = models.ForeignKey(
        ChessOpeningTree, on_delete=models.CASCADE)
    # pgn_text = models.TextField(null=True, blank=True)
    uci_text = models.TextField(null=True, blank=True)
    # fen = models.TextField(null=True, blank=True, default='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
    score = models.IntegerField(default=0)
    # side = models.CharField(max_length=1, choices=COLORS, default='w')
    # last_san_move = models.TextField(null=True, blank=True)


"""
class ChessMove(models.Model):
    opening_training = models.ForeignKey(
        ChessOpeningTraining, on_delete=models.CASCADE)
    number = models.IntegerField()
    side = models.CharField(max_length=1, choices=COLORS, default='w')
    from_square_id = models.IntegerField()
    to_square_id = models.IntegerField()
    promotion_piece_type_id = models.IntegerField()
"""


class ChessMove(object):
    def __init__(self, number, side, fromSquare, toSquare, promotionType):
        self.number = number
        self.side = side
        self.fromSquare = fromSquare
        self.toSquare = toSquare
        self.promotionType = promotionType
