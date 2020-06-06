from django.urls import path, include
from django.conf.urls import url
from rest_framework import routers
from choper.views import ChessOpeningViewSet, ChessGameViewSet
from choper.apis import opening_list, opening_detail, game_list, game_detail


router = routers.DefaultRouter()
#router.register(r'users', UserViewSet)
router.register(r'views/openings', ChessOpeningViewSet)
router.register(r'views/games', ChessGameViewSet)


urlpatterns = [
    #path('', index, name='index'),
    path('', include(router.urls)),
    path('api/openings/', opening_list),
    path('api/openings/<int:id>/', opening_detail),
    path('api/games/', game_list),
    path('api/games/<int:id>/', game_detail),
]
