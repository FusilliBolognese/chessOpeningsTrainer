from django.urls import path, include
from django.conf.urls import url
from rest_framework import routers
from choper.views import ChessOpeningTreeViewSet, ChessOpeningTrainingViewSet
from choper.apis import openingTree_list, openingTree_detail, openingTraining_list, openingTraining_detail


router = routers.DefaultRouter()
router.register(r'view/openings', ChessOpeningTreeViewSet)
router.register(r'view/trainings', ChessOpeningTrainingViewSet)


urlpatterns = [
    #path('', index, name='index'),
    path('', include(router.urls)),

    path('api/openings', openingTree_list),
    path('api/openings/<int:id>', openingTree_detail),
    path('api/trainings', openingTraining_list),
    path('api/trainings/<int:id>', openingTraining_detail),
    
]
