from django.urls import path, re_path
from .views import *


urlpatterns = [
    path('create_profile/', create_profile),
    path('get_users_list/', get_users_list),
    path('create_project/', create_project),
    path('get_projects_list/', get_project_list),
    path('delete_project/', delete_project),
    path('create_comment/', create_comment),
    path('get_comments/<int:pk>', get_project_comments),
    path('profile_data', profile_data)
]
