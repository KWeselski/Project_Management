from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Profile, Project, Comment
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


@api_view(['POST', 'PUT'])
def create_project(request):
    if request.method == 'POST':
        user = get_user_from_token(request)
        request.data['creator'] = user.id
        request.data['users'].append(user.id)
        print(request.data)
        serializers = ProjectSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'PUT':
        try:
            project = Project.objects.get(id=request.data['id'])
        except Project.DoesNotExist:
            return Response('Project not exist',
                            status=status.HTTP_404_NOT_FOUND)
        user_is_creator(request)
        serializers = ProjectSerializer(project, data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_project(request):
    try:
        project = Project.objects.get(id=request.data['id'])
    except Project.DoesNotExist:
        return Response('Project not exist',
                        status=status.HTTP_404_NOT_FOUND)
    user_is_creator(request)
    project.delete()
    return Response('Deleted sucessfully', status=status.HTTP_201_CREATED)


@api_view(['POST'])
def create_comment(request):
    user = get_user_from_token(request)
    request.data['user'] = user.id
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view()
def get_project_comments(request, pk):
    try:
        comments = Comment.objects.filter(project=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = CommentSerializer(comments, context={'request': request},
                                   many=True)
    return Response(serializer.data)


@api_view()
def get_project_list(request):
    user = get_user_from_token(request)
    projects = Project.objects.filter(users=user.id)
    serializer = ProjectSerializer(projects, context={'request': request},
                                   many=True)
    return Response(serializer.data)


@api_view()
def get_users_list(request):
    profiles = Profile.objects.all()
    serializer = ProfileSerializer(profiles, context={'request':
                                   request}, many=True)
    return Response(serializer.data)


@api_view(['GET', 'PUT'])
def profile_data(request):
    user = get_user_from_token(request)
    try:
        profile = Profile.objects.get(user=user.id)
    except Profile.DoesNotExist:
        return Response('Profile not exist',
                        status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data)
    if request.method == "PUT":
        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view()
def get_project(request, pk):
    try:
        project = Project.objects.get(pk=pk)
    except Project.DoesNotExist:
        return Response('Project not exist',
                        status=status.HTTP_404_NOT_FOUND)
    serializer = ProjectSerializer(project, context={'request': request})
    return Response(serializer.data)


@api_view()
def get_user(request):
    token = request.headers['Authorization']
    user_id = Token.objects.get(key=token).user_id
    user = User.objects.get(id=user_id)
    return Response(user.id)


def user_is_creator(request):
    creator = request.data['creator']
    user = request.data['user']
    if creator != user:
        return Respone('User are not creator',
                       status=status.HTTP_401_UNAUTHORIZED)


def get_user_from_token(request):
    token = request.headers['Authorization']
    user_id = Token.objects.get(key=token).user_id
    user = User.objects.get(id=user_id)
    return user
