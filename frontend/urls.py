from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('overview/', index),
    path('register/', index),
    path('create_project/', index),
    path('edit_project/', index),
    path('edit_profile/', index),
    path('details/', index),
    path('profile/', index)
]
