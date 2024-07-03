from django.contrib import admin
from django.urls import path
from api import views
from django.urls import include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('ValidateUsername/', views.ValidateUsername.as_view(), name='ValidateUsername'),
    path('ValidateEmail/', views.ValidateEmail.as_view(), name='ValidateEmail'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
