from django.db import models

# Create your models here.


class ChessOpening(models.Model):
    pgn = models.TextField()
    opening_name = models.CharField(max_length=255)
    eco_code = models.CharField(max_length=10, default='A00')


class ChessGame(models.Model):
    COLORS = [
        ('w', 'blanc'),
        ('b', 'noir'),
    ]
    date_created = models.DateTimeField(auto_now_add=True)
    opening = models.ForeignKey(ChessOpening, on_delete=models.CASCADE)
    pgn = models.TextField(null=True, blank=True)
    score = models.IntegerField(default=0)
    side = models.CharField(max_length=1, choices=COLORS, default='w')
