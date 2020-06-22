from django.db import models
from chess import pgn

# Create your models here.


class ChessOpeningTree(models.Model):
    pgn_text = models.TextField()
    opening_name = models.CharField(max_length=255)
    eco_code = models.CharField(max_length=10, default='A00')

    def loadPgn(self):
        self.game = pgn.read_game(self.pgn_text)


class ChessOpeningTraining(models.Model):
    COLORS = [
        ('w', 'blanc'),
        ('b', 'noir'),
    ]
    date_created = models.DateTimeField(auto_now_add=True)
    opening_tree = models.ForeignKey(
        ChessOpeningTree, on_delete=models.CASCADE)
    pgn_text = models.TextField(null=True, blank=True)
    score = models.IntegerField(default=0)
    side = models.CharField(max_length=1, choices=COLORS, default='w')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def __str__(self):
        return super().__str__()

    def play(self, move):
        pass
        # is a correct format move ? -> format test
        # is a legal move ? -> validate the move with chess rules
        # is a correct move regarding the opening tree line / variation ? -> check with de opening tree moves
        # if
