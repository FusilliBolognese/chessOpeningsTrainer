from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework import status

from django.http import HttpResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from django.db import models

from choper.models import ChessOpeningTree, ChessOpeningTraining
from choper.serializers import ChessOpeningTreeSerializer, ChessOpeningTrainingSerializer
from choper.serializers import ChessOpeningTrainingLightSerializer, ChessOpeningTreeLightSerializer

import chess
import chess.pgn


def getListData(model, modelLightSerializer):
    items = model.objects.all()
    serializer = modelLightSerializer(items, many=True)
    print('[OK] getListData.serializer.data : ', serializer.data)
    return JsonResponse(serializer.data, safe=False)


def postNewItemData(request, modelSerializer):
    item_data = JSONParser().parse(request)
    print('[OK] postNewItemData.item_data : ', item_data)
    serializer = modelSerializer(data=item_data)
    if serializer.is_valid():
        print('[OK] postNewItemData.serializer.validated_data : ',
              serializer.validated_data)
        serializer.save()
        print('[OK] postNewItemData.serializer.data : ',
              serializer.data)
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    else:
        print('[ERROR] postNewItemData.serializer.errors : ',
              serializer.errors)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def deleteList(model):
    model.objects.all().delete()
    return HttpResponse(status=status.HTTP_204_NO_CONTENT)


def perform_list(request, model, modelSerializer, modelLightSerializer):
    """ GET returns all the objects of the collection """
    if request.method == 'GET':
        return getListData(model, modelLightSerializer)

    """ POST add a new object """
    if request.method == 'POST':
        return postNewItemData(request, modelSerializer)

    """ DELTE all items of the collection """
    if request.method == 'DELETE':
        deleteList(model)


def getInstance(model, id):
    try:
        instance = model.objects.get(pk=id)
        print('[OK] getInstance.instance : ', instance)
        return instance
    except model.DoesNotExist:
        raise Http404('Not Found')
        # return HttpResponse(status=status.HTTP_404_NOT_FOUND)


def getInstanceData(instance, serializerModel):
    serializer = serializerModel(instance)
    print('[OK] getInstanceData.serializer.data : ', serializer.data)
    return JsonResponse(serializer.data, safe=False)


def updateInstanceData(instance, request, serializerModel):
    item_data = JSONParser().parse(request)
    print('[OK] updateInstanceData.item_data : ', item_data)
    serializer = serializerModel(instance, data=item_data)
    if serializer.is_valid():
        print('[OK] updateInstanceData.serializer.validated_data : ',
              serializer.validated_data)
        serializer.save()
        print('[OK] updateInstanceData.serializer.data : ',
              serializer.data)
        return JsonResponse(serializer.data, safe=False)
    else:
        print('[ERROR] updateInstanceData.serializer.errors : ',
              serializer.errors)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def deleteInstance(instance):
    instance.delete()
    return HttpResponse(status=status.HTTP_204_NO_CONTENT)


def perform_detail(request, id, model, serializerModel):

    instance = getInstance(model, id)
    if request.method == 'GET':
        return getInstanceData(instance, serializerModel)

    if request.method == "PUT":
        return updateInstanceData(instance, request, serializerModel)

    if request.method == "DELETE":
        return deleteInstance(instance)


@csrf_exempt
def openingTree_list(request):
    # return perform_list(request, ChessOpeningTree, ChessOpeningTreeSerializer)
    return perform_list(request, ChessOpeningTree, ChessOpeningTreeSerializer, ChessOpeningTreeLightSerializer)


@csrf_exempt
def openingTree_detail(request, id):
    return perform_detail(request, id, ChessOpeningTree, ChessOpeningTreeSerializer)


@csrf_exempt
def openingTraining_list(request):
    # return perform_list(request, ChessOpeningTraining, ChessOpeningTrainingSerializer)
    return perform_list(request, ChessOpeningTraining, ChessOpeningTrainingSerializer, ChessOpeningTrainingLightSerializer)


@csrf_exempt
def openingTraining_detail(request, id):
    return perform_detail(request, id, ChessOpeningTraining, ChessOpeningTrainingSerializer)
