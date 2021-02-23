from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('overview/', index),
    path('project/create/', index),
    path('project/edit/<uuid:id>', index),
    path('project/delete/<uuid:id>', index),
    path('profile/', index),
    path('profile/edit/', index),
    path('details/<uuid:id>/', index),
    path('comment/add/<uuid:id>/', index),
    path('register/', index),
    path('logout/', index),
    path('password/reset/', index),
    path('rest-auth/password/reset/confirm/<uidb64>/<token>/', index,
         name='password_reset_confirm'),
]
