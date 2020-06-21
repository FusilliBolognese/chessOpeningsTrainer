from django.urls import path, include
from django.conf.urls import url
from rest_framework import routers
from choper.views import ChessOpeningTreeViewSet, ChessOpeningTestViewSet
from choper.apis import openingTree_list, openingTree_detail, openingTest_list, openingTest_detail


router = routers.DefaultRouter()
#router.register(r'users', UserViewSet)
router.register(r'view/openings', ChessOpeningTreeViewSet)
router.register(r'view/tests', ChessOpeningTestViewSet)


urlpatterns = [
    #path('', index, name='index'),
    path('', include(router.urls)),
    path('api/openings/', openingTree_list),
    path('api/openings/<int:id>/', openingTree_detail),
    path('api/tests/', openingTest_list),
    path('api/tests/<int:id>/', openingTest_detail),
]
