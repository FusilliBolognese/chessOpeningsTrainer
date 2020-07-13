from django.db import models
from chess import pgn

# Create your models here.


class ChessOpeningTree(models.Model):
    pgn_text = models.TextField()
    opening_name = models.CharField(max_length=255)
    eco_code = models.CharField(max_length=10, default='A00')

    def __str__(self):
        return '{eco_code:' + self.eco_code + ', opening_name:' + self.opening_name + '}'


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
    uci_text = models.TextField(null=True, blank=True)

    def __str__(self):
        return '{date_created:' + str(self.date_created) + ', opening_tree:' + str(self.opening_tree) + '}'

    class Meta:
        ordering = ['date_lastmodified']
