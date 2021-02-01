from django.urls import path, re_path
from .views import *


urlpatterns = [
    path('create_profile/', create_profile),
]
