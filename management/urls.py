from django.urls import path, re_path
from .views import *


urlpatterns = [
    path('profile/create/', create_profile),
    path('profile/data', profile_data),
    path('user/get', get_user),
    path('users/get', get_users_list),
    path('project/get/<uuid:pk>', get_project),
    path('project/create/', create_project),
    path('project/delete', delete_project),
    path('projects/get', get_project_list),
    path('comment/create/', create_comment),
    path('comments/get/<uuid:pk>', get_project_comments),
]
