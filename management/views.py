from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Profile
from .serializers import *
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User


@api_view(['POST'])
def create_profile(request):
    user = get_user_from_token(request)
    request.data['user'] = user.id
    serializer = ProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_project(request):
    user = get_user_from_token(request)
    request.data['creator'] = user.id
    print(request.data)
    serializers = ProjectSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view()
def get_users_list(request):
    profiles = Profile.objects.all()
    serializer = ProfileSerializer(profiles, context={'request':
                                   request}, many=True)
    return Response(serializer.data)


def get_user_from_token(request):
    token = request.headers['Authorization']
    user_id = Token.objects.get(key=token).user_id
    user = User.objects.get(id=user_id)
    return user
