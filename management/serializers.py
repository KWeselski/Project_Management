from rest_framework import serializers
from .models import Profile, Project, Comment


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('id', 'user', 'firstname', 'lastname', 'age', 'sex', 'phone',
                  'description', 'avatar')


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
        profile_ = Profile.objects.get(user=obj.user)
        profile['firstname'] = profile_.firstname
        profile['lastname'] = profile_.lastname
        if profile_.avatar and hasattr(profile_.avatar, 'url'):
            profile['avatar'] = profile_.avatar.url
        else:
            profile['avatar'] = ""
        return profile
