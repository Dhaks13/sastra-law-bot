from django.contrib import admin
from django.urls import path
from api import views
from django.urls import include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('userlist', views.UserModel_list, name='UserModel_list'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
