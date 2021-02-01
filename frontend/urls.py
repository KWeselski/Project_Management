from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('overview/', index),
    path('register/', index)
]
