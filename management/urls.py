from django.urls import path, re_path
from management.views import (create_profile, profile_data, get_user,
                              get_users_list, get_project, create_project,
                              delete_project, get_project_list, create_comment,
                              get_project_comments)


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
