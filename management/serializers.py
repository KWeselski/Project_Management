from rest_framework import serializers
from .models import Profile, Project


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'user', 'firstname', 'lastname', 'age', 'sex', 'phone')


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'title', 'creator', 'users', 'description',
                  'start_date', 'end_date', 'status')
