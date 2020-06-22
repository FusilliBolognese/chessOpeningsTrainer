from rest_framework.parsers import JSONParser
from rest_framework import status
from django.http import HttpResponse, Http404
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import models

from choper.models import ChessOpeningTree, ChessOpeningTraining
from choper.serializers import ChessOpeningTreeSerializer, ChessOpeningTrainingSerializer

import logging


@csrf_exempt
def perform_list(request, model, serializerModel):
    logging.basicConfig(filename='app.log', level=logging.INFO)
    if request.method == 'GET':
        items = model.objects.all()
        serializer = serializerModel(items, many=True)
        logging.info(serializer.data)
        return JsonResponse(serializer.data, safe=False)
    if request.method == 'POST':
        item_data = JSONParser().parse(request)
        serializer = serializerModel(data=item_data)
        if serializer.is_valid():
            logging.info(serializer.validated_data)
            serializer.save()
            logging.info(serializer.data)
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'DELETE':
        model.objects.all().delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)


@csrf_exempt
def perform_detail(request, id, model, serializerModel):
    try:
        instance = model.objects.get(pk=id)
    except model.DoesNotExist:
        raise Http404('Element non trouvé')
        # return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = serializerModel(instance)
        logging.info(serializer.data)
        return JsonResponse(serializer.data, safe=False)

    if request.method == "PUT":
        item_data = JSONParser().parse(request)
        serializer = serializerModel(instance, data=item_data)
        if serializer.is_valid():
            logging.info(serializer.validated_data)
            serializer.save()
            logging.info(serializer.data)
            return JsonResponse(serializer.data, safe=False)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        instance.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)


def openingTree_list(request):
    return perform_list(request, ChessOpeningTree, ChessOpeningTreeSerializer)


def openingTree_detail(request, id):
    return perform_detail(request, id, ChessOpeningTree, ChessOpeningTreeSerializer)


def openingTest_list(request):
    return perform_list(request, ChessOpeningTraining, ChessOpeningTrainingSerializer)


def openingTest_detail(request, id):
    return perform_detail(request, id, ChessOpeningTraining, ChessOpeningTrainingSerializer)


"""
@csrf_exempt
def opening_list(request):
    # Get all
    logging.basicConfig(filename='app.log', level=logging.INFO)
    if request.method == 'GET':
        items = ChessOpening.objects.all()
        serializer = ChessOpeningSerializer(items, many=True)
        logging.info(serializer.data)
        return JsonResponse(serializer.data, safe=False)

    if request.method == 'POST':
        item_data = JSONParser().parse(request)
        serializer = ChessOpeningSerializer(data=item_data)
        if serializer.is_valid():
            logging.info(serializer.validated_data)
            serializer.save()
            logging.info(serializer.data)
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        ChessOpening.objects.all().delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)


@csrf_exempt
def opening_detail(request, id):
    try:
        instance = ChessOpening.objects.get(pk=id)
    except ChessOpening.DoesNotExist:
        raise Http404('Element non trouvé')
        # return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ChessOpeningSerializer(instance)
        logging.info(serializer.data)
        return JsonResponse(serializer.data, safe=False)

    if request.method == "PUT":
        item_data = JSONParser().parse(request)
        serializer = ChessOpeningSerializer(instance, data=item_data)
        if serializer.is_valid():
            logging.info(serializer.validated_data)
            serializer.save()
            logging.info(serializer.data)
            return JsonResponse(serializer.data, safe=False)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        instance.delete()
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)


@csrf_exempt
def game_list(request):
    logging.basicConfig(filename='app.log', level=logging.INFO)
    if request.method == 'GET':
        querySet = ChessGame.objects.orde
        serializer = ChessGameSerializer(querySet, many=True)
        logging.info(serializer.data)
        return JsonResponse(serializer.data, safe=False)


@csrf_exempt
def game_detail(request, id):
    try:
        instance = ChessGame.objects.get(pk=id)
    except ChessGame.DoesNotExist:
        raise Http404('Element non trouvé')
        # return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ChessGameSerializer(instance)
        logging.info(serializer.data)
        return JsonResponse(serializer.data, safe=False)

"""
