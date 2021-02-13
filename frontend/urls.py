from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('overview/', index),
    path('register/', index),
    path('create_project/', index),
    path('edit_project/<uuid:id>', index),
    path('edit_profile/', index),
    path('details/<uuid:id>', index),
    path('add_comment/<uuid:id>', index),
    path('profile/', index),
    path('logout/', index)
]
