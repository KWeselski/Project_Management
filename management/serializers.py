from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import transaction
from management.models import (Profile, Project, Comment, SEX_CHOICES)
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from rest_framework.serializers import FileField


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('id', 'first_name', 'last_name', 'age', 'sex', 'phone',
                  'description', 'avatar')


class ProfileRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=30)
    sex = serializers.ChoiceField(choices=SEX_CHOICES)
    age = serializers.IntegerField(default=18,
                                   validators=[MinValueValidator(18),
                                               MaxValueValidator(80)])
    phone = serializers.CharField(max_length=9, allow_blank=True)

    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.first_name = self.data.get('first_name')
        user.last_name = self.data.get('last_name')
        user.sex = self.data.get('sex')
        user.age = self.data.get('age')
        user.phone = self.data.get('phone')
        user.save()
        return user


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'title', 'creator', 'users', 'description',
                  'start_date', 'end_date', 'status')


class CommentSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField('get_profile')

    class Meta:
        model = Comment
        fields = ('user', 'project', 'comment', 'date_added', 'profile')

    def get_profile(self, obj):
        profile = dict()
        profile_ = Profile.objects.get(id=obj.user.id)
        profile['firstname'] = profile_.first_name
        profile['lastname'] = profile_.last_name
        if profile_.avatar and hasattr(profile_.avatar, 'url'):
            profile['avatar'] = profile_.avatar.url
        else:
            profile['avatar'] = ""
        return profile
